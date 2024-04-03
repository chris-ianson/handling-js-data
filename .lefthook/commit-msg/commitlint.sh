#!/bin/sh
echo #(head -n1 $1) | npx --no -- commitlint --edit --color
