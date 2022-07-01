const Handlebars = require('handlebars')

function makeAttributesString(obj) {
	let attributes = []

	Object.keys(obj).forEach(key => {
		let escapedKey = Handlebars.escapeExpression(key)
		let escapedValue = Handlebars.escapeExpression(obj[key])
		attributes.unshift(escapedKey + '="' + escapedValue + '"')
	})

	attributes = attributes.join(' ')
	return attributes
}

module.exports = function(options) {
		let src = options.hash.src
		delete options.hash.src

		let altText = ''
		if (options.hash.hasOwnProperty('alt')) {
			altText = options.hash.alt
			delete options.hash.alt
		}

		let srcset = ''
		if (options.hash.hasOwnProperty('src:2x')) {
			src2x = options.hash['src:2x']
			srcset = ` srcset="${src} 1x, ${src2x} 2x"`
			delete options.hash['src:2x']
		}

		let attributes = makeAttributesString(options.hash)

		let output = `<picture ${attributes}>
			<img src="${src}"${srcset} alt="${altText}">
		</picture>`

		return new Handlebars.SafeString(output)
}
