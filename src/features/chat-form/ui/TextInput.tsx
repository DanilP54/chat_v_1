import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "../lib/form-schema";
import { FormEvent, useRef } from "react";


interface TextInputProps {
    placeholder: string;
    field: ControllerRenderProps<z.infer<typeof FormSchema>, "text">;
}


const checkResizeTextBox = (property: string, currentValue: number): void => {
    try {
        const main = document.querySelector('#messages');
        let prevScrollTop;
        if (main) {
            prevScrollTop = main.scrollTop;
        }
        console.log(prevScrollTop)
        const propertyValue = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue(`${property}`))

        if (currentValue !== propertyValue) {
            document.documentElement.style.setProperty('--text-box-height', `${currentValue}px`);
            if (main) {
                main.scrollTop = prevScrollTop; 
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default function TextInput({ placeholder, field }: TextInputProps) {

    const textBoxRef = useRef<HTMLDivElement>(null)

    const handleInput = (e: FormEvent<HTMLDivElement>) => {

        checkResizeTextBox("--text-box-height", e.currentTarget.scrollHeight)
        field.onChange(e.currentTarget.textContent)
    }

    return (
        <div className="h-full relative">
            <div
                ref={textBoxRef}
                contentEditable={true}
                className="text_box"
                tabIndex={0}
                role="textbox"
                dir="auto"
                onInput={handleInput}
            ></div>
            <span
                className={`text_box__placeholder ${field.value ? 'opacity-0' : 'opacity-85'}`}
            >{placeholder}</span>
        </div>
    )
}