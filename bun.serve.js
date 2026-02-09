import { bunBuild } from "./bun.config.js";
import { watch } from "fs";

await bunBuild({ dev: true });

watch("./src", { recursive: true }, async () => {
    console.log("Rebuilding...");
    await bunBuild({ dev: true });
});

Bun.serve({
    port: 3000,

    fetch(req) {
        const url = new URL(req.url);

        if (url.pathname.startsWith("/dist")) {
            const filePath = `.${url.pathname}`;
            return new Response(Bun.file(filePath));
        }

        return new Response("Bun dev server running");
    },
});

console.log("Dev server http://localhost:3000");