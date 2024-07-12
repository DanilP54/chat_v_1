export abstract class Entity<T extends object> {
    protected readonly _data: T
    protected readonly _id: string

    constructor(data: T, id: string) {
        this._data = data
        this._id = id
    }

    public getId() {
        return this._id
    }

    public getData() {
        return this._data
    }
}
