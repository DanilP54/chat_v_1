import { ViewerInfoForm } from "@/features/registration"
import { Loader } from "@/shared/ui/loader"
import { Outlet } from "react-router-dom"

enum AuthorizationSteps {
    AUTH_IN_PROGRESS = 'AUTHORIZATION_IN_PROGRESS',
    NOT_AUTH = 'NOT_AUTHORIZED',
    AUTH_WITHOUT_ACCOUNT_DATA = 'AUTH_WITHOUT_ACCOUNT_DATA',
    AUTH_SUCCESS = 'AUTHORIZATION_SUCCESS'
}

type StateWithoutAccountData = {
    step: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA,
    data: { userId: UniqueId }
}

{/* <Loader />
<ViewerInfoForm {...state} /> */}

export const createAuthInProgress = (a) => a

export const createNotAuth = (a) => a

export const createAuthWithoutAccountData = (state: StateWithoutAccountData, a) => a

export const createAuthSuccess = (a) => a
