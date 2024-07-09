import { DotLoader } from "react-spinners";

type LoaderProps = {
    color?: string;
}
export function Loader({ color }: LoaderProps) {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <DotLoader color={color} />
        </div>
    )
}