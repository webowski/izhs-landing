import path, { resolve }    from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import SVGSpritemapPlugin   from 'svg-spritemap-webpack-plugin'
import makeTemplatesPlugins from './build/make-templates-plugins/index.js'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'


const __dirname = resolve()
const mode = process.env.NODE_ENV || 'development'
const target = mode === 'development' ? 'web' : 'browserslist'

export default {
	mode: mode,
	target: target,

	entry: {
    bundle: {
			import: resolve('./src/scripts/index.js'),
			filename: './scripts/[name].min.js'
		},
	},

	output: {
    path: resolve(__dirname, 'dist')
	},

	module: {
		rules: [

			// Styles
			{
				test: /\.(scss|css)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: resolve(__dirname, '/dist/styles'),
						}
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env'],
								]
							}
						}
					},
					'sass-loader',
				]
			},

			// Scripts
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						cacheDirectory: true,
					}
				}
			},

			// Images
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: (pathData) => {
						let relativePath = pathData.module.resourceResolveData.relativePath
						let dirName = path.dirname(relativePath).replace('./src/', '')
						return dirName + '/[name][ext]'
					}
				}
			},

			// Templates
			{
				test: /\.hbs$/,
				use: [{
					loader: 'handlebars-loader',
					options: {
						helperDirs: [
							resolve('src/templates/base/helpers'),
						],
						partialDirs: [
							resolve('src/templates/layouts'),
							resolve('src/templates/partials'),
						],
						// debug: true,
						inlineRequires: /(media|images)\//
					}
				}]
			},

		]
	},

	plugins: [

		new MiniCssExtractPlugin({
			filename: 'styles/[name].min.css',
		}),

		new SVGSpritemapPlugin(resolve('./src/images/icons/*.svg'), {
			output: {
				filename: 'images/icons.min.svg',
				svgo: false,
			},
			sprite: {
				prefix: 'icon-',
				generate: {
					title: false,
				}
			}
		}),

		...makeTemplatesPlugins({
			templatesPath: 'src/templates/'
		}),

	],

	optimization: {
    minimizer: [
      '...',
			new ImageMinimizerPlugin({
				deleteOriginalAssets: true,
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
              ['mozjpeg', { quality: [80, 87] }],
              ['pngquant', { quality: [0.80, 0.87] }],
						]
					}
				}
			})
    ]
  },

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			handlebars: 'handlebars/dist/handlebars.js',
		}
	},

	devtool: mode === 'development' ? 'source-map' : false,

	performance: {
		// hints: 'warning',
		hints: false,
	},

	watchOptions: {
		ignored: '**/node_modules',
	},

	devServer: {
		open: true,
    liveReload: true,
		hot: false,
		port: 3000,
		static: {
			directory: resolve(__dirname, 'dist'),
			staticOptions: {},
			publicPath: resolve(__dirname, 'dist'),
			serveIndex: true,
			watch: false,
		}
	}
}
