import 'dotenv/config';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

const cwd = process.cwd();
const tsConfigFilePath = path.join(cwd, 'tsconfig.json');

const { NODE_ENV } = process.env;
const SRC_PATH = path.join(cwd, 'src');
const STATIC_PATH = path.join(cwd, 'static');
const BUILD_PATH = path.join(cwd, 'build');

const isProduction = NODE_ENV === 'production';

export default {
  mode: NODE_ENV ?? 'development',
  devtool: isProduction ? false : 'eval-source-map',
  entry: {
    app: path.join(SRC_PATH, 'index.tsx')
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: tsConfigFilePath,
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigFilePath
      })
    ],
    alias: {
      '@app': path.join(process.cwd(), 'app')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_URL': JSON.stringify(process.env.APP_URL),
      'process.env.NHOST_BACKEND_URL': JSON.stringify(process.env.NHOST_BACKEND_URL)
    }),
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: path.join(SRC_PATH, 'index.html'),
      filename: path.join(BUILD_PATH, 'index.html')
    }),
    isProduction && new CopyWebpackPlugin({
      patterns: [{
        from: STATIC_PATH,
        to: BUILD_PATH
      }]
    })
  ].filter(Boolean),
  devServer: {
    static: [
      {
        directory: STATIC_PATH,
        watch: true
      },
      {
        directory: BUILD_PATH,
        watch: true
      }
    ],
    historyApiFallback: true,
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 4000,
    open: true
  }
};
