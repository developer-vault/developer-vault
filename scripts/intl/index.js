#!/usr/bin/env node
const { argv } = require('yargs');

const extractMessages = require('./extractMessages');
const updatePoFiles = require('./updatePoFiles');
const cleanPoFiles = require('./cleanPoFiles');

const cli = async () => {
  switch (argv.a) {
    case 'update:pofiles':
      return updatePoFiles(argv.p, { templateFile: argv.t });
    case 'clean:pofiles':
      return cleanPoFiles(argv.p);
    default:
    case 'extract:messages':
      return extractMessages(argv.p, { outputFile: argv.o, defaultLocale: argv.l });
  }
};

cli()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);

    // Exit on error to prevent commiting an invalid state.
    process.exit(1);
  });
