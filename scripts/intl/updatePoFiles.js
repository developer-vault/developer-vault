const path = require('path');
const shell = require('shelljs');
const glob = require('glob');

const TEMPLATE_FILE = path.join(__dirname, '..', '..', '.tmp/i18n/messages.pot');

const updatePoFile = (poFile, templateFile) => new Promise((resolve, reject) => {
  shell.exec(
    `msgmerge -U --no-fuzzy-matching --backup=none ${poFile} ${templateFile}`,
    { silent: true },
    (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(stdout);
    },
  );
});

const updatePoFiles = (pattern, { templateFile = TEMPLATE_FILE } = {}) => {
  if (!shell.which('msgmerge')) {
    shell.echo('Sorry, this script requires msgmerge. Skipping...');
    shell.exit(0);
  }

  // get all absolute file paths matching the PATTERN
  const patternWithRootDir = `${process.cwd()}/${pattern.replace(/('|")/g, '')}`;
  const srcPaths = glob.sync(patternWithRootDir, { absolute: true });
  return Promise.all(srcPaths.map(
    (poFile) => updatePoFile(poFile, templateFile),
  ));
};

module.exports = updatePoFiles;
