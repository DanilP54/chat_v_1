import { Viewer } from "./viewer.entity"


export interface ViewerRepository {
    get(id: UniqueId): Promise<Viewer | undefined>
    save(id: UniqueId, data: any): Promise<void>
    // setAvatar(File: File): Promise<void>
    // getAvatar(source: string): Promise<void>
}