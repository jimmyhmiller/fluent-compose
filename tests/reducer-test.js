
import { fluentCompose } from 'src/index';
import expect from 'expect';

const increment = () => ({
  type: 'INCREMENT'
})

const decrement = () => ({
  type: 'DECREMENT'
})


const baseReducer = (state, action) => state;

const initialState = prev => init => (state, action) => prev(state || init, action);

const reduce = prev => (type, f) => (state, action) => {
  if (action && action.type === type) {
    return f(state, action)
  }
  return prev(state, action)
}

const run = prev => (state, action) => {
  if (action === undefined) {
    action = state;
    state = prev();
  }
  return prev(state, action)
}

const reducer = fluentCompose({ initialState, reduce, run }, baseReducer)

describe('Reducer test', () => {
  it('Properly increment', () => {
    const result = reducer
      .initialState(0)
      .reduce('INCREMENT', x => x + 1)
      .reduce('DECREMENT', x => x - 1)
      (0, increment())
    expect(result).toEqual(1)
  })
})




