import { UseCase } from "@/core/application/use.case.ts";
import { ViewerRepository } from "@/core/models/viewer/viewer.repository";
import { ViewerView } from "../viewer.to.view";

export class getCurrentViewerUseCase implements UseCase<UniqueId | number, ViewerView> {

    constructor(
        private viewerRepository: ViewerRepository
    ) { }

    async execute(id: UniqueId): Promise<ViewerView | undefined> {

        const currentViewer = await this.viewerRepository.getViewer(id)

        if (currentViewer) {
            return ViewerView.fromDomain(currentViewer)
        }

    }
}
