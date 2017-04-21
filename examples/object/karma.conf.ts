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
            formatter: 'vso',
            configuration: {
                rules: {
                    'no-var-keyword': true,
                    'no-any': true
                }
            }
        } as ITslintPreprocessorConfig,

        logLevel: config.LOG_DEBUG,
    });
};
