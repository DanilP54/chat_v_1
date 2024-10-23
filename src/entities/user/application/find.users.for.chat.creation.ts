import {useUserAdapter} from "@/entities/user/sevices/user.adapter.ts";

export function useFindUserForChatCreation() {

    const user = useUserAdapter()

    const execute = async (name: string) => {
       return await user.findUserByLastName(name)
    }

    return {execute}
}