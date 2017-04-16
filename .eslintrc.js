module.exports = {
    extends: 'airbnb',
    env: {
        "browser": true,
        "node": true,
    },
    plugins: [
        'react',
        'jsx-a11y',
        'import',
    ],
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
      'no-console': 0,
      'no-else-return': 0,
      'indent': 0,
      "react/jsx-filename-extension": 0,
      'react/jsx-indent': 0,
      'no-trailing-spaces': 0,
      'object-curly-spacing': 0,
      'space-before-blocks': 0,
    },
};