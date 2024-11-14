import { UniqueEntityID } from "./UniqueEntityID";

function isEntity(value: unknown): value is Entity<unknown> {
  return value instanceof Entity;
}

export abstract class Entity<T> {
  protected readonly _data: T;
  protected readonly _id: UniqueEntityID;

  protected constructor(data: T, id?: UniqueEntityID) {
    this._data = data;
    this._id = id ? id : new UniqueEntityID();
  }

  get id() {
    return this._id;
  }

  get data() {
    return this._data;
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

    return this._id.equals(object._id);
  }
}
