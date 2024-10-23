import { z } from "zod";


export const createProfileSchema = z.object({
    firstname: z.string().min(2, {
        message: "Имя должно содержать минимум 2 буквы"
    }),
    lastname: z.string().min(2, {
        message: "Фамилия должна содержать минимум 2 буквы"
    }),
    avatar: z.instanceof(File).optional(),
});
