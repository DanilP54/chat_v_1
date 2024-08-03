import {auth} from "@/shared/config/firebase.ts";
import {signInWithPhone} from "@/domain/session/adapters/firebase.phone.auth.api.ts";
import {verifyCode} from "@/domain/session/adapters/firebase.phone.auth.api.ts";
import {AuthWithPhoneService} from "@/domain/session/application/auth.phone.service.ts";

auth.settings.appVerificationDisabledForTesting = true;

export const authWithPhoneService = new AuthWithPhoneService(signInWithPhone, verifyCode)
