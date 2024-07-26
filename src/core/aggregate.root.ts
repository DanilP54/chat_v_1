import { Entity } from "./entity";
import { UniqueEntityId } from "./unique.entityI.id";

export abstract class AggregateRoot<T> extends Entity<T> {

    protected constructor(prop: T, id: UniqueEntityId) {
        super(prop, id)
    }
}

