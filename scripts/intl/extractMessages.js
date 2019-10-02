const path = require('path');

const fs = require('fs-extra');
const extractReactIntl = require('extract-react-intl');

// Default args values.
const PATTERN = 'src/renderer/**/*.messages.{js,jsx}';
const OUTPUT_FILE = '.tmp/i18n/messages.json';
const DEFAULT_LOCALE = 'en';

const extract = async (pattern, defaultLocale) => {
  const result = await extractReactIntl(
    [defaultLocale],
    pattern,
    {
      defaultLocale,
    },
  );

  return Object.keys(result[defaultLocale]).map(
    id => ({
      id,
      defaultMessage: result[defaultLocale][id],
    }),
  );
};

/**
 * Write to file.
 * Ensure directory exists.
 *
 * @async
 * @param {string} file - Output file.
 * @param {string} output - Output file content.
 */
const writeToFile = async (file, output) => {
  await fs.mkdirp(path.dirname(file));
  await fs.writeFile(file, output);
};

/**
 * Combines extract and writeToFile to extract the messages to OUTPUT_FILE.
 *
 * @async
 * @param {string} pattern - Glob pattern.
 * @param {object} opts - Options.
 * @param {string} opts.outputFile - Output file.
 */
const extractMessagesToFile = async (
  pattern = PATTERN,
  {
    outputFile = OUTPUT_FILE,
    defaultLocale = DEFAULT_LOCALE,
  },
) => {
  const patternWithRootDir = `${process.cwd()}/${pattern.replace(/('|")/g, '')}`;
  const messages = JSON.stringify(await extract(patternWithRootDir, defaultLocale));
  return writeToFile(outputFile, messages);
};

module.exports = extractMessagesToFile;
