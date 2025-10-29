#!/bin/bash

# Extract // ==UserScript== block from a file and add it to the compiled file in
# dist/

for file in src/*.ts; do
	filename=$(basename -- "$file")
	filename_no_ext="${filename%.*}"
	compiled_file="dist/${filename_no_ext}.user.js"

	# Extract the banner block
	banner=$(sed -n '/^\/\/ ==UserScript==/,/^\/\/ ==\/UserScript==/p' "$file")

	# Prepend the banner to the compiled file
	{
		echo "$banner"
		echo ""
		cat "$compiled_file"
	} > "${compiled_file}.tmp" && mv "${compiled_file}.tmp" "$compiled_file"

	echo "Added banner to $compiled_file"
done
