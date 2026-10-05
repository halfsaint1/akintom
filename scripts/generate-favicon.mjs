import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "app", "icon.svg");
const svg = fs.readFileSync(svgPath);

const pngOutputs = [
  { file: path.join(root, "app", "icon.png"), size: 32 },
  { file: path.join(root, "app", "apple-icon.png"), size: 180 },
  { file: path.join(root, "public", "favicon-32x32.png"), size: 32 },
  { file: path.join(root, "public", "apple-touch-icon.png"), size: 180 },
];

async function main() {
  for (const { file, size } of pngOutputs) {
    await sharp(svg).resize(size, size).png().toFile(file);
    console.log(`Created ${path.relative(root, file)}`);
  }

  const favicon32 = fs.readFileSync(path.join(root, "public", "favicon-32x32.png"));
  const ico = await toIco([favicon32]);
  for (const file of [
    path.join(root, "app", "favicon.ico"),
    path.join(root, "public", "favicon.ico"),
  ]) {
    fs.writeFileSync(file, ico);
    console.log(`Created ${path.relative(root, file)}`);
  }

  fs.copyFileSync(svgPath, path.join(root, "public", "favicon.svg"));
  console.log("Created public/favicon.svg");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
