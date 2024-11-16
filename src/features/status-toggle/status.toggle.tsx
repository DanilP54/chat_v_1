import React from "react";

const ONLINE_COLOR = "bg-blue-800";
const OFFLINE_COLOR = "bg-red-800";

export const StatusToggle = () => {
  const [status, setStatus] = React.useState<"online" | "offline">("online");

  const isOnline = status === "online";
  const handleChangeStatus = () => {
    setStatus(status === "online" ? "offline" : "online");
  };

  return (
    <>
      <span
        onClick={handleChangeStatus}
        className={`w-2 h-2 ${
          isOnline ? ONLINE_COLOR : OFFLINE_COLOR
        } rounded-full`}
      ></span>
    </>
  );
};
