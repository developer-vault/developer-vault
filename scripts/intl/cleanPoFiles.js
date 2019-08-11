const fse = require('fs-extra');
const glob = require('glob');
const shell = require('shelljs');

const headerRegex = (headerName) => new RegExp(`"${headerName}: .+(\\\r\\\n|\\\r|\\\n)`, 'g');

const PATTERN = 'src/renderer/locales/**/messages.po';

/**
 * Open the po file and remove all obsolete messages.
 *
 * @async
 * @param {string} poFile - Path to po file.
 */
const clearObsoleteMessages = (poFile) => new Promise((resolve, reject) => {
  shell.exec(
    `msgattrib --no-obsolete -o ${poFile} ${poFile}`,
    { silent: true },
    (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(stdout);
    },
  );
});

/**
 * Open the po file and remove the POT-Creation-Date header.
 *
 * @async
 * @param {string} poFile - Path to po file.
 */
const removeCreationDateHeader = async (poFile) => {
  const fileContent = await fse.readFile(poFile, { encoding: 'utf8' });

  const cleanedFileContent = fileContent
    .replace(headerRegex('POT-Creation-Date'), '');

  return fse.writeFile(poFile, cleanedFileContent, { encoding: 'utf8' });
};

/**
 * Run filters on po file.
 *
 * @async
 * @param {string} poFile - Path to po file.
 */
const cleanPoFile = async (poFile) => {
  await removeCreationDateHeader(poFile);
  await clearObsoleteMessages(poFile);
};

/**
 * Run filters on each po file.
 *
 * @async
 * @param {string} pattern - Glob pattern of files to filter.
 */
const cleanPoFiles = (pattern = PATTERN) => {
  if (!shell.which('msgattrib')) {
    shell.echo('Sorry, this script requires msgattrib. Skipping...');
    shell.exit(0);
  }

  // get all absolute file paths matching the PATTERN
  const patternWithRootDir = `${process.cwd()}/${pattern.replace(/('|")/g, '')}`;
  const srcPaths = glob.sync(patternWithRootDir, { absolute: true });
  return Promise.all(srcPaths.map(cleanPoFile));
};

module.exports = cleanPoFiles;
