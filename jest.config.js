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

  coverageDirectory: '<rootDir>/.reports/jest',

  projects: [
    // Main process tests.
    {
      displayName: 'main',

      // Collect coverage from all sources in main folder.
      collectCoverageFrom: [
        '<rootDir>/src/main/**/*.js',
      ],

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

      collectCoverageFrom: [
        // Collect coverage from all sources in renderer folder.
        '<rootDir>/src/renderer/**/*.{js,jsx}',
      ],

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
        // PO files return object.
        '^.+\\.(po)$': '<rootDir>/.jest/__mocks__/poFileMock.js',
        // Assets files return strings.
        '^.+\\.(jpg|jpeg|bmp|png|gif|eot|otf|ttf|woff|woff2|ico|pdf)$': '<rootDir>/.jest/__mocks__/assetFileMock.js',
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

      // Collect coverage from all sources in shared folder.
      collectCoverageFrom: [
        '<rootDir>/src/shared/**/*.{js,jsx}',
      ],

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
