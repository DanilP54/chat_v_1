import { Outlet } from "react-router-dom";

export default function AuthenticationLayout() {
  return (
    <>
      <div className="h-full">
        <div className="flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}
