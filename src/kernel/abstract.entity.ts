export abstract class Entity<T extends object> {
    protected readonly entity: T
    protected readonly id: string
    constructor(entity: T, id: string) {
        this.entity = entity
        this.id = id
    }

    public getId() {
        return this.id
    }

    public getEntity() {
        return this.entity
    }
}