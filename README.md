# Karma tslint plugin
[![Travis build](https://travis-ci.org/yisraelx/karma-tslint.svg?branch=master)](https://travis-ci.org/yisraelx/karma-tslint)
[![Version](https://img.shields.io/npm/v/karma-tslint.svg)](https://www.npmjs.com/package/karma-tslint)
[![MIT License](https://img.shields.io/npm/l/karma-tslint.svg)](https://github.com/yisraelx/karma-tslint/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

**Adapter for the [Tslint](https://palantir.github.io/tslint), linter for the [TypeScript](https://www.typescriptlang.org) language.**

> _Warning: [Tslint](https://palantir.github.io/tslint) soon will be deprecated ([Roadmap: TSLint &rarr; ESLint](https://github.com/palantir/tslint/issues/4534)), 
[karma-tslint](https://github.com/yisraelx/karma-tslint) will continue to be updated accordingly._

## Install
```bash
$ yarn add karma-tslint tslint --dev
```
Or
```bash
$ npm install karma-tslint tslint --save-dev
```

## Use

```typescript
// karma.conf.ts
import { ITslintPreprocessorConfig } from 'karma-tslint';

export = (config: any) => {
    config.set({
        
        files: [
            '**/*.ts'
        ],
        
        preprocessors: {
            '**/*.ts': ['tslint']
        },
        
        tslintPreprocessor: {
            configuration: 'default',
            formatter: 'prose',
            formattersDirectory: 'formatters-dir',
            rulesDirectory: 'rules-dir',
            stopOnFailure: true,
            fix: true
        } as ITslintPreprocessorConfig
        
    });
};
```
### ITslintPreprocessorConfig
__configuration:__
* tslint.Configuration.IConfigurationFile - object type tslint config file.
* string - path of 'tslint.json' file or tslint preset 'tslint:{all,latest,recommended}'.
* 'default' - default tslint config. // @deprecated(use 'tslint:recommended' instead)
* undefined (default) - auto search for 'tslint.json' file.

__formatter:__
* TFormatter - 'checkstyle' | 'codeFrame' | 'filesList' | 'json' | 'junit' | 'msbuild' | 'pmd' | 'prose' | 'stylish' | 'tap' | 'verbose' | 'vso' | string | FormatterConstructor;
* undefined (default) - 'stylish'

__formattersDirectory__
* string - formatters directory
* undefined (default) - 'node_modules/tslint/build/formatters'

__rulesDirectory__
* string | string[] - rules directory
* undefined (default) - 'node_modules/tslint/lib/rules'

__stopOnFailure:__
* boolean - if karma should stop on tslint failure
* undefined (default) - true

__fix__
* boolean - if tslint should be fix errors
* undefined (default) - false

__project__ - for rules that need `typescript` program
* string - path to 'tsconfig.json' file or to the directory containing the 'tsconfig.json' file
* undefined (default) - run without `typescript` program

### Karma plugins option
In most cases, you do not have to explicitly declare `plugins` option in the karma config, Because by default, Karma loads all sibling NPM modules which have a name starting with karma-* ([karma docs](https://karma-runner.github.io/2.0/config/plugins.html)).
But if necessary, add `'karma-tslint'` to the plugins list. 
```typescript
// karma.conf.ts
export = (config: any) => {
    config.set({
        // ...
        plugins: [
            'karma-tslint',
            // ...
        ]
    });
};
```

## Examples
You can see usage examples in the "[examples](https://github.com/yisraelx/karma-tslint/blob/master/examples)" folder in the source code.

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/karma-tslint/blob/master/LICENSE).
