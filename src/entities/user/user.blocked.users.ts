import {ValueObject} from "@/kernel/domain/value.object.ts";

export class BlockedUsers extends ValueObject<string[]>
{
    private constructor(blockedUsers: string[]) {
        super(blockedUsers);
    }

    static create(blockedUsers: string[]) {
        return new BlockedUsers(blockedUsers)
    }
}
