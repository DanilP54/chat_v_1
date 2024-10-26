// output
export interface SessionRepository<T, E> {
    signInWithPhone(phone: string): Promise<T>,
    verifyCode(otp: string): Promise<E>
}
