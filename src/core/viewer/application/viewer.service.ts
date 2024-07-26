import { ViewerRepository } from "@/core/models/viewer/viewer.repository.ts";
import { getCurrentViewerUseCase } from "../../application/viewer/use-cases/getViewerUseCase.ts";
import { ViewerView } from "../../application/viewer/ViewerView.ts";

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