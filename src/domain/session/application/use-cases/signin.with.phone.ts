import {FirebaseAuthRepositoryImpl} from "@/domain/session/infra/firebase.auth.repository.ts";
import {SignInWithPhoneUseCase} from "@/domain/session/application/input.ports.ts";
import {ConfirmationResult} from "firebase/auth";


export class SignInWithPhoneUseCaseImpl implements SignInWithPhoneUseCase<ConfirmationResult> {

    constructor(private authRepository: FirebaseAuthRepositoryImpl) {}

    async execute(phone: string): Promise<ConfirmationResult | undefined> {
        return await this.authRepository.signInWithPhone(phone)
    }
}