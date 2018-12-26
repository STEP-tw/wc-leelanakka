const { readFileSync } = require("fs");
const { count } = require("./src/lib.js");

console.log(count(process.argv[2], readFileSync));
