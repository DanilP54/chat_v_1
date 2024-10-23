
// function isEntity(value: unknown): value is Entity<unknown> {
//     return value instanceof Entity
// }


export abstract class Entity<T> {

    protected constructor(
        private _value: T,
        private _id: string
    ) {
    }


    get value() {
        return this._value
    }

    get id() {
        return this._id
    }

    // public equals(object?: Entity<T>): boolean {
    //
    //     if (object === null || object === undefined) {
    //         return false;
    //     }
    //
    //     if (this === object) {
    //         return true;
    //     }
    //
    //     if (!isEntity(object)) {
    //         return false;
    //     }
    //
    //     return this._id.equals(object._id)
    // }
}




