import { ScrollShadow } from '@nextui-org/react';
import { forwardRef, PropsWithChildren } from 'react';

interface MessageListProps {}

const MessageList = forwardRef<HTMLDivElement, PropsWithChildren<MessageListProps>>((props, ref) => {
  return (
    <ScrollShadow size={100}>
      <section ref={ref} className="messageList flex h-[60dvh] flex-col gap-2 overflow-y-scroll p-4">
        {props.children}
      </section>
    </ScrollShadow>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
