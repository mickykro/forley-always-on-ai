import { ReactNode } from "react";

interface MessageBubbleProps {
  children: ReactNode;
  className?: string;
}

const MessageBubble = ({ children, className = "" }: MessageBubbleProps) => {
  return (
    <div className={`relative inline-block max-w-[85%] ${className}`}>
      <div className="bg-white rounded-lg rounded-tr-none px-4 py-3 shadow-md relative">
        {/* WhatsApp bubble tail */}
        <div className="absolute -top-0 -right-2 w-0 h-0 border-l-[10px] border-l-white border-t-[10px] border-t-transparent" />
        {children}
      </div>
    </div>
  );
};

export default MessageBubble;
