module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:mocha/recommended", "airbnb-base"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  "import/extensions": ["never"],
  plugins: ["mocha"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
