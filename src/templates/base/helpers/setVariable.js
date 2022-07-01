const setVariable = (varName, varValue, options) => {
	options.data.root[varName] = varValue
  return
}

module.exports = setVariable
