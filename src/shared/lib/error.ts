export class AuthorizatoinError extends Error {
    constructor(mesage: string) {
        let errorMessage = mesage

        switch(errorMessage) {
            case 'Firebase: Error (auth/billing-not-enabled).':
                errorMessage = 'К сожалению, некорректный номер телефона'
                break;
            case 'Firebase: Error (auth/invalid-verification-code).':
                errorMessage = 'Не удалось подтвердить номер телефона'
                break
            case 'No Confirmation':
                errorMessage = 'Не удалось подтвердить номер телефона'
                break;
            default: 
                errorMessage = "An error occurred sign in phone"
        }

        super(errorMessage)
    }
}


export class BadRequest extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class FirestoreError extends BadRequest {
    constructor(message: string) {
        let errorMessage = message

        switch(errorMessage) {
            case 'b':
                break;
            case 'a':
                break;
            default: 
                errorMessage = "An error occurred database"
        }

        super(errorMessage)
    }
}

