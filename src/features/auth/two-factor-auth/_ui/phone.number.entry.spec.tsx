import {vi} from "vitest";
import {getDoc} from "firebase/firestore"

vi.mock(import("firebase/firestore"), () => ({
    getDoc: vi.fn()
}))

describe("Phone Number Entry", () => {
    vi.mocked(getDoc, { partial: true }).mockResolvedValue({
       data: () => ({
           phoneNumber: "1234567890",
           name: "Danil"
       })
    });
})


