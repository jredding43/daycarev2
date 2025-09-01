// scripts/build-content-index.mjs
import { mkdir, readdir, copyFile, writeFile } from "fs/promises";
import { join } from "path";

const SRC_ROOT = "src/content";
const PUB_ROOT = "public/content";
const BUCKETS = ["programs", "closures", "documents", "information"];

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function buildBucket(bucket) {
  const srcDir = join(SRC_ROOT, bucket);
  const pubDir = join(PUB_ROOT, bucket);

  // Ensure destination dirs exist
  await ensureDir(PUB_ROOT);
  await ensureDir(pubDir);

  let files = [];
  try {
    // list all .json files in src bucket
    files = (await readdir(srcDir)).filter((f) => f.toLowerCase().endsWith(".json")).sort();
  } catch {
    // if the folder doesn't exist yet, treat as empty
    files = [];
  }

  // Copy each JSON file to public/content/<bucket>/<file>
  for (const f of files) {
    await copyFile(join(srcDir, f), join(pubDir, f));
  }

  // Write index file in public/content/<bucket>.json
  await writeFile(join(PUB_ROOT, `${bucket}.json`), JSON.stringify(files, null, 2));
  console.log(`✓ ${bucket}: ${files.length} items, index written`);
}

async function main() {
  for (const b of BUCKETS) {
    await buildBucket(b);
  }
}

main().catch((err) => {
  console.error("build-content-index failed:", err);
  process.exit(1);
});
