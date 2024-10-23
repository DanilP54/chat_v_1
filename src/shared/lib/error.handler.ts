export type Safe<T> =
    {
        success: true
        data: T
    } |
    {
        success: false
        error: string
    }


export type ErrorType = string

export function safe<T>(promise: Promise<T>, err?: string): Promise<Safe<T>>
export function safe<T>(func: () => T, err?: string): Safe<T>

export function safe<T>(
    promiseOrFunc: Promise<T> | (() => T),
    err?: ErrorType
): Promise<Safe<T>> | Safe<T> {

    if (promiseOrFunc instanceof Promise) {
        return safeAsync(promiseOrFunc, err)
    }

    return safeSync(promiseOrFunc, err)
}


async function safeAsync<T>(
    promise: Promise<T>,
    err?: string
): Promise<Safe<T>> {
    try {

        const data = await promise

        return {success: true, data}

    } catch (e) {

        console.error(e)

        if (err !== undefined) {
            return {success: false, error: err}
        }

        if (e instanceof Error) {
            return {success: false, error: e.message}
        }

        return {success: false, error: 'Something went wrong'}
    }
}

async function safeSync<T>(
    func: () => T,
    err?: string
): Promise<Safe<T>> {
    try {
        const data = func()

        return {data, success: true}

    } catch (e) {

        console.error(e)

        if (err !== undefined) {
            return {success: false, error: err}
        }

        if (e instanceof Error) {
            return {success: false, error: e.message}
        }

        return {success: false, error: 'Something went wrong'}

    }
}


export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean
    public error: T | string;
    private _value: T;

    public constructor(isSuccess: boolean, error?: T | string, value?: T) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }
        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message");
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T {
        if (!this.isSuccess) {
            console.log(this.error,);
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
        }

        return this._value;
    }

    public errorValue(): T {
        return this.error as T;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, null, value);
    }

    public static fail<U>(error: any): Result<U> {
        return new Result<U>(false, error);
    }

    public static combine(results: Result<any>[]): Result<any> {
        for (let result of results) {
            if (result.isFailure) return result;
        }
        return Result.ok();
    }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
    readonly value: L;

    constructor(value: L) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return true;
    }

    isRight(): this is Right<L, A> {
        return false;
    }
}

export class Right<L, A> {
    readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return false;
    }

    isRight(): this is Right<L, A> {
        return true;
    }
}

export const left = <L, A>(l: L): Either<L, A> => {
    return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
    return new Right<L, A>(a);
};




