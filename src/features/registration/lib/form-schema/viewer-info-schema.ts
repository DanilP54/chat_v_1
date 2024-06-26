import { ZodType, z } from "zod";

interface ViewerInfo {
    firstname: string;
    lastname: string;
    avatar?: File | null;
}

export const ViewerInfoSchema: ZodType<ViewerInfo> = z.object({
    firstname: z.string().regex(/^[A-Za-z]+$/, "Имя должно содержать только буквы").min(2, {
        message: 'Имя должно содержать минимум 2 буквы'
    }),
    lastname: z.string().regex(/^[A-Za-z]+$/, "Фамилия должна содержать только буквы").min(2, {
        message: 'Фамилия должна содержать минимум 2 буквы'
    }),
    avatar: z.union([z.instanceof(File), z.null()]).optional(),
})
