import { DotLoader } from "react-spinners"

export function FullPageSpinner() {

    return (
        <div className="w-full h-full flex justify-center items-center">
            <DotLoader color={'#333'} />
        </div>
    )


}