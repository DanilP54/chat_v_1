export type ResultType<T> = {
    isSuccess: boolean;
    isFailure: boolean;
    error: T | string | null;
    getValue: () => T;
    errorValue: () => T;
};

function _createResult<T>(isSuccess: boolean, error: T | string | null, value?: T): ResultType<T> {

    if (isSuccess && error) {
        throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
        throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    const _value = value;

    return {
        isSuccess,
        isFailure: !isSuccess,
        error,
        getValue: () => {
            if (!isSuccess) {
                console.log(error);
                throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
            }
            if (_value === undefined) {
                throw new Error("Can't get the value of a successful result");
            }
            return _value;
        },
        errorValue: () => {
            return error as T;
        }
    }
}

export function ok<U>(value?: U): ResultType<U> {
    return _createResult<U>(true, null, value);
}

export function fail<U>(error: any): ResultType<U> {
    return _createResult<U>(false, error);
}