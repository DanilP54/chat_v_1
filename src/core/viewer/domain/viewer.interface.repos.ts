import { Viewer } from "./viewer.entity"

export interface ViewerRepository {
    getViewerById(id: UniqueId): Promise<Viewer | undefined>
    save<DataType>(id: UniqueId, data: DataType): Promise<void>
}