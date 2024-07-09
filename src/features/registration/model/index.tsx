import { OTPVerification, PhoneNumber, ViewerInfoForm } from "../ui"

enum Step {
    PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
    VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
    USER_DATA_ENTRY = 'USER_DATA_ENTRY',
}

type StatePhoneNumber = {
    step: Step.PHONE_NUMBER_ENTRY
}

type StateVerifyCode = {
    step: Step.VERIFY_CODE_ENTRY
}

type StateUserData = {
    step: Step.USER_DATA_ENTRY,
    uid: string
}

type State = StatePhoneNumber | StateVerifyCode | StateUserData

type StateCreator<T extends State> = (state: T) => React.ReactNode

const createPhoneNumberEntry: StateCreator<StatePhoneNumber> = (state: StatePhoneNumber) => <PhoneNumber />
const createVerifyCodeEntry: StateCreator<StateVerifyCode> = (state: StateVerifyCode) => <OTPVerification />
const createUserDataEntry: StateCreator<StateUserData> = (state: StateUserData) => <ViewerInfoForm {...state} />

export const routing = (state: State): React.ReactNode => {
    switch (state.step) {
        case Step.PHONE_NUMBER_ENTRY:
            return createPhoneNumberEntry(state);
        case Step.VERIFY_CODE_ENTRY:
            return createVerifyCodeEntry(state);
        case Step.USER_DATA_ENTRY:
            return createUserDataEntry(state)
    }
}