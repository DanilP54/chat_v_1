export interface AuthRepository {
    signIn(phoneNumber: string): Promise<boolean>
    verify(code: string): Promise<void>
    subscribeAuthState(observer: any): any
}