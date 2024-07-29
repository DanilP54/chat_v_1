// Entity

export type Message = {
    created_at: Date
    updated_at: Date
    sender_id: UniqueId
    text: string
    edit_text: string
    media: string[]
}