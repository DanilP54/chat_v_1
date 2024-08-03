import {GetAuthStateUseCase} from "@/domain/session/application/input.ports.ts";
import {Unsubscribe} from "firebase/auth";
import {AuthState} from "@/domain/session/adapters/storage/firebase.auth.state.ts";

export class GetAuthStateUseCaseImpl implements GetAuthStateUseCase<Unsubscribe> {

    constructor(private getAuthState: AuthState) {
    }

    execute(): Unsubscribe {
        return this.getAuthState(callback)
    }
}