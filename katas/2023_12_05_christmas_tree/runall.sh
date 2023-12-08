#!/bin/sh
echo "~~ nowylie ~~"
deno run nowylie/tree.ts 10
deno run nowylie/tree.ts 10 --decorate

echo "~~ michael ~~"
python3 michael/tree.py 10
python3 michael/tree.py 10 --decorate

read -p "Press any key to continue to ~~ rjbs ~~" ignore

rjbs/tree 10
