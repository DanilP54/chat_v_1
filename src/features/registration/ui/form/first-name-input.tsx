import { Input } from "@/shared/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { viewerInfoSchema } from "../../lib/form-schema/viewer-info-schema";

type FirstNameInputProps = {
    field: ControllerRenderProps<z.infer<typeof viewerInfoSchema>, "firstname">;
}

export default function FirstNameInput({ field }: FirstNameInputProps) {
    return <Input
        className="bg-transparent outline-none rounded-none border-l-0 border-r-0 border-t-0 border-b-2 placeholder:text-gray-300 text-white"
        type="text"
        {...field}
        placeholder="Введите имя"
    />
};
