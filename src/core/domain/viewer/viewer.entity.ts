import { Entity } from "@/core/domain/entity";
import { UniqueEntityId } from "@/core/domain/unique.entityI.id";
import { Guard } from "@/core/domain/logic/Guard";
import { Result } from "@/core/domain/logic/Result";
import { ViewerProps } from "../types";

export class Viewer extends Entity<ViewerProps> {

    private constructor(data: ViewerProps, id: UniqueEntityId) {
        super(data, id)
    }

    static create(data: ViewerProps, id: UniqueId): Result<Viewer> {

        const dataResult = Guard.againstNullOrUndefinedBulk([
            { argument: data.firstName, argumentName: 'first name' },
            { argument: data.lastName, argumentName: 'last name' },
            { argument: data.chatCollection, argumentName: 'chat collection' },
            { argument: data.blockedUsers, argumentName: 'blocked users' }
        ])

        if (!dataResult.succeeded) {
            return Result.fail<Viewer>(dataResult.message)
        }

        const viewer = new Viewer({
            ...data,
            createdAt: data.createdAt ? data.createdAt : new Date(),
            isActive: true
        }, new UniqueEntityId(id))

        return Result.ok<Viewer>(viewer)
    }

    get isActive(): boolean | undefined {
        return this._data.isActive
    }
}