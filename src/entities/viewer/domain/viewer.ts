import { ChatPreview } from "@/entities/chat-preview";

export type Viewer = {
    firstName: ViewerFirstName;
    lastName: ViewerLastName;
    avatar: ViewerAvatar | null;
    userchats: ChatPreview[];
    blocked: UserId[];
}

export function createViewer(viewer: Viewer): Viewer {
    return viewer;
}