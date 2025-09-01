import { readdir, writeFile } from "fs/promises";
import { join } from "path";

const ROOT = "public/content";
const buckets = ["programs", "closures", "documents", "information"]; 

const main = async () => {
  for (const b of buckets) {
    const dir = join(ROOT, b);
    let files = [];
    try {
      files = (await readdir(dir)).filter(f => f.endsWith(".json")).sort();
    } catch {
      files = [];
    }
    await writeFile(join(ROOT, `${b}.json`), JSON.stringify(files, null, 2));
  }
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
