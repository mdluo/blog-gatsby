const fs = require('fs');
const axios = require('axios');
const querystring = require('querystring');
const glob = require('fast-glob');
const matter = require('gray-matter');

const {
  siteMetadata: { github },
} = require('../gatsby-config');

const short = async slug => {
  const res = await axios.post(
    'https://git.io',
    querystring.stringify({
      url: `https://${github.owner}.github.io/${github.repo}/${slug}`,
    })
  );
  return res.headers.location;
};

(async () => {
  try {
    const files = await glob('contents/*.md');
    files.forEach(async p => {
      const file = matter.read(p);
      if (file.data.slug) {
        const link = await short(file.data.slug);
        file.data.link = link;
        fs.writeFileSync(p, matter.stringify(file));
      }
    });
  } catch (error) {
    console.error(error);
  }
})();
