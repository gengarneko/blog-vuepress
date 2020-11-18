---
title: react 中防抖函数的实现
date: 2020-11-17
categories:
  - frontEnd
tags:
  - React
  - Hooks
sidebarDepth: 6
---

停止操作达一定时间才进行函数执行，是一个高阶函数，基本人人都会，React Hooks 中需要对 effect、state 和 fn 进行额外实现。

<!-- more -->

## 防抖函数

停止操作达一定时间才进行函数执行，是一个高阶函数，基本人人都会，就不详说了，直接实现：

```ts
function debounce(fn, ms) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null;
    }, ms);
  }
}
```

*实际开发中直接使用 `lodash._debounce` 就行了，不要自己写*



## hooks 中的防抖函数

### 测试用例

```ts
export default function() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClick = useDebounce(function() {
    console.count('click1')
    setCounter1(counter1 + 1)
  }, 500)

  useEffect(function() {
    const t = setInterval(() => {
      setCounter2(x => x + 1)
    }, 500);
    return clearInterval.bind(undefined, t)
  }, [])


  return <div style={{ padding: 30 }}>
    <Button
      onClick={function() {
        handleClick()
      }}
    >click</Button>
    <div>{counter1}</div>
    <div>{counter2}</div>
  </div>
}
```

这时候你会怎么实现 useDebounce 函数呢？像这样？

```ts
function useDebounce(fn, time) {
  return debounce(fn, time);
}
```

**那你人没了！**`useCallback` 都救不了你。

因为 react hooks 每次渲染，都会重新执行一遍 hooks，`useDebounce` 被重新执行了，核心的 `timer` 自然也就无效了。

### 解决方案

用 `useRef` 缓存机制可以很轻松地解决这个问题：

```ts
function useThrottle(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
```



## ahooks 中的 useDebounce

### useDebounceFn

处理函数，使用 `lodash` 的 `debounce` 函数和自定义的 `useCreation` （`useMemo` 和 `useRef` 更好的实现，其实就是手动添加依赖项，避免函数/对象的重复声明），我们来看一下源码：

```ts
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import useCreation from '../useCreation';
import { DebounceOptions } from '../useDebounce/debounceOptions';

type Fn = (...args: any) => any;

function useDebounceFn<T extends Fn>(fn: T, options?: DebounceOptions) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  return {
    run: (debounced as unknown) as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;
```

 基于 `lodash._debounce`，不熟悉的建议配合 `lodash` 源码，或者一些[别人心得](https://juejin.im/post/6844903990639984654) 

此 hooks 将一个 react hooks 中的函数转化为防抖函数

### useDebounce

处理值，基于 `useDebounceFn`，函数每次渲染都会更新值，我们对这个更新值的动作（`setState`）进行防抖处理：

```ts
import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';
import { DebounceOptions } from './debounceOptions';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}

export default useDebounce;
```

### useDebounceEffect

处理副作用，传入副作用函数，依赖数组，延时数据：

```ts
import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import { DebounceOptions } from '../useDebounce/debounceOptions';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({});

  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
```

倒过来看，`effect` 只在 `flag` 变化的时候被 `useUpdateEffect` 返回，对依赖数组 `deps`的变更进行防抖，检测到不抖了，更新一下整个函数，执行 `effect`。

## react-use 中的 useDebounce

### 实现

看了下源码，感觉语义化没有 `ahooks` 做的好，但这样反而可以提醒用户 `UI = F(State)`，只要关注数据更新的防抖，就能满足大部分 React 的场景，这样子减轻心智负担也不错：

```ts
import { DependencyList, useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce(fn: Function, ms: number = 0, deps: DependencyList = []): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}
```

```ts
import { useCallback, useEffect, useRef } from 'react';

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

export default function useTimeoutFn(fn: Function, ms: number = 0): UseTimeoutFnReturn {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}
```

`react-use` 主要是借助一个自定义的延时函数做函数的防抖，延时函数依然使用缓存 `useRef`。

### 应用

```ts
const Demo = () => {
  const [state, setState] = React.useState('Typing stopped');
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const [, cancel] = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>
        Debounced value: {debouncedValue}
        <button onClick={cancel}>Cancel debounce</button>
      </div>
    </div>
  );
};
```

## react-hooks 中的 useDebounce

`react-hooks` 的实现思路和 `ahooks` 类似，`ahooks` 基于 `lodash._debounce`，`react-hooks` 则基于 `npm/debounce`，同样都是下载量很高的老牌函数库，可靠放心。

### useDebouncedCallback

```ts
import debounce from 'debounce'

export function useDebouncedCallback<C extends Function>(callback: C, wait: number): C {
  const debouncedCallback = useMemo(() => (wait > 0 ? debounce(callback, wait) : callback), [callback, wait])
  useEffect(() => {
    return () => {
      const callback = debouncedCallback as any
      callback.clear && callback.clear()
    }
  }, [debouncedCallback])

  return debouncedCallback
}
```

`useMemo` 和 `useRef` 作用是一样的，完全可以用 `useRef` 实现 `useMemo`，两者的实现差别不大，空依赖数组的 `useMemo` 开销也和 `useRef` 相当。

### useDebouncedEffect

```ts
import { useState, useEffect, useMemo, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export function useDebouncedEffect<T>(callback: () => void | (() => void), value: T, wait: number): void {
  const callbackRef = useRef(callback)
  const cleanUpRef = useRef(noop)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])
  useEffect(() => {
    if (wait <= 0) {
      return
    }

    cleanUpRef.current()
    cleanUpRef.current = noop

    const callback = callbackRef.current
    const trigger = () => {
      const cleanUp = callback()

      if (typeof cleanUp === 'function') {
        cleanUpRef.current = cleanUp
      } else if (cleanUp !== undefined) {
        // eslint-disable-next-line no-console
        console.warn('useDebouncedEffect callback should return undefined or a clean-up function')
      }
    }
    const tick = setTimeout(trigger, wait)
    return () => {
      clearTimeout(tick)
      cleanUpRef.current()
      cleanUpRef.current = noop
    }
  }, [value, wait])
}
```

心智负担暴涨，作者的想法很有趣，我一开始看不太懂，他从哪里获得的灵感呢 QWQ

没有依赖 `debounce` 函数，大体就是围绕 `cleanUpRef` 做数据的更新，延时，触发，清空

### useDebouncedValue

```ts
export function useDebouncedValue<T>(value: T, wait: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useDebouncedEffect(() => setDebouncedValue(value), value, wait)

  return wait > 0 ? debouncedValue : value
}
```

## 总结

最终决定选用 `react-hooks` 的 `debounce` 实现方案，使用场景足够，同时外部依赖少。

