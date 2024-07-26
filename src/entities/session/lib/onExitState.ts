import { userService } from "@/entities/user/interfaces/user.services"
import { User } from "@/entities/user/user.model"
import { ActionAuthSuccess, ActionCreateProfileData, ActionNotAuth, AuthorizationSteps, CurrentUser } from "@/shared/types"
import { User as PersistUserDTO } from "firebase/auth"
import { Dispatch } from "react"

type AuthorizationActions =
    ActionNotAuth |
    ActionCreateProfileData |
    ActionAuthSuccess<User>

export const onExitState = async (user: PersistUserDTO, dispatch: Dispatch<AuthorizationActions>) => {

    if (!user) {
        dispatch({ type: AuthorizationSteps.NOT_AUTH } as ActionNotAuth)
        return AuthorizationSteps.NOT_AUTH
    }

    
    const profileData = await userService.getCurrentUser(user.uid)
   
    
    if (!profileData) {
        dispatch({
            type: AuthorizationSteps.AUTH_CREATE_PROFILE_DATA,
            payload: user.uid,
        } as ActionCreateProfileData)
        return AuthorizationSteps.AUTH_CREATE_PROFILE_DATA
    }

    dispatch({
        type: AuthorizationSteps.AUTH_SUCCESS,
        payload: profileData
    } as ActionAuthSuccess<User>)
    return AuthorizationSteps.AUTH_SUCCESS
}
