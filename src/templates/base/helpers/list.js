// const Handlebars  = require('handlebars')

// Handlebars.registerHelper('list', (context, options) => {
//   let output = '<ul>\n'

//   for (let i = 0, j = context.length; i < j; i++) {
//     output = output + '\t<li>' + options.fn(context[i]).trim() + '</li>\n'
//   }

//   output += '</ul>\n'

//   return output
// })


const list = (context, options) => {

  let output = '<ul>\n'

  for (let i = 0, j = context.length; i < j; i++) {
    output = output + '\t<li>' + options.fn(context[i]).trim() + '</li>\n'
  }

  output += '</ul>\n'

  return output
}

module.exports = list
