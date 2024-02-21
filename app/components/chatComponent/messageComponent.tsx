import { ReactNode } from "react";
import Avatar from "react-avatar";

interface MessageType {
  sender: string;
  ownMessage: boolean;
  date: Date | Number;
  children: ReactNode;
}

export default function Message({
  sender,
  ownMessage,
  date,
  children,
}: MessageType & { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className={`flex gap-2 items-center ${ownMessage ? "justify-end" : ""}`}>
        <Avatar name={sender} className={ownMessage ? "order-2" : ""} round size="2.5rem" />
        <span className={ownMessage ? "" : ""}>{sender}</span>
      </div>
      <div
        className={`w-fit ${ownMessage ? "self-end" : ""} p-3 m-2 rounded-lg ${
          ownMessage
            ? "bg-slate-300 dark:bg-slate-600"
            : "bg-gradient-to-r from-[#38A3F5] to-[#6F90F2]"
        } relative `}
      >
        {children}
        <div
          className={`absolute w-0 h-0 setinha${
            ownMessage
              ? "-own after:border-t-transparent after:border-r-transparent after:border-b-slate-300 after:border-l-transparent dark:after:border-b-slate-600"
              : ""
          } ${ownMessage ? "right-0" : "left-0"} top-0 mt-2 ml-2 mr-2 -mb-1`}
        ></div>
      </div>
    </div>
  );
}
