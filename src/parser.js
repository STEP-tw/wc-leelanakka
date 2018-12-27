const isSingleOption = function(option) {
  return option == "-c" || option == "-w" || option == "-l";
};

const isMultipleOptions = function(args) {
  return isSingleOption(args[2]);
};

const isTwoOptions = function(args) {
  return isSingleOption(args[1]);
};

const sortOptions = function(options) {
  if (!options.includes("-l")) {
    return ["-w", "-c"];
  }

  if (!options.includes("-w")) {
    return ["-l", "-c"];
  }
  return ["-l", "-w"];
};

module.exports = {
  isMultipleOptions,
  isSingleOption,
  isTwoOptions,
  sortOptions
};
