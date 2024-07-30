import {FirebaseAuthRepositoryImpl} from "@/domain/session/infra/firebase.auth.repository.ts";
import {auth} from "@/shared/config/firebase.ts";
import {SignInWithPhoneUseCaseImpl} from "@/domain/session/application/use-cases/signin.with.phone.ts";
import {VerifyCodeUseCaseImpl} from "@/domain/session/application/use-cases/verify.code.ts";
import {AuthWithPhoneService} from "@/domain/session/application/auth.service.ts";

auth.settings.appVerificationDisabledForTesting = true;

// Infrastructure

export const firebaseAuthRepository = new FirebaseAuthRepositoryImpl(auth)

// Application

export const signInWithPhoneUseCase = new SignInWithPhoneUseCaseImpl(firebaseAuthRepository)
export const verifyCodeUseCase = new VerifyCodeUseCaseImpl(firebaseAuthRepository)

// Service

export const authPhoneService = new AuthWithPhoneService(signInWithPhoneUseCase, verifyCodeUseCase)
