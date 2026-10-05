import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");
const manifestPath = path.join(__dirname, "image-manifest.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { source: "", url: "", list: false, auto: false };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--source" && args[i + 1]) {
      config.source = path.resolve(args[++i]);
    } else if (arg === "--url" && args[i + 1]) {
      config.url = args[++i].replace(/\/$/, "");
    } else if (arg === "--list") {
      config.list = true;
    } else if (arg === "--auto") {
      config.auto = true;
    }
  }

  return config;
}

function walkImages(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkImages(fullPath, files);
      continue;
    }
    if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function scoreFile(filePath, keywords) {
  const haystack = filePath.toLowerCase();
  let score = 0;
  for (const keyword of keywords) {
    if (haystack.includes(keyword.toLowerCase())) score += 1;
  }
  return score;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyToOutput(sourcePath, outputName) {
  ensureDir(outDir);
  const ext = path.extname(sourcePath).toLowerCase();
  const base = outputName.replace(/\.(png|jpe?g|webp|gif|avif)$/i, "");
  const dest = path.join(outDir, `${base}${ext}`);
  fs.copyFileSync(sourcePath, dest);
  return dest;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AkintomImageImport/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function extractImageUrls(html, baseUrl) {
  const urls = new Set();
  const patterns = [
    /(?:src|data-src|data-lazy-src)=["']([^"']+\.(?:jpg|jpeg|png|webp|gif))["']/gi,
    /url\(["']?([^"')]+\.(?:jpg|jpeg|png|webp|gif))["']?\)/gi,
    /(?:href)=["']([^"']+\.(?:jpg|jpeg|png|webp|gif))["']/gi,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const raw = match[1];
      if (!raw || raw.startsWith("data:")) continue;
      try {
        urls.add(new URL(raw, baseUrl).href);
      } catch {
        // ignore invalid URLs
      }
    }
  }

  return [...urls];
}

async function downloadUrl(url, outputName) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AkintomImageImport/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Download failed ${url}: ${res.status}`);

  ensureDir(outDir);
  const contentType = res.headers.get("content-type") ?? "";
  let ext = path.extname(new URL(url).pathname).toLowerCase();
  if (!IMAGE_EXT.has(ext)) {
    if (contentType.includes("png")) ext = ".png";
    else if (contentType.includes("webp")) ext = ".webp";
    else ext = ".jpg";
  }

  const base = outputName.replace(/\.(png|jpe?g|webp|gif|avif)$/i, "");
  const dest = path.join(outDir, `${base}${ext}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  return dest;
}

async function importFromUrl(siteUrl, manifest, auto) {
  const pages = [
    siteUrl,
    `${siteUrl}/about-us/`,
    `${siteUrl}/about/`,
    `${siteUrl}/services/`,
    `${siteUrl}/contact/`,
    `${siteUrl}/testimonials/`,
    `${siteUrl}/news/`,
  ];

  const discovered = new Set();
  for (const page of pages) {
    try {
      const html = await fetchHtml(page);
      for (const imageUrl of extractImageUrls(html, page)) {
        if (imageUrl.includes("wp-content/uploads")) discovered.add(imageUrl);
      }
      console.log(`Scanned ${page}: ${discovered.size} upload images found so far`);
    } catch (error) {
      console.warn(`Skipped ${page}: ${error.message}`);
    }
  }

  if (discovered.size === 0) {
    throw new Error(
      "No WordPress upload images found. Re-enable the old site in aaPanel or use --source with a local wp-content/uploads folder.",
    );
  }

  const urls = [...discovered];
  if (!auto) {
    console.log("\nDiscovered images:");
    urls.forEach((url, index) => console.log(`${index + 1}. ${url}`));
    console.log("\nRe-run with --auto to map the best matches into public/images/.");
    return;
  }

  for (const target of manifest.targets) {
    let bestUrl = "";
    let bestScore = 0;
    for (const url of urls) {
      const score = scoreFile(url, target.keywords);
      if (score > bestScore) {
        bestScore = score;
        bestUrl = url;
      }
    }
    if (!bestUrl) continue;
    const dest = await downloadUrl(bestUrl, target.output);
    console.log(`Saved ${target.output} <- ${bestUrl}`);
    console.log(`  -> ${path.relative(root, dest)}`);
  }
}

function importFromSource(sourceDir, manifest, auto) {
  const files = walkImages(sourceDir);
  if (files.length === 0) {
    throw new Error(`No images found under ${sourceDir}`);
  }

  if (!auto) {
    console.log(`Found ${files.length} images in ${sourceDir}:\n`);
    files.forEach((file, index) => console.log(`${index + 1}. ${file}`));
    console.log("\nRe-run with --auto to copy the best matches into public/images/.");
    return;
  }

  for (const target of manifest.targets) {
    let bestFile = "";
    let bestScore = 0;
    for (const file of files) {
      const score = scoreFile(file, target.keywords);
      if (score > bestScore) {
        bestScore = score;
        bestFile = file;
      }
    }
    if (!bestFile) continue;
    const dest = copyToOutput(bestFile, target.output);
    console.log(`Saved ${target.output} <- ${bestFile}`);
    console.log(`  -> ${path.relative(root, dest)}`);
  }
}

async function main() {
  const config = parseArgs();
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!config.source && !config.url) {
    console.log(`Usage:
  npm run images:import -- --source "C:/path/to/wp-content/uploads" --list
  npm run images:import -- --source "C:/path/to/wp-content/uploads" --auto
  npm run images:import -- --url http://akintomglobalresources.com --list
  npm run images:import -- --url http://akintomglobalresources.com --auto

aaPanel tip:
  1. File Manager -> your old WordPress site -> wp-content/uploads
  2. Compress and download the uploads folder
  3. Extract locally, then run the --source command above`);
    process.exit(1);
  }

  if (config.url) {
    await importFromUrl(config.url, manifest, config.auto);
  } else {
    importFromSource(config.source, manifest, config.auto);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
