export interface Phone2FAuthRepository {
    signInWithPhone(phone: string): Promise<unknown>
    verifyOtp(code: string, confirmation: unknown): Promise<unknown>
}