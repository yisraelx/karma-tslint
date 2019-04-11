import { Linter, LintResult, Configuration, FormatterConstructor } from 'tslint';
import { Program } from 'typescript';
import { Logger, Level } from 'log4js';
import { lstatSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

export type TFormatter =
    'checkstyle'
    | 'codeFrame'
    | 'filesList'
    | 'json'
    | 'junit'
    | 'msbuild'
    | 'pmd'
    | 'prose'
    | 'stylish'
    | 'tap'
    | 'verbose'
    | 'vso'
    | string
    | FormatterConstructor;

export interface ITslintPreprocessorConfig {
    /**
     * tslint.Configuration.IConfigurationFile - object type tslint config file.
     * string - path of tslint.json file or tslint preset 'tslint:{all,latest,recommended}'.
     * 'default' - default tslint config (tslint:recommended). // @deprecated(use 'tslint:recommended' instead)
     * undefined (default) - search 'tslint.json' file in the source file path.
     */
    configuration?: Configuration.RawConfigFile | string | 'tslint:all' | 'tslint:latest' | 'tslint:recommended' | 'default';
    /**
     * TFormatter - 'checkstyle' | 'codeFrame' | 'filesList' | 'json' | 'junit' | 'msbuild' | 'pmd' | 'prose' | 'stylish' | 'tap' | 'verbose' | 'vso' | string | FormatterConstructor;
     * undefined (default) - 'stylish'
     */
    formatter?: TFormatter;
    /**
     * string - formatters directory
     * undefined (default) - 'node_modules/tslint/build/formatters'
     */
    formattersDirectory?: string;
    /**
     * string | string[] - rules directory
     * undefined (default) - 'node_modules/tslint/lib/rules'
     */
    rulesDirectory?: string | string[];
    /**
     * boolean - if karma should stop on tslint failure
     * undefined (default) - true
     */
    stopOnFailure?: boolean;
    /**
     * boolean - if tslint should be fix errors
     * undefined (default) - false
     */
    fix?: boolean;
    /**
     * For rules that need `typescript` program
     *
     * string - path to the tsconfig.json file or to the directory containing the tsconfig.json file
     * undefined (default) - run without `typescript` program
     */
    project?: string;
}

export function TslintPreprocessorFactory(loggerFactory: { create: (name: string, level?: string | Level) => Logger }, config: ITslintPreprocessorConfig = {} as any) {
    let logger: Logger = loggerFactory.create('preprocessor.tslint');
    return new TslintPreprocessor(logger, config).preprocessor;
}

(TslintPreprocessorFactory as any).$inject = ['logger', 'config.tslintPreprocessor'];

export class TslintPreprocessor extends Linter {

    static tryCreateProgram(project?: string): Program {
        if (typeof project === 'string') {
            try {
                if (lstatSync(project).isDirectory()) {
                    project = join(project, 'tsconfig.json');
                }

                return TslintPreprocessor.createProgram(project);
            } catch (e) {

            }
        }
    }

    public get preprocessor() {
        return this._preprocessor.bind(this);
    }

    constructor(private _logger: Logger, private _config: ITslintPreprocessorConfig) {
        super({
                fix: _config.fix || false,
                formatter: _config.formatter || 'stylish',
                formattersDirectory: _config.formattersDirectory,
                rulesDirectory: _config.rulesDirectory
            },
            TslintPreprocessor.tryCreateProgram(_config.project)
        );
    }

    private _preprocessor(source: string, file: any, done: (err: any, source?: string) => void) {
        this._logger.debug(`Processing "${file.originalPath}".`);

        let {stopOnFailure = true} = this._config;
        let configuration = this.getConfiguration(file.originalPath);

        this.lint(file.originalPath, source, configuration);

        let result: LintResult = this.getResultAndClean();
        let error = null;

        if (result.failures.length) {
            this._logger.error(`\n%s`, result.output);
            if (stopOnFailure) error = result.output;
        }

        done(error, source);
    }

    private getConfiguration(filePath: string): Configuration.IConfigurationFile {
        let {configuration} = this._config as any;

        if (configuration === void 0) {
            configuration = Linter.findConfigurationPath(null, filePath);
        }

        this._logger.debug(`Using Configuration: ${typeof configuration === 'string' ? configuration : 'config object'}`);

        if (configuration === 'default') {
            this._logger.warn(`configuration 'default' is deprecated, use 'tslint:recommended' instead.`);
            configuration = 'tslint:recommended';
        }

        if (typeof configuration === 'string') {
            configuration = Configuration.loadConfigurationFromPath(configuration as string);
        } else if (typeof configuration === 'object') {
            configuration = Configuration.parseConfigFile(configuration as any);
        }

        this._logger.debug(`Configuration Object:\n${inspect(configuration, {colors: true})}\n`);

        return configuration;
    }

    private getResultAndClean() {
        let result = this.getResult();
        this['failures'] = [];
        return result;
    }

}