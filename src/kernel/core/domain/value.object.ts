export abstract class ValueObject<T> {
  protected readonly _value: T;

  protected constructor(value: T) {
    this._value = Object.freeze(value);
  }

  get value() {
    return this._value;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo._value === undefined) {
      return false;
    }

    // проверка на равенство полей !!!!!!

    return true;
  }
}
