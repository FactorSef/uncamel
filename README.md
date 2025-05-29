# uncamel

Convert object keys to camel case using [camelcase](https://github.com/sindresorhus/camelcase) and decamelize by cache

## Instalation

```bash
npm install uncamel
```

## Usage

```JavaScript
import { camelize, decamelize } from 'uncamel'

const refObj = {
	FooBar: 'baz'
};

const camelizeObj = camelize(refObj);
// => { fooBar: 'baz' }

const decamelizeObj = decamelize(camelizeObj);
// => { FooBar: 'baz' }
```

## Options

> Syntax:
> ```JavaScript
> camelize(obj, options);
> ```


| Option name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| deep | `boolean` | `false` | Use recursive walker |
| pascalCase | `boolean` | `false` | Transform to PascalCase: `foo-bar → FooBar` |
| preserveConsecutiveUppercase | `boolean` | `false` | Preserve consecutive uppercase characters: `foo-BAR → FooBAR` |
