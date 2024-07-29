import {CurrentViewer} from "@/domain/current-viewer/domain/current.viewer.entity.ts";

type SessionActive = 'active'
type SessionNotActive = 'not active'

type SessionStatus = SessionActive | SessionNotActive
type SessionId = string
type SessionStartTime = Date
type SessionEndTime = Date

// Aggregate

export type Session = {
    readonly id: SessionId,
    readonly start_time: SessionStartTime,
    readonly end_time: SessionEndTime | null,
    readonly status: SessionStatus,
    readonly current_session_viewer: CurrentViewer
}

export function createSession() {}

export function endSession() {}

export function changeStatus() {}

export function addDataSession() {}

// Process: создать сессию ----->
// Trigger event: Верификация прошла успешно ----->
// Явный Input: id текущего пользователя, phone number текущего пользователя ------->
// Неявный Input: account данные текущего пользователя ------->
// Output: сессия создана событие -------->
