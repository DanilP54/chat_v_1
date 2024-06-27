import { Input } from "@/shared/ui/input";
import { viewerInfoSchema } from "../../lib/form-schema/viewer-info-schema";
import { z } from "zod";
import { ControllerRenderProps } from "react-hook-form";

type LastNameInputProps = {
    field: ControllerRenderProps<z.infer<typeof viewerInfoSchema>, "lastname">;
}

export default function LastNameInput({ field }: LastNameInputProps) {
    return <Input className="bg-transparent outline-none rounded-none border-l-0 border-r-0 border-t-0 border-b-2" type="text" {...field} placeholder="Введите фамилию" />
}