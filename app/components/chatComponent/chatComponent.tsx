import { ReactNode } from "react";

export default function ChatComponent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

ChatComponent.Header = ChatComponent;
ChatComponent.Body = ChatComponent;
ChatComponent.Footer = ChatComponent;
ChatComponent.Avatars = ChatComponent;
ChatComponent.LanguageOptions = ChatComponent;
ChatComponent.Settings = ChatComponent;
