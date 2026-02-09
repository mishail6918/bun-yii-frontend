import views from "./entry.json";
import fs from "fs";

function normalizeName(view) {
    return view.toLowerCase().replace(/\//g, '.');
}

function getEntry(name) {
    return `./src/pages/${name}/index.js`;
}

export const entries = {};

for (const view of views) {
    const file = getEntry(view);

    if (fs.existsSync(file)) {
        entries[normalizeName(view)] = file;
    }
}