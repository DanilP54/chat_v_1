import { ValueObject } from "@/kernel/core/domain/value.object";
import { Result } from "@/kernel/core/logic/Result";
import { IChat } from "@/kernel/core/types";

type ChatCollection = IChat[];

export class UserChatCollection extends ValueObject<ChatCollection> {

    private constructor(collection: ChatCollection) {
        super(collection)
    }

    static create(collection: ChatCollection): Result<UserChatCollection> {
        if (collection === null || collection === undefined) {
            return Result.fail<UserChatCollection>('Массив с чатами отсутствует')
        }

        const MAX_LENGTH_COLLECTION = 20

        if (collection.length > MAX_LENGTH_COLLECTION) {
            return Result.fail<UserChatCollection>(`Коллекция не должны превышать ${MAX_LENGTH_COLLECTION} элементов`)
        }

        return Result.ok(new UserChatCollection(collection))

    }
}