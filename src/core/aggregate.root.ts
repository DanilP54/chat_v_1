import { Entity } from "./entity";
import { UniqueEntityId } from "./unique.entity.id";

export abstract class AggregateRoot<T> extends Entity<T> {

    protected constructor(prop: T, id: UniqueEntityId) {
        super(prop, id)
    }
}

