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

    const profileData = await userService.getCurrentUser(currentUser.uid)

    if (profileData) {
        dispatch({
            type: AuthorizationSteps.AUTH_SUCCESS,
            payload: profileData
        } as ActionAuthSuccess<User>)
        return AuthorizationSteps.AUTH_SUCCESS
    }

    dispatch({
        type: AuthorizationSteps.AUTH_CREATE_PROFILE_DATA,
        payload: user.uid,
    } as ActionCreateProfileData)
    return AuthorizationSteps.AUTH_CREATE_PROFILE_DATA


}
