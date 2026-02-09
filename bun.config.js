import { build } from "bun";
import fs from "fs";
import path from "path";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindPostcss from "@tailwindcss/postcss";
import styleLoader from "bun-style-loader";

const PATHS = {
    src: "./src",
    dist: "./dist",
};

const views = JSON.parse(
    fs.readFileSync("./entry.json", "utf8")
);

const getEntry = name => `./src/pages/${name}/index.js`;

function collectEntries() {
    const entries = {};

    for (const view of views) {
        const normal = getEntry(view);

        const key = view.toLowerCase().replace(/\//g, ".");

        if (fs.existsSync(normal)) {
            entries[key] = normal;
        }
    }

    return entries;
}

async function processCss() {
    const cssInput = path.join(PATHS.src, "styles/globals.css");
    const cssOutput = path.join(PATHS.dist, "styles/main.css");

    if (!fs.existsSync(cssInput)) return;

    const css = fs.readFileSync(cssInput, "utf8");
    const result = await postcss([tailwindPostcss(), autoprefixer()]).process(css, {
        from: cssInput,
        to: cssOutput,
    });

    fs.mkdirSync(path.dirname(cssOutput), { recursive: true });
    fs.writeFileSync(cssOutput, result.css);

    console.log("✅ CSS processed with Tailwind & PostCSS");
}

export async function bunBuild({ dev = false } = {}) {
    const entries = collectEntries();
    console.log(entries);

    await processCss();

    await build({
        entrypoints: Object.values(entries),

        outdir: PATHS.dist,

        plugins: [
            styleLoader(),
        ],

        splitting: true,
        sourcemap: dev ? "inline" : "external",
        minify: !dev,

        naming: {
            entry: "[dir]/[name].[ext]",
            chunk: "chunks/[name]-[hash].[ext]",
            asset: "assets/[name]-[hash].[ext]",
        },

        target: "browser",
    });

    console.log("Build finished");
}
