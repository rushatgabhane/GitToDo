module.exports = {
    extends: 'expensify',
    parser: 'babel-eslint',
    ignorePatterns: ['!.*', '.github/actions/**/index.js', 'build/*', 'dist/*'],
    plugins: ['detox'],
    env: {
        jest: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.js',
                    '.website.js',
                    '.desktop.js',
                    '.native.js',
                    '.ios.js',
                    '.android.js',
                    '.config.js',
                ],
            },
        },
    },
    globals: {
        __DEV__: 'readonly',
    },
};
