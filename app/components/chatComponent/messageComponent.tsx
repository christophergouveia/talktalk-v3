import { ReactNode } from "react";

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
    <div className={`w-fit p-3 m-2 rounded-lg ${ownMessage ? "bg-slate-300 dark:bg-slate-600" : "bg-gradient-to-r from-[#38A3F5] to-[#6F90F2]"} relative`}>
      {children}
      <div className={`absolute w-0 h-0 setinha ${ownMessage ? "right-0" : "left-0"} top-0 mt-2 ml-2 mr-2 -mb-1`}>
      </div>
    </div>
  );
}