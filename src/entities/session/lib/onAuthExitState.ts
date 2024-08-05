import {userService} from "@/entities/user/interfaces/user.services"
import {User} from "@/entities/user/user.model"
import {ActionAuthSuccess, ActionCreateProfileData, ActionNotAuth, AuthorizationSteps} from "@/shared/types"
import {User as UserDto} from "firebase/auth"
import {Dispatch} from "react"

type AuthorizationActions =
    ActionNotAuth |
    ActionCreateProfileData |
    ActionAuthSuccess<User>

export const onExitAuthState = async (currentUser: UserDto | null, dispatch: Dispatch<AuthorizationActions>) => {

    if (!currentUser) {
        dispatch({type: AuthorizationSteps.NOT_AUTH} as ActionNotAuth)
        return AuthorizationSteps.NOT_AUTH
    }

    const session = await userService.getCurrentUser(currentUser.uid)

    if (!session) {
        dispatch({
            type: AuthorizationSteps.AUTH_CREATE_PROFILE_DATA,
            payload: currentUser.uid,
        } as ActionCreateProfileData)
        return AuthorizationSteps.AUTH_CREATE_PROFILE_DATA
    }

    dispatch({
        type: AuthorizationSteps.AUTH_SUCCESS,
        payload: session
    } as ActionAuthSuccess<User>)
    return AuthorizationSteps.AUTH_SUCCESS

}
