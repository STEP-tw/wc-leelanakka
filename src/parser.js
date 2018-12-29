const uniqueThings = function(array, element) {
  if (array.includes(element)) {
    return array;
  }
  return array.concat([element]);
};

const findUniqueElements = function(array) {
  return array.reduce(uniqueThings, []);
};

const sortOptions = function(options) {
  options = findUniqueElements(options);
  let order = ["l", "w", "c"];
  return order.filter(x => options.includes(x));
};

const longOptions = {
  l: "line",
  w: "word",
  c: "byte"
};

const parseInputs = function(args) {
  let index = 0;
  let options = [];
  while (index < args.length && args[index].startsWith("-")) {
    options = options.concat(args[index].slice(1).split(""));
    index++;
  }

  if (index == 0) {
    options = ["l", "w", "c"];
  }

  options = sortOptions(options).map(option => longOptions[option]);
  let fileNames = args.slice(index);
  return { options, fileNames };
};

module.exports = {
  sortOptions,
  parseInputs
};
