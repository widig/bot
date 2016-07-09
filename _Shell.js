function parseOptions(opt, map) {
  if (!map)
    error('parseOptions() internal error: no map given');

  // All options are false by default
  var options = {};
  for (var letter in map) {
    if (map[letter][0] !== '!')
      options[map[letter]] = false;
  }

  if (!opt)
    return options; // default

  var optionName;
  if (typeof opt === 'string') {
    if (opt[0] !== '-')
      return options;

    // e.g. chars = ['R', 'f']
    var chars = opt.slice(1).split('');

    chars.forEach(function(c) {
      if (c in map) {
        optionName = map[c];
        if (optionName[0] === '!')
          options[optionName.slice(1, optionName.length-1)] = false;
        else
          options[optionName] = true;
      } else {
        error('option not recognized: '+c);
      }
    });
  } else if (typeof opt === 'object') {
    for (var key in opt) {
      // key is a string of the form '-r', '-d', etc.
      var c = key[1];
      if (c in map) {
        optionName = map[c];
        options[optionName] = opt[key]; // assign the given value
      } else {
        error('option not recognized: '+c);
      }
    }
  } else {
    error('options must be strings or key-value pairs');
  }
  return options;
}
function expand(list) {
  if (!Array.isArray(list)) {
    throw new TypeError('must be an array');
  }
  var expanded = [];
  list.forEach(function(listEl) {
    // Don't expand non-strings
    if (typeof listEl !== 'string') {
      expanded.push(listEl);
    } else {
      var ret = glob.sync(listEl, config.globOptions);
      // if glob fails, interpret the string literally
      expanded = expanded.concat(ret.length > 0 ? ret : [listEl]);
    }
  });
  return expanded;