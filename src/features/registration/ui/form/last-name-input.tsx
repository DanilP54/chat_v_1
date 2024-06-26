import { Input } from "@/shared/ui/input";
import { ViewerInfoSchema } from "../../lib/form-schema/viewer-info-schema";
import { z } from "zod";
import { ControllerRenderProps } from "react-hook-form";

type LastNameInputProps = {
    field: ControllerRenderProps<z.infer<typeof ViewerInfoSchema>, "lastname">;
}

export default function LastNameInput({ field }: LastNameInputProps) {
    return <Input className="bg-transparent" type="text" {...field} placeholder="Введите фамилию" />
}