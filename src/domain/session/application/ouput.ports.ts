import {ResultType} from "@/domain/result.ts";

export type SignInWithPhonePort<ResponseType> = (phone: string) => Promise<ResultType<ResponseType>>
export type VerifyCodePort<DataType, ResponseType> = (code: string, confirmation: DataType) => Promise<ResultType<ResponseType>>
export type GetAuthStatePort<ResponseType> = (callback: any) => ResponseType