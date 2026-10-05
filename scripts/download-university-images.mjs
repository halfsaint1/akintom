import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");

const universities = [
  {
    file: "uni-south-wales.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/31/Treforest_Campus_Students%27_Union.JPG",
  },
  {
    file: "uni-derby.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/University_of_Derby%2C_Campus.jpg",
  },
  {
    file: "uni-sunderland.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/St_Peter%27s_Campus_of_the_University_of_Sunderland_-_geograph.org.uk_-_2194707.jpg",
  },
  {
    file: "uni-hertfordshire.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8b/University_of_Hertfordshire_de_Havilland_Campus%2C_Hatfield_01.jpg",
  },
  {
    file: "uni-hull.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/09/UoH_Sep23_Venn_Building.jpg",
  },
  {
    file: "uni-york-st-john.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/York_St_John_University.jpg",
  },
];

async function downloadOne({ file, url }) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AkintomSiteSetup/1.0 (contact: info@akintomglobalresources.com)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  fs.mkdirSync(outDir, { recursive: true });
  const dest = path.join(outDir, file);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`Saved ${file}`);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  for (const uni of universities) {
    await downloadOne(uni);
    await wait(1500);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
