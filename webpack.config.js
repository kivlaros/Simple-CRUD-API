import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';
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
  target: 'node18',
  experiments: {
    outputModule: true
  },
  externalsPresets: { node: true }, // Для Node.js
  externals: [
    nodeExternals({
      modulesFromFile: true // Автоматически определять внешние зависимости
    })
  ],
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
  },
  output: {
    module: true,
    chunkFormat: 'module',
    path: paths.dist,
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
