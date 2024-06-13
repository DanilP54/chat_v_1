import { z } from "zod";


const fileSchema = z.object({
    file: z.instanceof(File).refine((value) => {
        return value.size < 5 * 1024 * 1024
    }, {
        message: "Недопустимый размер файла"
    }).refine((value) => {
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    }, {
        message: "Недопустимый формат файла"
    })
})

export const FormSchema = z.object({
    text: z.string(),
    file: z.union([z.null(),z.array(fileSchema)]).optional(),
})
