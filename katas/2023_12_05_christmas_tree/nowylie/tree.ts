import { parseArgs } from "https://deno.land/std@0.208.0/cli/mod.ts";

function intToStyle(n: number) {
  switch (n % 16) {
    case 0:
      return "color: red";
    case 1:
      return "color: purple";
    case 2:
      return "color: blue";
    case 3:
      return "color: white";
    default:
      return "color: green";
  }
}

function printLevel(treeHeight: number, level: number, decorate = true) {
  const width = level * 2 + 1;
  const gap = " ".repeat(treeHeight - level - 1);
  if (decorate) {
    if (level === 0) {
      console.log(" " + gap + "%c★", "color: yellow");
    } else {
      const leaves = "%cX".repeat(width);
      const decorations: string[] = Array.from(
        crypto.getRandomValues(new Uint8Array(width)),
      ).map(intToStyle);
      console.log(" " + gap + leaves, ...decorations);
    }
  } else {
    const leaves = "X".repeat(width);
    console.log(" " + gap + leaves);
  }
}

function printTrunk(treeHeight: number, decorate = true) {
  if (decorate) {
    console.log(" %s%c|", " ".repeat(treeHeight - 1), "color: brown");
  } else {
    console.log(" %s|", " ".repeat(treeHeight - 1));
  }
}

const usage = `usage: ./tree [-h|--help] [-d|--decorate] height

print a yule tree

arguments:
  height          height of the tree to print

options:
  --decorate, -d  decorate the tree
  --help, -h      show this help message and exit`;

function printTree(args: string[]) {
  const flags = parseArgs(args, {
    boolean: ["decorate", "help"],
    alias: {
      decorate: "d",
      help: "h",
    },
  });

  if (flags.help) {
    console.log(usage);
    return;
  }

  const treeHeight = flags._[0];
  if (!treeHeight || typeof treeHeight !== 'number' || Number.isNaN(treeHeight)) {
    console.error("error: invalid height '%s'\n\n%s", treeHeight, usage);
    return;
  }

  console.log("");
  for (let i = 0; i < treeHeight; i++) {
    printLevel(treeHeight, i, flags.decorate);
  }
  printTrunk(treeHeight, flags.decorate);
  console.log("");
}

if (import.meta.main) {
  printTree(Deno.args);
}
