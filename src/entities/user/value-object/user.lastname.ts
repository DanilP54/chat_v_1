import { ValueObject } from "@/kernel/core/domain/value.object";
import { Result } from "@/kernel/core/logic/Result";

export class UserLastName extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(value: string): Result<UserLastName> {

        if (value === null || value === undefined) {
            return Result.fail<UserLastName>('Last name is undefined')
        }

        if (value.length < 2) {
            return Result.fail<UserLastName>('Last name must be at least 2 characters long')
        }

        const changedCaseValue = value.charAt(0).toUpperCase() + value.slice(1)

        return Result.ok<UserLastName>(new UserLastName(changedCaseValue))

    }
}