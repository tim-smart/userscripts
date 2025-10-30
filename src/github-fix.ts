// ==UserScript==
// @name         Github Fix
// @namespace    https://timsmart.co/
// @version      2025-10-28
// @description  Remove AI from github homepage
// @author       Tim Smart <hello@timsmart.co>
// @match        https://github.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

import { Stream } from "effect/stream"
import { Effect, Queue } from "effect"

declare function GM_addStyle(css: string): void

GM_addStyle(`
  .copilotPreview__container, .feed-right-column[aria-label="Explore"] {
    display: none !important;
  }
  .feed-right-column li.notifications-list-item, .feed-right-column li.notifications-list-item.notification-read {
    background-color: transparent !important;
  }
`)

const fetchNotifications = Effect.promise(() =>
  fetch("/notifications").then((res) => res.text()),
).pipe(Effect.cached, Effect.runSync)

if (location.pathname === "/") {
  Effect.runFork(fetchNotifications)
}

const addNotifications = Effect.fnUntraced(
  function* (parent: Element) {
    const html = yield* fetchNotifications
    const dom = new DOMParser().parseFromString(html, "text/html")

    // copy notifications css
    const css = Array.from(dom.querySelectorAll("link[rel=stylesheet]")).filter(
      (link) => (link as HTMLLinkElement).href.includes("notifications"),
    )
    css.forEach((link) => document.head.appendChild(link.cloneNode()))

    const aside = document.createElement("aside")
    aside.className = "feed-notifications feed-right-column d-block mb-5 mt-7"
    const container = dom.querySelector("ul.js-active-navigation-container")!
    container.classList.remove("color-bg-subtle")
    container.classList.add(
      "border",
      "color-border-muted",
      "rounded-3",
      "overflow-hidden",
    )
    // remove .*-md* classes
    container.querySelectorAll("[class*='-md']").forEach((el) => {
      const classes = Array.from(el.classList)
      classes.forEach((cls) => {
        if (cls.includes("-md")) {
          el.classList.remove(cls)
        }
      })
    })
    container
      .querySelectorAll(".notification-list-item-actions")
      .forEach((el) => el.remove())
    container
      .querySelectorAll(".notification-list-item-actions-responsive")
      .forEach((el) => el.remove())
    container
      .querySelectorAll(".notification-list-item-unread-indicator")
      .forEach((el) => (el.parentNode as HTMLDivElement).remove())
    container
      .querySelectorAll(".notification-is-starred-icon")
      .forEach((el) => el.remove())
    aside.appendChild(container)

    parent.appendChild(aside)
  },
  Effect.cached,
  Effect.runSync,
)

function findParentWithClass(element: Element, className: string) {
  while (element) {
    if (element.className.includes(className)) {
      return element
    }
    element = element.parentElement!
  }
  return null
}

Stream.succeed(undefined).pipe(
  Stream.concat(
    Stream.callback<MutationRecord>(
      Effect.fnUntraced(function* (queue) {
        const observer = new MutationObserver((records) => {
          Queue.offerAllUnsafe(queue, records)
        })
        observer.observe(document.body, {
          attributes: false,
          childList: true,
          subtree: true,
        })
        yield* Effect.addFinalizer(() =>
          Effect.sync(() => observer.disconnect()),
        )
      }),
    ),
  ),
  Stream.tap(
    Effect.fnUntraced(function* () {
      const heading = Array.from(document.querySelectorAll("h3")).find((h) =>
        h.textContent?.includes("Agent sessions"),
      )
      if (heading) {
        const cont = findParentWithClass(
          heading,
          "DashboardListView-module__List",
        )
        if (cont) {
          cont.remove()
        }
      }

      const repoButton = document.querySelector(
        `button[data-testid="dynamic-side-panel-items-search-button"]`,
      ) as HTMLButtonElement | null
      if (repoButton) {
        repoButton.click()
      }

      const feedContent = document.querySelector(".feed-content")
      if (feedContent) {
        yield* Effect.forkChild(addNotifications(feedContent))
      }
    }),
  ),
  Stream.runDrain,
  Effect.runFork,
)
