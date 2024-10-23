import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {

    protected constructor(prop: T, id: string) {
        super(prop, id)
    }
}
