module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
  }
}
