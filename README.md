# fluent-compose

[![npm package][npm-badge]][npm]

# fluent-compose

More documentation needed.

```javascript
import * as zaphod from 'zaphod/compat';
import * as lodashFpCollection from 'lodash/fp/collection';
import { threadFirst, threadLast, fluentCompose } from 'fluent-compose';

const zaphodTransform = threadFirst(zaphod);
const lodashTransform = threadLast(lodashFpCollection);

const transform = fluentCompose({
  ...zaphodTransform,
  ...lodashTransform,
})

const transformer = transform
  .map(x => x + 2)
  .filter(x => x % 2)
  .set(0, 3)

transformer([1,2,3,4]) // [3, 6]
```


[npm-badge]: https://img.shields.io/npm/v/fluent-compose.png?style=flat-square
[npm]: https://www.npmjs.org/package/fluent-compose