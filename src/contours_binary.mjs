import fs from "fs-extra";
const list = await fs.readJSON("./data/unicodes_contours.json");

const buf = new Uint8Array(200812 + 1);
const vals = [];
// 18 位 key，8位value，共26位
for (let index = 0; index < list.length; index++) {
    const [key, val] = list[index];
    buf[key] = val;
    vals.push(val);
}
buf[0] = vals.sort((a, b) => a - b)[Math.floor(vals.length / 2)];
const avg = Math.floor(
    vals.reduce((col, cur) => {
        return col + cur;
    }, 0) / vals.length
);

console.log("中位数", buf[0], "平均数", avg);
fs.outputFile("./data/unicodes_contours.dat", buf);
