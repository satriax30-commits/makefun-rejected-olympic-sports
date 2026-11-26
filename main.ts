// main.ts — "Rejected Olympic Sports" entry writer.
//
// Writes exactly one line — the entry — to /output/entry.txt
// (or to the path given as the first CLI argument, for local testing).
// Standard library only. Deterministic: no clock, no randomness, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: 170 characters. Broadcast-plausible invented event, absurdity
// from the sport itself, twist in the last clause (the queue-jumper loses
// to the one man obeying the 12-items-or-fewer rule).
const ENTRY =
  "Queue-jump sprint final: 8 finalists, 1 checkout. Defending champion Lars vaults a pensioner, a pram and the last basket — then loses to a man carrying 12 items or fewer.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace. Enforce it here so a bad entry can never be written.
if ([...ENTRY].length < 1 || [...ENTRY].length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${[...ENTRY].length} characters, outside the 1-200 gate`);
}

const outPath = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
// Exactly the entry text, no trailing newline: the file is one line,
// and its character count is the entry's character count.
writeFileSync(outPath, ENTRY, "utf8");

