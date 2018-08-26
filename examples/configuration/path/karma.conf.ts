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
            formatter: 'pmd',
            configuration: './config/tslint-config.json'
        } as ITslintPreprocessorConfig,

        logLevel: config.LOG_DEBUG,
    });
};
