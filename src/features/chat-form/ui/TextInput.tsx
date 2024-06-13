import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "../lib/form-schema";
import { FormEvent } from "react";

interface TextInputProps {
    placeholder: string;
    field: ControllerRenderProps<z.infer<typeof FormSchema>, "text">;
}

export default function TextInput({
    placeholder,
    field,
}: TextInputProps) {

  

    const handleChangeValue = (e: FormEvent<HTMLDivElement>) => {
        field.onChange(e.currentTarget.textContent)
        console.log(e.target.scrollHeight)
    }


    return (
        <div className="h-full relative">
            <div
                className="bg-transparent caret-gray-800 pl-2 py-5 outline-none h-full text-base absolute top-0 left-0 w-full z-10"
                contentEditable={true}
                tabIndex={0}
                role="textbox"
                dir="auto"
                onInput={handleChangeValue}
            // {...field}
            ></div>
            <span
                className={`absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 z-0 pointer-events-none ${field.value ? 'opacity-0' : 'opacity-85'} transition-opacity duration-200 ease-in-out`}
            >{placeholder}</span>
        </div>
    )
}