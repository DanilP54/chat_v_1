import { z } from "zod";


export const viewerInfoSchema = z.object({
    firstname: z.string().regex(/^\p{L}+$/u, "Имя должно содержать только буквы").min(2, {
        message: "Имя должно содержать минимум 2 буквы"
    }),
    lastname: z.string().regex(/^\p{L}+$/u, "Фамилия должна содержать только буквы").min(2, {
        message: "Фамилия должна содержать минимум 2 буквы"
    }),
    avatar: z.union([z.instanceof(File), z.null()]).optional(),
})
