import {PuffLoader} from "react-spinners"

export function FullPageSpinner() {

    return (
        <div className="w-full h-full flex justify-center items-center">
            <PuffLoader color={'#1400ff'} />
        </div>
    )
}