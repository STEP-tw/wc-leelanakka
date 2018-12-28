const isSingleOption = function(option) {
  return option == "-c" || option == "-w" || option == "-l";
};

const isMultipleOptions = function(args) {
  return isSingleOption(args[2]);
};

const isTwoOptions = function(args) {
  return isSingleOption(args[1]) || args[0].length == 3;
};

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
  if (
    !options
      .join("")
      .split("")
      .includes("l")
  ) {
    return ["w", "c"];
  }

  if (
    !options
      .join("")
      .split("")
      .includes("w")
  ) {
    return ["l", "c"];
  }

  return ["l", "w"];
};

order = ['-l','-w','-c']
const parseInputs = function(args) {
  let index = 0;
  let options = [];
  while (index < args.length && args[index].startsWith("-")) {
    options = options.concat(args[index].slice(1).split(''))
    index++;
  }

  if (index == 0) {
    options = ["l","c","w"];
  }
  
  options = findUniqueElements(options);
  let fileNames = args.slice(index);
  return { options, fileNames };
};
module.exports = {
  isMultipleOptions,
  isSingleOption,
  isTwoOptions,
  sortOptions,
  parseInputs
};
