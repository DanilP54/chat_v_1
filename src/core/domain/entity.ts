import { UniqueEntityId } from "@/core/domain/unique.entityI.id"

function isEntity(value: unknown): value is Entity<unknown> {
    return value instanceof Entity
}

export abstract class Entity<T> {
    protected readonly _data: T
    protected readonly _id: UniqueEntityId

    protected constructor(data: T, id?: UniqueEntityId) {
        this._data = data
        this._id = id ? id : new UniqueEntityId()
    }

    get id() {
        return this._id
    }

    get data() {
        return this._data
    }

    public equals(object?: Entity<T>): boolean {

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id)
    }
}
