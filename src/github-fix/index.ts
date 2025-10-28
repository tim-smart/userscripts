import { Stream } from "effect/stream"
import { Effect, Queue } from "effect"

declare function GM_addStyle(css: string): void

GM_addStyle(`
  .copilotPreview__container, .feed-right-column {
    display: none !important;
  }
`)

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
  Stream.debounce(10),
  Stream.tap(() =>
    Effect.sync(() => {
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
    }),
  ),
  Stream.runDrain,
  Effect.runFork,
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
