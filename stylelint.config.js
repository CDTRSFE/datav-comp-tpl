const customCssFunc = ['theme', 'v-bind', 'numberWithUnit', 'gradientColorToCss', 'zoomMin'];
module.exports = {
    extends: '@trscd/stylelint-config-tpconfig',
    ignoreFiles: ['./public/**/*', './smart-design-lib/**/*'],
    rules: {
        // https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep'] }],
        'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep'] }],
        // https://windicss.org/features/directives.html
        'at-rule-no-unknown': [true, { ignoreAtRules: ['apply', 'variants', 'screen', 'layer'] }],
        // https://windicss.org/features/directives.html#theme
        'function-no-unknown': [true, { ignoreFunctions: customCssFunc }],
        'declaration-no-important': null,
        'function-name-case': ['lower', { ignoreFunctions: customCssFunc }],
        // 关键值小写，除了传给这几个函数的值
        'value-keyword-case': ['lower', { ignoreFunctions: ['numberWithUnit', 'v-bind'] }],
    },
};
