# Karma tslint plugin
[![Travis build](https://travis-ci.org/yisraelx/karma-tslint.svg?branch=master)](https://travis-ci.org/yisraelx/karma-tslint)
[![Version](https://img.shields.io/npm/v/karma-tslint.svg)](https://www.npmjs.com/package/karma-tslint)
[![MIT License](https://img.shields.io/npm/l/karma-tslint.svg)](https://github.com/yisraelx/karma-tslint/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Install
```bash
$ npm install --save-dev karma-tslint
# and install peer dependencies
$ npm install --save-dev tslint
```
## Use
### Config

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
#### ITslintPreprocessorConfig
__configuration:__
* tslint.Configuration.IConfigurationFile - object type tslint config file.
* string - path of tslint.json file
* 'default' - default tslint config
* undefined (default) - search tslint.json file in the source file path.

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

## Examples
You can see usage examples in the "[examples](https://github.com/yisraelx/karma-tslint/blob/master/examples)" folder in the source code.

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/karma-tslint/blob/master/LICENSE).
