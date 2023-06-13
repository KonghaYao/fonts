import fs from "fs-extra";
import { Font } from "fonteditor-core";
const fontPaths = await fs.readJson("./data/fontPath.json");

const collection = new Map();

for (const path_ of fontPaths) {
    const buffer = await fs.readFile(path_);
    // read font data, support ArrayBuffer | Buffer | string
    const font = Font.create(buffer, {
        type: "ttf",
        compound2simple: true,
        inflate: null,
        combinePath: false,
    });
    font.get().glyf.forEach((i) => {
        i.unicode &&
            i.unicode.forEach((ii) => {
                if (collection.has(ii)) {
                    collection.set(
                        ii,
                        Math.max(collection.get(ii), i.contours.length)
                    );
                } else {
                    collection.set(ii, i.contours.length);
                }
            });
    });
}
fs.outputJSON("./data/unicodes_contours.json", [...collection.entries()]);
