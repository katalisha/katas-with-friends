import { parseArgs } from "https://deno.land/std@0.208.0/cli/mod.ts";
import { toText } from "https://deno.land/std@0.208.0/streams/to_text.ts";

const defaultCharacterMap = Array.from({ length: 127 }).map((_, i) => String.fromCharCode(i));

function generateCharacterMap(key: string) {
  const characterMap = [...defaultCharacterMap];
  while (key.length > 0) {
    const [from, to] = [...key.slice(0, 2)];
    characterMap[from.charCodeAt(0)] = to;
    characterMap[from.toUpperCase().charCodeAt(0)] = to.toUpperCase();
    characterMap[to.charCodeAt(0)] = from;
    characterMap[to.toUpperCase().charCodeAt(0)] = from.toUpperCase();
    key = key.slice(2);
  }
  return characterMap;
}

function encode(message: string, key: string) {
  const characterMap = generateCharacterMap(key);
  return [...message].map((char) => {
    if (char > 'z') {
      return char;
    }
    return characterMap[char.charCodeAt(0)];
  }).join('');
}

const usage = `usage: ./encode [-h|--help] -k|--key <key> [message]

encode a super secret message

arguments:
  message         message to encode

options:
  --key, -k       key that should be used to encode the message
  --help, -h      show this help message and exit`;

async function run(args: string[]) {
  const flags = parseArgs(args, {
    boolean: ["help"],
    string: ["key"],
    alias: {
      help: "h",
      key: "k",
    },
  });

  if (flags.help) {
    console.log(usage);
    return;
  }

  if (!flags.key) {
    console.error('error: missing required key option');
    console.error(usage);
    return;
  }

  let message = flags._.join(' ');
  if (!message) {
    message = await toText(Deno.stdin.readable);
  }

  console.log('message: %s', encode(message, flags.key));
}

if (import.meta.main) {
  run(Deno.args);
}
