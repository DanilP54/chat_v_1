import { ViewerRepository } from "@/core/domain/viewer/viewer.repository";
import { getCurrentViewerUseCase } from "./getViewerUseCase";
import { ViewerView } from "../ViewerViewe";

export class ViewerService {

    private readonly getCurrentViewerUseCase: getCurrentViewerUseCase

    constructor(
        private readonly viewerRepository: ViewerRepository
    ) {
        this.getCurrentViewerUseCase = new getCurrentViewerUseCase(viewerRepository)
    }

    async getCurrentViewer(id: string): Promise<ViewerView | undefined> {
        return await this.getCurrentViewerUseCase.execute(id)
    }

}