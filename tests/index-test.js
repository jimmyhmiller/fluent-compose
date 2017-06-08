import expect from 'expect'

import { fluentCompose, threadFirst, threadLast } from 'src/index'

const concat = (getColl) => x => init => getColl(init).concat(x)

const concater = fluentCompose({
  concat
})

const mapFirst = (coll, f) => coll.map(f);
const mapLast = (f, coll) => coll.map(f);

// Simulate libraries with different threading properties
const firstLibrary = { mapFirst }
const lastLibrary = { mapLast }

const mapper = fluentCompose({
  ...threadFirst(firstLibrary),
  ...threadLast(lastLibrary),
})

describe('Basic functionality test', () => {
  it('Concat in order', () => {
    const result = concater
      .concat(3)
      .concat(4)
      .concat(5)([])
    expect(result).toEqual([3, 4, 5])
  })
  it('Threads properly', () => {
    const result = mapper
      .mapLast(x => x + 2)
      .mapFirst(x => x - 2)([1, 2, 3])
    expect(result).toEqual([1, 2, 3])
  })
})


