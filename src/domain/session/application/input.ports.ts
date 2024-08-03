export interface AuthPhoneService {
    signIn(phone: string): Promise<boolean>
    verify(code: string): Promise<boolean>
}

export interface GetAuthStateUseCase<ResponseType> {
    execute(): ResponseType
}