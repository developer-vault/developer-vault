module.exports = {
  verbose: true,

  // Exit on error.
  bail: true,

  transform: {
    // Transform JS with babel-jest.
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Do not test the node_modules.
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],

  setupFiles: [
    '<rootDir>/.jest/setup.js',
  ],

  projects: [
    // Main process tests.
    {
      displayName: 'main',

      // Define node globals.
      testEnvironment: 'node',

      // Absolute import paths.
      modulePaths: [
        '<rootDir>/src/main/',
      ],

      moduleNameMapper: {
        // Resolve shared imports to shared folder.
        '^shared\\/(.*)$': '<rootDir>/src/shared/$1',
      },

      testMatch: [
        // Only test files in main folder with this config.
        '<rootDir>/src/main/**/*.{spec,test}.js',
      ],
    },

    // Renderer process tests.
    {
      displayName: 'renderer',

      // https://github.com/facebook/jest/issues/6769.
      testURL: 'http://localhost/',

      // Absolute import paths.
      modulePaths: [
        '<rootDir>/src/renderer/',
      ],

      moduleNameMapper: {
        // Resolve shared imports to shared folder.
        '^shared\\/(.*)$': '<rootDir>/src/shared/$1',
        // Transform CSS modules to JS module.
        '^.+\\.(scss|css|less)$': 'identity-obj-proxy',
      },

      testMatch: [
        // Only test files in renderer folder with this config.
        '<rootDir>/src/renderer/**/*.{spec,test}.{js,jsx}',
      ],

      setupFiles: [
        '<rootDir>/src/renderer/__mocks__/window.js',
      ],
    },

    // Shared sources tests.
    {
      displayName: 'shared',

      // Absolute import paths.
      modulePaths: [
        '<rootDir>/src/shared/',
      ],

      moduleNameMapper: {
        // Resolve shared imports to shared folder.
        '^shared\\/(.*)$': '<rootDir>/src/shared/$1',
      },

      testMatch: [
        // Only test files in shared folder with this config.
        '<rootDir>/src/shared/**/*.{spec,test}.{js,jsx}',
      ],
    },
  ],
};
