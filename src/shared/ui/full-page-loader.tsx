import { PuffLoader } from "react-spinners";

export function FullPageLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <PuffLoader data-testid="full-page-loader" color={"#1400ff"} />
    </div>
  );
}
