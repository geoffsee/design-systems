import { cp, mkdir, rm } from "node:fs/promises";

const source = "design-systems";
const destination = "dist/design-systems";

await rm(destination, { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp(source, destination, { recursive: true });
