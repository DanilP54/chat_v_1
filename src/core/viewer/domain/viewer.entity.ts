import {Entity} from "@/core/entity";
import {UniqueEntityId} from "@/core/unique.entity.id";
import {Guard} from "@/core/logic/Guard";
import {Result} from "@/core/logic/Result";
import {ViewerProps} from "@/core/types";

export class Viewer extends Entity<ViewerProps> {

    private constructor(data: ViewerProps, id: UniqueEntityId) {
        super(data, id)
    }

    static create(data: ViewerProps, id: UniqueId): Result<Viewer> {

        const dataResult = Guard.againstNullOrUndefinedBulk([
            {argument: data.firstName, argumentName: 'first name'},
            {argument: data.lastName, argumentName: 'last name'},
            {argument: data.chatCollection, argumentName: 'chat collection'},
            {argument: data.blockedUsers, argumentName: 'blocked users'}
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
}