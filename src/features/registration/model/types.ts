export type State = {
    phoneNumber: string,
    status: Status,
    user: User | undefined,
    step: 'step-one' | 'step-two' | 'step-three'
};

export type User = {
    avatar: string,
    firstName: string,
    lastName: string,
};

export type Status = 'pending' | 'success' | 'error' | 'idle';