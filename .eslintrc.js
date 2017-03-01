module.exports = {
  parser: 'babel-eslint',
  "env": {
      "browser": true,
      "node": true,
      "mocha": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',

  plugins: [
    'react'
  ],
  ecmaFeatures: {
    "forOf": true,
    "jsx": true,
    "es6": true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
}
