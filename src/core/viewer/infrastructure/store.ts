import {Viewer} from "@/core/viewer/domain/viewer.entity.ts";


export const viewerStore = () => {

    let viewer: Viewer | null = null;

    const saveViewer = (value: Viewer) => {
        if(value) {
            viewer = value
        } else {
            throw new Error('Viewer not found.');
        }
    }

    return {
        viewer,
        saveViewer
    }
}




const store = viewerStore()

export type ViewerStore = typeof  store



