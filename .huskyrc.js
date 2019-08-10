const tasks = cmds => cmds.join(' && ');

module.exports = {
  hooks: {
    // Lint commit messages with commitlint.
    // See .commitlintrc.js for the configuration.
    // NB: we shouldn't use prepare-commit-msg as a pre-commit hook,
    // but it is the only way to lint commit messages.
    'prepare-commit-msg': 'commitlint --color -e',

    // Lint staged files before commiting.
    'pre-commit': tasks([
       // Lint staged files.
      'lint-staged',
      // Update PO files.
      'yarn i18n:update',
      // Add updated PO files.
      'git add src/renderer/locales/**/messages.po',
    ]),
  },
};
