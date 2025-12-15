import type { Errno } from "./errno.js";
import { errnoOf } from "./errnoOf.js";

type PromisedType<F extends (...args: unknown[]) => Promise<unknown>> = Awaited<
  ReturnType<F>
>;

type Extends<A, B> = A extends B ? true : false;

type And<A extends boolean, B extends boolean> = A extends true
  ? B extends true
    ? true
    : false
  : false;

type If<A, B, C> = A extends true ? B : C;

type UndefinedIfVoid<T> = T extends void ? undefined : T;

export const remapErrno =
  <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    F extends (...args: any[]) => Promise<any>,
    T,
  >(
    fn: F,
    map: { [k in Errno]?: T },
  ): ((
    ...args: Parameters<F>
  ) => Promise<
    If<
      And<Extends<PromisedType<F>, void>, Extends<T, undefined>>,
      void,
      UndefinedIfVoid<PromisedType<F>> | T
    >
  >) =>
  (...args: Parameters<F>) =>
    fn(...args).catch((error) => {
      const errno = errnoOf(error);

      if (errno !== undefined) {
        if (errno in map) return map[errno];
      }

      throw error;
    });
