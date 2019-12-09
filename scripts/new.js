const fs = require('fs');
const childProcess = require('child_process');
const prompts = require('prompts');
const slugify = require('slugify');
const moment = require('moment');
const glob = require('fast-glob');
const matter = require('gray-matter');

const link = require('./link');

(async () => {
  const response = await prompts([
    {
      type: 'select',
      name: 'type',
      message: 'Type',
      choices: [
        { title: 'Post', value: 'post' },
        { title: 'Page', value: 'page' },
      ],
    },
    {
      type: 'text',
      name: 'title',
      message: 'Title',
    },
    {
      type: 'text',
      name: 'slug',
      message: 'Slug',
      initial: prev => slugify(prev, { lower: true }),
    },
    {
      type: 'date',
      name: 'date',
      message: 'Date',
      initial: new Date(),
    },
    {
      type: 'list',
      name: 'tags',
      message: 'Tags',
    },
    {
      type: 'toggle',
      name: 'confirm',
      message: 'Confirm?',
      initial: false,
      active: 'yes',
      inactive: 'no',
    },
  ]);

  if (!response.confirm) {
    return;
  }
  delete response.confirm;

  const date = moment(response.date).format('YYYY-MM-DD');
  const files = await glob(`contents/${date}-0[1-9].md`);
  const index =
    (files.length ? Number(files[files.length - 1].slice(-4, -3)) : 0) + 1;

  response.draft = true;
  if (response.slug) {
    response.link = await link(response.slug);
  }

  const filePath = `contents/${date}-0${index}.md`;
  fs.writeFileSync(filePath, matter.stringify('', response));

  childProcess.execSync(`code ${filePath}`);
})();
