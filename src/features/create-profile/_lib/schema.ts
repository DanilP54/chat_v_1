import { z } from "zod";

export const profileFormSchema = z.object({
  firstname: z.string().max(20, {
    message: "Имя должно содержать максимум 30 букв",
  }),
  lastname: z.string().max(20, {
    message: "Фамилия должна содержать максимум 30 букв",
  }),
  avatar: z.instanceof(File).optional(),
});
