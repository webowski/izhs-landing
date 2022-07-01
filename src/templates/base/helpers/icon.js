const Handlebars = require('handlebars')

const icon = (name, options) => {

	let attributes = []

	Object.keys(options.hash).forEach(key => {
		let escapedKey = Handlebars.escapeExpression(key)
		let escapedValue = Handlebars.escapeExpression(options.hash[key])
		attributes.unshift(escapedKey + '="' + escapedValue + '"')
	})

	attributes = attributes.join(' ')

	let iconId = `#icon-${name}`

	let output = `<svg ${attributes}><use href="${iconId}"></svg>`

  return new Handlebars.SafeString(output)
}

module.exports = icon
