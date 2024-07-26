import { Viewer } from "../viewer/viewer.entity"
import {Unsubscribe} from "firebase/auth";
type ObserverFn<T> = (value: T) => Promise<void>

export interface AuthRepository {
    signIn(phoneNumber: string): Promise<boolean>
    verify(code: string): Promise<void>
    subscribeAuthState<T>(observer: T): Unsubscribe
}