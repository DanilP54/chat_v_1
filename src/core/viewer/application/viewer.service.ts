import { getCurrentViewerUseCase } from "./use-cases/get.viewer.use.case.ts";
import { ViewerView } from "./viewer.ui.ts";

export class ViewerService {

    private readonly getCurrentViewerUseCase: getCurrentViewerUseCase

    constructor(getCurrentViewerUseCase: getCurrentViewerUseCase) {
        this.getCurrentViewerUseCase = getCurrentViewerUseCase
    }

    async getCurrentViewer(id: string): Promise<ViewerView | undefined> {
        return await this.getCurrentViewerUseCase.execute(id)
    }

}