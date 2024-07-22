import { UseCase } from "@/core/domain/use.case";
import { ViewerRepository } from "@/core/domain/viewer/viewer.repository";
import { ViewerView } from "../ViewerViewe";

export class getCurrentViewerUseCase implements UseCase<UniqueId | number, ViewerView> {

    constructor(
        private viewerRepository: ViewerRepository
    ) { }

    async execute(id: UniqueId): Promise<ViewerView | undefined> {

        const currentViewer = await this.viewerRepository.get(id)

        if (currentViewer) {
            return ViewerView.fromDomain(currentViewer)
        }
    }
}
