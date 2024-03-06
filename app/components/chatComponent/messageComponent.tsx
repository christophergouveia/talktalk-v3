import { ReactNode } from "react";
import Avatar from "react-avatar";

interface MessageType {
  sender: string;
  ownMessage: boolean;
  date: Date | Number;
  children: ReactNode;
  className?: string;
}

export default function Message({
  sender,
  ownMessage,
  date,
  children,
  className,
}: MessageType & { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex gap-2 items-center ${ownMessage ? "justify-end" : ""}`}
      >
        <Avatar
          name={sender}
          className={ownMessage ? "order-2" : ""}
          round
          size="2.5rem"
        />
        <span>{sender}</span>
      </div>
      <div
        className={`w-fit ${ownMessage ? "self-end" : ""} p-3 m-2 rounded-lg ${
          ownMessage
            ? "bg-gradient-to-r from-[#38A3F5] to-[#6F90F2]"
            : "bg-slate-300 dark:bg-slate-600"
        } relative text-justify break-all w-[calc(100%-4rem)] ${className}`}
      >
        {children}
        <div
          className={`absolute w-0 h-0 ${
            ownMessage ? "right-0" : "left-0"
          } top-0 mt-2 ml-2 mr-1.5 -mb-1`}
        >
          <div
            className={`w-3 h-3 ${
              ownMessage
                ? "bg-[#6F90F2]"
                : "bg-slate-300 dark:bg-slate-600"
            } [clip-path:_polygon(100%_60%,_35%_3%,_8%_63%)]`}
          ></div>
        </div>
      </div>
    </div>
  );
}
