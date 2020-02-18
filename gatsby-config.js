const path = require('path');
const pxtorem = require('postcss-pxtorem');

const gatsbyRemarkPlugins = [
  {
    resolve: 'gatsby-remark-images',
    options: {
      maxWidth: 960,
    },
  },
  {
    resolve: 'gatsby-remark-responsive-iframe',
    options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
  },
  {
    resolve: `gatsby-remark-vscode`,
    options: {
      extensionDataDirectory: path.resolve('extensions'),
      extensions: [
        {
          identifier: 'akamud.vscode-theme-onelight',
          version: '2.1.0',
        },
      ],
      colorTheme: 'Atom One Light',
      wrapperClassName: ({ parsedOptions }) => {
        if (parsedOptions.ln === false) {
          return 'no-ln';
        }
      },
      getLineClassName: ({ codeFenceOptions }) => {
        if (codeFenceOptions.ln === false) {
          return 'no-ln';
        }
      },
    },
  },
  'gatsby-remark-copy-linked-files',
  'gatsby-remark-autolink-headers',
];

module.exports = {
  siteMetadata: {
    title: `mdluo's blog`,
    description: ``,
    author: `mdluo`,
    menu: ['Wiki', 'About'],
    github: {
      owner: `mdluo`,
      repo: `blog-gatsby`,
    },
    disqus: process.env.GITHUB_ACTIONS ? `mdluo` : `mdluo-local`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mdluo's blog`,
        short_name: `mdluo`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.svg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          path.resolve(__dirname, 'src/assets/scss'),
          path.resolve(__dirname, 'node_modules'),
        ],
        postCssPlugins: [
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-typegen`,
  ],
};
