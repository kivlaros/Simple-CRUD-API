import path from 'path';
import nodeExternals from 'webpack-node-externals';
import Dotenv from 'dotenv-webpack';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

export default {
  context: paths.src,
  entry: {
    app: './server.ts',
  },
  target: 'node',
  externals: [nodeExternals()],
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }, // загрузчик для обработки файлов с расширением .ts
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
  },
  output: {
    path: paths.dist,
    filename: '[name].bundle.js',
  },
  plugins: [new Dotenv()],
};
