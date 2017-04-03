
module.exports = function (config) {
    config.set({

        files: [
            'test/**/*.spec.ts'
        ],

        preprocessors: {
            'test/**/*.spec.ts': ['tslint']
        },

        tslintPreprocessor: {
            formatter: 'verbose',
            configuration: 'default'
        },

        logLevel: config.LOG_DEBUG,
    })
};
