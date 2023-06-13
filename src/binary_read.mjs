import fs from "fs-extra";
const buffer = await fs.readFile("./data/unicodes_contours.dat");
const a = new Uint8Array(buffer.buffer);
const map = new Map();
let wasted = 0;
for (let index = 0; index < a.length; index++) {
    const element = a[index];
    element !== 0 ? map.set(index, element) : wasted++;
}

console.log(200812, map.get(200812), 87);
console.log(16958, map.get(16958), 17);
console.log(35324, map.get(35324), 23);
console.log(wasted, a.length);
