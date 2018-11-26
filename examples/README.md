# karma tslint examples

**examples:**
* configuration
  - auto - example of not set configuration and auto search 'tslint.json' file.
  - object - example of set configuration to tslint config object.
  - path - example of set configuration to string path of 'tslint.json' file.
  - preset - example of set configuration to tslint preset 'tslint:{all,latest,recommended}'.
* project - example of set project to path of 'tsconfig.json' file.

**Install dependencies in all the examples (by yarn workspaces)**
```sh
$ cd examples
$ yarn install
```

**Run test example**
```sh
$ yarn --cwd <example package path> test
$ yarn --cwd configuration/auto test
```
Or
```sh
$ yarn workspace <example package name> test
$ yarn workspace @examples/configuration-auto test
```

