export interface VerifyCodeUseCase<TResponse, TConfirmation> {
    execute(code: string, confirmation: TConfirmation): Promise<TResponse | undefined>;
}

export interface SignInWithPhoneUseCase<TResponse> {
    execute(phone: string): Promise<TResponse | undefined>;
}