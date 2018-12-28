const isSingleOption = function(option) {
  return option == "-c" || option == "-w" || option == "-l";
};

const isMultipleOptions = function(args) {
  return isSingleOption(args[2]);
};

const isTwoOptions = function(args) {
  return isSingleOption(args[1]) || args[0].length == 3;
};

const sortOptions = function(options) {
  if (
    !options
      .join("")
      .split("")
      .includes("l")
  ) {
    return ["-w", "-c"];
  }

  if (
    !options
      .join("")
      .split("")
      .includes("w")
  ) {
    return ["-l", "-c"];
  }

  return ["-l", "-w"];
};

const parseInputs = function(args) {
  let index = 0;
  let options = [];
  while (index < args.length && args[index].startsWith("-")) {
    options.push(args[index]);
    index++;
  }
  if (index == 0) {
    options = ["-lcw"];
  }
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
