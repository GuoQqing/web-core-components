module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript', // 解决无法引入ts文件的问题
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }], // 关闭检测使用未声明变量 日常在 useEffect 里都是先使用，再声明
    '@typescript-eslint/no-explicit-any': ['off'], // 关闭any类型的警告
    'react/jsx-filename-extension': 'off', // 关闭airbnb对于jsx必须写在jsx文件中的设置
    'react/prop-types': 'off', // 关闭airbnb对于必须添加prop-types的校验
    'react/require-default-props': 'off', // 关闭airbnb对于非必须props添加defaultProps的校验
    'react/jsx-one-expression-per-line': 'off', // 关闭要求一个表达式必须换行的要求，和Prettier冲突了
    'react/jsx-no-bind': 'off', // 关闭禁止 bind
    'react/jsx-props-no-spreading': 'off', // 关闭禁止行内解包
    'react/no-array-index-key': 'off', // 关闭禁止index为key
    'no-unused-expressions': 'off', // 关闭禁止 isXXX && func() 的校验
    'no-console': 'off', // 关闭禁止 console 的校验
    'no-shadow': 0, // 关闭禁止 变量重明
    'react/jsx-wrap-multilines': [
      'error',
      {
        prop: 'ignore', // 关闭要求jsx属性中写jsx必须要加括号，和Prettier冲突了
      },
    ],
    'import/extensions': 'off', // 可以省略文件拓展名
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/'], // @ 是设置的路径别名
      },
    ],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
  },
};
