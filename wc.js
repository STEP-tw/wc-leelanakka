const { readFileSync } = require("fs");
const { wc } = require("./src/lib.js");

console.log(wc(process.argv.slice(2), readFileSync));
