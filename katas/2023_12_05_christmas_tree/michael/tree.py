#!/usr/bin/env python3
import argparse
import random
import sys


DECORATIONS = "🔴🟠🟡🟢🔵🟣"
SPACE = " "
TREE_CHAR = "X"


def main():
    args = parse_args()
    height = args.height
    decorate = args.decorate

    if height <= 0:
        print(f"come on now, you can't make a tree of height {height}")
        return 1

    if decorate:
        # full-width characters so the emoji line up
        global TREE_CHAR, SPACE
        TREE_CHAR = "Ｘ"
        SPACE = "　"

    for i in range(1, height + 1):
        print(row(height, i, decorate=decorate))

    print(bottom_row(height, decorate=decorate))


def parse_args():
    ap = argparse.ArgumentParser("tree.py", description="print a lil tree!")
    ap.add_argument("height", type=int, help="height of the tree to print")
    ap.add_argument("--decorate", "-d", help="decorate the tree", action="store_true")
    return ap.parse_args()


def row(height, n, *, decorate=False):
    spc = SPACE * (height - n)
    width = n * 2 - 1
    row = [TREE_CHAR] * width

    if decorate:
        if n == 1:
            row = ["🌟"]
        else:
            # randomly replace some characters with decorations
            for i in range(random.randint(0, width // 2)):
                row[random.randrange(len(row))] = random.choice(DECORATIONS)

    return spc + "".join(row) + spc


def bottom_row(height, *, decorate=False):
    row = [SPACE] * (height * 2 - 1)

    if decorate:
        num_presents = random.randint(1, height // 2)
        for i in range(num_presents):
            row[random.randrange(len(row))] = "🎁"

    row[height - 1] = "|"

    return "".join(row)


if __name__ == "__main__":
    sys.exit(main())
