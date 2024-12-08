import { ScrollShadow } from '@nextui-org/react';
import { forwardRef, PropsWithChildren } from 'react';

interface MessageListProps {
  children: React.ReactNode;
  className?: string;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
