const path = require('node:path');

const rspack = require('@rspack-template/core');

const compiler = rspack({
  context: __dirname,
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new rspack.ManifestPlugin()],
});

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  }
  console.info(stats.toString({ colors: true }));
});
