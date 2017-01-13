import { TslintPreprocessorFactory } from './tslint.preprocessor';

module.exports = {
    'preprocessor:tslint': ['factory', TslintPreprocessorFactory]
};

export { TFormatter, ITslintPreprocessorConfig } from './tslint.preprocessor';