import { ITslintPreprocessorConfig } from 'karma-tslint';

export = function (config) {
    config.set({

        files: [
            'test/**/*.spec.ts'
        ],

        preprocessors: {
            'test/**/*.spec.ts': ['tslint']
        },

        tslintPreprocessor: {
            project: './tsconfig.json'
        } as ITslintPreprocessorConfig,

        logLevel: config.LOG_DEBUG,
    });
};
