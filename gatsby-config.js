const path = require('path');
const fileIconTable = require('file-icons/lib/icons/icon-tables');

module.exports = {
  siteMetadata: {
    title: `mdluo's blog`,
    description: '',
    author: `mdluo`,
    repo: 'mdluo/blog-gatsby',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: 'src/pages',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: 'contents',
      },
      __key: 'posts',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: 'src/images',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              elements: ['h1', 'h2', 'h3'],
              enableCustomId: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              wrapperStyle: 'border-radius: 5px; overflow: hidden;',
            },
          },
          {
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: {
                default: 'Atom One Light',
                parentSelector: {
                  'body.light-mode': 'Atom One Light',
                  'body.dark-mode': 'One Dark Pro',
                },
              },
              extensions: [
                path.resolve(
                  'extensions/akamud.vscode-theme-onelight-2.2.3.vsix'
                ),
                path.resolve(
                  'extensions/zhuangtongfa.Material-theme-3.13.21.vsix'
                ),
              ],
              wrapperClassName: ({ language, parsedOptions }) => {
                const classNames = [];
                const match = fileIconTable.matchName(`.${language}`);
                if (match) {
                  const [color] = match.colour;
                  classNames.push(color);
                }
                if (parsedOptions.breakSpaces) {
                  classNames.push('break-spaces');
                }
                if (parsedOptions.noLabel || language === 'shell') {
                  classNames.push('no-label');
                }
                if (parsedOptions.prompt === '$') {
                  classNames.push('prompt-dollar');
                }
                if (parsedOptions.prompt === '#') {
                  classNames.push('prompt-hash');
                }
                return classNames.join(' ');
              },
              languageAliases: {
                shell: 'sh',
              },
            },
          },
        ],
      },
    },
    'gatsby-plugin-use-dark-mode',
    {
      resolve: 'gatsby-plugin-draft',
      options: {
        nodeType: 'Mdx',
        // set `fields.draft` to `false` for all nodes when NODE_ENV is
        // 'development'
        pickDraft: node => node.frontmatter.publish !== true,
        publishDraft: process.env.NODE_ENV === 'development',
      },
    },
    {
      resolve: 'gatsby-plugin-typegen',
      options: {
        outputPath: `.cache/generated/gatsby-types.d.ts`,
        emitSchema: {
          '.cache/generated/gatsby-schema.graphql': true,
          '.cache/generated/gatsby-introspection.json': true,
        },
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.svg',
      },
    }
  ],
};
