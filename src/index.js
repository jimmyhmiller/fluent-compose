import { mapValues } from 'lodash';

export const identity = x => x

export const fluentCompose = (combinators, f=identity) => {
  if (typeof(f) !== 'function') {
    return f;
  }

  const innerFunc = (...args) => f(...args);
  const methods = mapValues(combinators, g => 
    (...args) => fluentCompose(combinators, g(innerFunc)(...args)))

  return Object.assign(innerFunc, methods);
 }

export const threadFirstSingle = f => next => (...args) => {
  return coll => f(next(coll), ...args);
}

export const threadLastSingle = f => next => (...args) => {
   return coll => f(...args, next(coll))
}

export const threadFirst = (obj) => mapValues(obj, threadFirstSingle);
export const threadLast = (obj) => mapValues(obj, threadLastSingle);