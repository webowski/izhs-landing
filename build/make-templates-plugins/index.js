import fs                        from 'fs-extra'
import { resolve }               from 'path'
import HtmlWebpackPlugin         from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'

export default function makeTemplatesPlugins(args) {
	let {
		templatesPath = 'src/templates/',
		dataJsonPath = 'src/templates/base/data.json'
	} = {...args}

	const templates = fs
		.readdirSync(resolve(templatesPath))
		.filter(filename => {
			return filename.match(/\.hbs/)
		})

	let templatesPlugins = []

	templates.forEach(templateName => {
		templatesPlugins.push(
			new HtmlWebpackPlugin({
				template: templatesPath + templateName,
				filename: templateName.replace('.hbs', '.html'),
				minify: false,
				inject: false,
				templateParameters: JSON.parse(
					fs.readFileSync(resolve(dataJsonPath))
				),
				cache: true,
				alwaysWriteToDisk: true
			})
		)
	})

	templatesPlugins.push(
		new HtmlWebpackHarddiskPlugin
	)

	return templatesPlugins
}
