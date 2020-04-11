module.exports = {
  appId: 'org.developer-vault.developer-vault-app',
  productName: 'Developer Vault',

  extraMetadata: {
    // Overwrite main property in package.json
    // Relative to "directories.app".
    main: './main/app.min.js',
  },

  directories: {
    output: '.releases',
    app: '.dist',
  },

  // FIXME: This makes the packaging crash.
  // publish: 'onTagOrDraft',
};
