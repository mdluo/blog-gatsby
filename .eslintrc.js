module.exports = {
  extends: [
    'react-app',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['graphql', 'prettier'],
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        schemaJsonFilepath: `${__dirname}/.cache/caches/gatsby-plugin-typegen/schema.json`,
        tagName: 'graphql',
      },
    ],
    'prettier/prettier': 'error',
  },
};
