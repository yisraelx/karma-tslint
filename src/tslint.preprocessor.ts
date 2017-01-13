import { Linter, LintResult, Configuration } from 'tslint';
import { Logger, Level } from 'log4js';

export type TFormatter = 'prose' | 'json' | 'stylish' | 'verbose' | 'pmd' | 'msbuild' | 'checkstyle' | 'vso' | 'fileslist' | Function;

export interface ITslintPreprocessorConfig {
    /**
     * tslint.Configuration.IConfigurationFile - object type tslint config file.
     * string - path of tslint.json file
     * 'default' - default tslint config
     * undefined (default) - search tslint.json file in the source file path.
     */
    configuration?: Configuration.IConfigurationFile | string | 'default';
    /**
     * TFormatter - 'prose' | 'json' | 'stylish' | 'verbose' | 'pmd' | 'msbuild' | 'checkstyle' | 'vso' | 'fileslist' | Function
     * undefined (default) - 'stylish'
     */
    formatter?: TFormatter;
    /**
     * boolean - if karma should stop on tslint failure
     * undefined (default) - true
     */
    stopOnFailure?: boolean;
}

export function TslintPreprocessorFactory(loggerFactory: {create: (name: string, level?: string | Level) => Logger}, config: ITslintPreprocessorConfig = {} as any) {
    let logger: Logger = loggerFactory.create('preprocessor.tslint');
    return new TslintPreprocessor(logger, config).preprocessor;
}

(TslintPreprocessorFactory as any).$inject = ['logger', 'config.tslintPreprocessor'];

export class TslintPreprocessor extends Linter {

    public get preprocessor() {
        return this._preprocessor.bind(this);
    }

    constructor(private _logger: Logger, private _config: ITslintPreprocessorConfig) {
        super({fix: false, formatter: _config.formatter || 'stylish'});
    }

    private _preprocessor(source: string, file: any, done: (err: any, source?: string) => void) {
        this._logger.debug(`Processing "${file.originalPath}".`);

        let {stopOnFailure = true} = this._config;
        let configuration = this.getConfiguration(file.originalPath);

        this.lint(file.originalPath, source, configuration);

        let result: LintResult = this.getResultAndClean();
        let error = null;

        if (result.failureCount) {
            this._logger.error(result.output);
            if (stopOnFailure) error = result.output;
        }

        done(error, source);
    }

    private getConfiguration(filePath: string) {
        let {configuration} = this._config;

        if (configuration === void 0) {
            configuration = Linter.findConfigurationPath(null, filePath);
        }

        this._logger.debug(`Using configuration: ${configuration}`);

        if (configuration === 'default') configuration = null;

        if (typeof configuration === 'string' || configuration === null) {
            configuration = Configuration.loadConfigurationFromPath(configuration as any);
        }

        return configuration;
    }

    private getResultAndClean() {
        let result = this.getResult();
        this['failures'] = [];
        return result;
    }
}