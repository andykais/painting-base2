module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "strict": [2, "global"],
    "no-multi-spaces": 0,
    "no-use-before-define": 0,
    "no-console": 0,
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      },
    ],
    "linebreak-style": [
      2,
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  },
  "extends": "eslint:recommended"
};
