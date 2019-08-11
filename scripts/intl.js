#!/usr/bin/env node

const { argv } = require('yargs');

const extractMessages = require('./intl/extractMessages');
const updatePoFiles = require('./intl/updatePoFiles');
const cleanPoFiles = require('./intl/cleanPoFiles');

const cli = async () => {
  switch (argv.a) {
    case 'update:pofiles':
      return updatePoFiles(argv.p, { templateFile: argv.t });
    case 'clean:pofiles':
      return cleanPoFiles(argv.p);
    default:
    case 'extract:messages':
      return extractMessages(argv.p, { outputFile: argv.o });
  }
};

// eslint-disable-next-line no-console
cli().catch(error => console.error(error));
