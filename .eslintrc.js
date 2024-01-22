module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/", "docs/"],
    },
  },
  ignorePatterns: ["**/dist/", "**/build/"],
  plugins: ["simple-import-sort", "unused-imports"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react/display-name": "off",
    "unused-imports/no-unused-imports": "warn",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*"],
      },
    ],
  },
};
