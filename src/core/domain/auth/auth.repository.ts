import { Viewer } from "../viewer/viewer.entity"


export interface AuthRepository {
    signIn(phoneNumber: string): Promise<boolean>
    verify(code: string): Promise<Viewer>
}