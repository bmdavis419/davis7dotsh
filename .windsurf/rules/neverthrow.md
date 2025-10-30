---
trigger: model_decision
description: When handling errors, use the `neverthrow` library to handle errors.
globs: *.ts,**/*.ts
---

neverthrow — Condensed API (Core surface, minimal examples)

Top‑Level Exports

- ok, err, Ok, Err, Result, ResultAsync
- okAsync, errAsync
- fromThrowable, fromAsyncThrowable, fromPromise, fromSafePromise, safeTry

Core Concepts

- Result<T, E>: synchronous success/error container
- ResultAsync<T, E>: async version resolving to Result<T, E>
- Combinators never execute callbacks on the non-matching variant (short-circuit)
- Prefer map/andThen over try/catch; mapErr/orElse to standardize and recover errors

Result<T, E>

Constructors

```ts
ok<T, E = never>(value: T): Ok<T, E>
err<T = never, E = unknown>(error: E): Err<T, E>
```

Introspection

```ts
isOk(): boolean
isErr(): boolean
```

Transformations

```ts
map<U>(fn: (value: T) => U): Result<U, E>
mapErr<F>(fn: (error: E) => F): Result<T, F>
unwrapOr(defaultValue: T): T
match<A, B = A>(okFn: (v: T) => A, errFn: (e: E) => B): A | B
```

Control flow / chaining

```ts
andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, E | F>
asyncAndThen<U, F>(fn: (value: T) => ResultAsync<U, F>): ResultAsync<U, E | F>
asyncMap<U>(fn: (value: T) => Promise<U>): ResultAsync<U, E>
orElse<U, A>(fn: (error: E) => Result<U, A>): Result<U | T, A>
```

Side‑effect helpers

```ts
andTee(cb: (value: T) => unknown): Result<T, E>           // pass-through side effects on Ok
orTee(cb: (error: E) => unknown): Result<T, E>            // pass-through side effects on Err
andThrough<F>(cb: (value: T) => Result<unknown, F>): Result<T, E | F>
asyncAndThrough<F>(cb: (value: T) => ResultAsync<unknown, F>): ResultAsync<T, E | F>
```

Statics on Result

```ts
Result.fromThrowable<A, E>(fn: (...args: any[]) => A, mapError?: (u: unknown) => E): (...args: any[]) => Result<A, E>
Result.combine<T, E>(list: Result<T, E>[]): Result<T[], E>
Result.combine<T1, T2, E1, E2>(tuple: [Result<T1, E1>, Result<T2, E2>]): Result<[T1, T2], E1 | E2>
Result.combineWithAllErrors<T, E>(list: Result<T, E>[]): Result<T[], E[]>
```

ResultAsync<T, E>

Constructors

```ts
okAsync<T, E = never>(value: T): ResultAsync<T, E>
errAsync<T = never, E = unknown>(error: E): ResultAsync<T, E>
```

Introspection (via awaiting or .then): resolves to Result<T, E>

Transformations

```ts
map<U>(fn: (value: T) => U | Promise<U>): ResultAsync<U, E>
mapErr<F>(fn: (error: E) => F | Promise<F>): ResultAsync<T, F>
unwrapOr(defaultValue: T): Promise<T>
match<A, B = A>(okFn: (v: T) => A, errFn: (e: E) => B): Promise<A | B>
```

Control flow / chaining

```ts
andThen<U, F>(fn: (value: T) => Result<U, F> | ResultAsync<U, F>): ResultAsync<U, E | F>
orElse<U, A>(fn: (error: E) => Result<U, A> | ResultAsync<U, A>): ResultAsync<U | T, A>
```

Side‑effect helpers

```ts
andTee(cb: (value: T) => unknown): ResultAsync<T, E>
orTee(cb: (error: E) => unknown): ResultAsync<T, E>
andThrough<F>(cb: (value: T) => Result<unknown, F> | ResultAsync<unknown, F>): ResultAsync<T, E | F>
```

Statics on ResultAsync

```ts
ResultAsync.fromThrowable<A, E>(fn: (...args: any[]) => Promise<A>, mapError?: (u: unknown) => E): (...args: any[]) => ResultAsync<A, E>
ResultAsync.fromPromise<A, E>(p: PromiseLike<A>, mapError: (u: unknown) => E): ResultAsync<A, E>
ResultAsync.fromSafePromise<A, E = never>(p: PromiseLike<A>): ResultAsync<A, E>
ResultAsync.combine<T, E>(list: ResultAsync<T, E>[]): ResultAsync<T[], E>
ResultAsync.combineWithAllErrors<T, E>(list: ResultAsync<T, E>[]): ResultAsync<T[], E[]>
```

Utilities

fromThrowable / fromAsyncThrowable

- Wrap throwy sync/async functions into functions returning Result / ResultAsync
- Always provide mapError to normalize unknown to a typed E when possible

fromPromise / fromSafePromise

- fromPromise: wrap an existing promise, map rejection reason (unknown) to typed E
- fromSafePromise: same but assumes it won’t throw; no error handler; be certain

safeTry

- Write linear code over multiple Result/ResultAsync operations without manual unwrap
- Generator-based; yield\* short-circuits on Err; returns Ok on success

```ts
const result = safeTry<number, string>(function* () {
	const a = yield* mayFail1();
	const b = yield* mayFail2();
	return ok(a + b);
});
```

Common Patterns and Guidance

- Prefer map for pure value transforms; prefer andThen when the next step may fail
- Use mapErr to re-map low-level errors to domain errors early at boundaries
- Use orElse to recover by providing an alternative successful value/flow
- Use match at the boundary to unwrap to plain values or perform side effects
- Use combine to all-or-nothing aggregate lists of Results; combineWithAllErrors to collect all errors
- Use andTee/orTee for logging/metrics that shouldn’t affect the main flow
- asyncMap (on Result) is a convenience to bridge into async pipelines; subsequent steps use ResultAsync APIs
- Favor small, typed error unions; avoid throwing—prefer returning Err

Type Cheatsheet

```ts
// Ok / Err shapes
class Ok<T, E> {
	readonly value: T;
	isOk(): true;
	isErr(): false;
}
class Err<T, E> {
	readonly error: E;
	isOk(): false;
	isErr(): true;
}

type Result<T, E> = Ok<T, E> | Err<T, E>;
// ResultAsync<T, E> awaits to Result<T, E>
```

Deprecations

- safeUnwrap(): deprecated; use match/unwrapOr/safeTry instead

Minimal Usage Sketches

```ts
// Sync pipeline
const value: Result<number, DomainError> = parse(input)
	.map(normalize)
	.andThen(validate)
	.map(compute);

// Async pipeline
const resAsync = build(params).andThen(saveAsync).andThen(notifyAsync);

// Aggregation
const combined = Result.combine([step1(), step2(), step3()]);
```

Notes

- Do not mix Result and ResultAsync in the same combine call; convert first
- Dependencies are functional; results are immutable—no mutation of inner state
- Keep mapping functions pure; perform side effects via andTee/orTee or at match boundaries
