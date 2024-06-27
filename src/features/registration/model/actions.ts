import { Status, User } from "./types"

const NEXT_STEP = 'NEXT_STEP'
const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER'
const SET_USER = 'SET_USER'
const SET_STATUS = 'SET_STATUS'

export type Action =
    { type: typeof NEXT_STEP } |
    { type: typeof SET_PHONE_NUMBER, payload: string } |
    { type: typeof SET_USER, payload: User } |
    { type: typeof SET_STATUS, payload: Status }


const nextStep = (): Action => ({ type: NEXT_STEP })
const setPhoneNumber = (phoneNumber: string): Action => ({ type: SET_PHONE_NUMBER, payload: phoneNumber })
const setUser = (user: User): Action => ({ type: SET_USER, payload: user })
const setStatus = (status: Status): Action => ({ type: SET_STATUS, payload: status })


export { nextStep, setPhoneNumber, setUser, setStatus }

