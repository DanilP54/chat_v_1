import {ConfirmationResult} from "firebase/auth";
import {FirebaseAuthRepositoryImpl} from "@/domain/session/infra/firebase.auth.repository.ts";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {VerifyCodeUseCase} from "@/domain/session/application/input.ports.ts";


export class VerifyCodeUseCaseImpl implements VerifyCodeUseCase<UserCredential, ConfirmationResult> {

    constructor(private authRepository: FirebaseAuthRepositoryImpl) {
    }

    async execute(code: string, confirmation: ConfirmationResult): Promise<UserCredential | undefined> {
        return await this.authRepository.verifyOtp(code, confirmation)
    }

} 