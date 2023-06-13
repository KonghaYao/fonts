import fs from "fs-extra";
const list = await fs.readdir("../ofl");
const allFonts = list.filter((i) => i.startsWith("notosans"));

console.log(allFonts.length);

const files = [];
for (const font of allFonts) {
    const allFile = await fs.readdir("../ofl/" + font);
    for (const file of allFile) {
        if (file.endsWith(".ttf")) {
            files.push("../ofl/" + font + "/" + file);
            break;
        }
    }
}
console.log(files.length);
fs.outputJSON("./data/fontPath.json", files);
