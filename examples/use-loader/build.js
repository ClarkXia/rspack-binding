const path = require('node:path');

const rspack = require('@rspack-template/core');

const compiler = rspack({
  context: __dirname,
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // Use the compilation loader for JavaScript transformation
            loader: 'builtin:compilation-loader',
            options: JSON.stringify({
              swc_options: {
                config: {
                  jsc: {
                    parser: {
                      syntax: "ecmascript",
                      jsx: false
                    },
                    transform: {},
                    target: "es2015"
                  },
                  module: {
                    type: "commonjs"
                  }
                }
              }
            }),
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Register the CompilationLoaderPlugin to enable the `builtin:compilation-loader` loader
    new rspack.CompilationLoaderPlugin(),
  ],
});

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  }
  console.info(stats.toString({ colors: true }));
});
