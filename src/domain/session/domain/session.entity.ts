import {CurrentViewer} from "@/domain/current-viewer/domain/current.viewer.entity.ts";

type SessionActive = 'active'
type SessionNotActive = 'not active'

type SessionStatus = SessionActive | SessionNotActive
type SessionStartTime = Date
type SessionEndTime = Date


type SessionId = string
export type SessionDTO = CurrentViewer


export type SessionProps = {
    readonly start_time: SessionStartTime,
    readonly end_time?: SessionEndTime,
    readonly status: SessionStatus,
    readonly current_viewer: CurrentViewer
}

export class Session {
    private readonly _data
    private readonly _id

    constructor(props: SessionProps, id: SessionId) {
        this._data = props
        this._id = id
    }

    get data() {
        return this._data
    }

    get id() {
        return this._id
    }

    static create(props: SessionDTO, id: SessionId): Session {
        return new Session({
            start_time: new Date(),
            status: 'active',
            current_viewer: props
        }, id)
    }
}
