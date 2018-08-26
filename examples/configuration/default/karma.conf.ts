import {ITslintPreprocessorConfig} from 'karma-tslint';

export = function (config) {
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
        } as ITslintPreprocessorConfig,

        logLevel: config.LOG_DEBUG,
    });
};
