import { Input } from "@/shared/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { ViewerInfoSchema } from "../../lib/form-schema/viewer-info-schema";

type FirstNameInputProps = {
    field: ControllerRenderProps<z.infer<typeof ViewerInfoSchema>, "firstname">;
}

export default function FirstNameInput({ field }: FirstNameInputProps) {
    return <Input className="bg-transparent" type="text" {...field} placeholder="Введите имя" />
}