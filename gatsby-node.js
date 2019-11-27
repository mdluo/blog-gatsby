/**
 * https://github.com/gatsbyjs/gatsby/issues/1457
 */
require('source-map-support').install();
require('ts-node').register({
  // Set `transpileOnly` to true to avoid type errors at the first-time run
  // when the graphql codegen has never run.
  // (The chicken or the egg causality dilemma)
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

exports.createPages = require('./src/gatsby/createPages').createPages;
