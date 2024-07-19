import { ValueObject } from "@/kernel/core/domain/value.object";


export class UserAvatar extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

}
