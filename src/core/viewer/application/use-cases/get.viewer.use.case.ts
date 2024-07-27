import { UseCase } from "@/core/viewer/application/input.port.ts";
import { ViewerRepository } from "../../domain/viewer.interface.repos";
import { ViewerView } from "../viewer.ui.ts";

export class getCurrentViewerUseCase implements UseCase<UniqueId | number, ViewerView> {

    constructor(
        private viewerRepository: ViewerRepository
    ) { }

    async execute(id: UniqueId): Promise<ViewerView | undefined> {

        const currentViewer = await this.viewerRepository.getViewerById(id)

        if (currentViewer) {
            return ViewerView.fromDomain(currentViewer)
        }

    }
}
