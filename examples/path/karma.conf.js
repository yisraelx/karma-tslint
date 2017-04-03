
module.exports = function (config) {
    config.set({

        files: [
            'test/**/*.spec.ts'
        ],

        preprocessors: {
            'test/**/*.spec.ts': ['tslint']
        },

        tslintPreprocessor: {
            formatter: 'pmd',
            configuration: './config/tslint-config.json'
        },

        logLevel: config.LOG_DEBUG,
    })
};
