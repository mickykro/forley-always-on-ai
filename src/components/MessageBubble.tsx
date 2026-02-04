import { ReactNode } from "react";

interface MessageBubbleProps {
  children: ReactNode;
  className?: string;
}

const MessageBubble = ({ children, className = "" }: MessageBubbleProps) => {
  return (
    <div className={`relative inline-block max-w-[85%] ${className}`}>
      <div className="bg-card/40 backdrop-blur-md border-2 border-primary/30 rounded-lg rounded-tr-none px-4 py-3 shadow-[0_0_20px_rgba(0,229,255,0.2)] relative hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:border-primary/50 transition-all duration-300">
        {/* Futuristic bubble tail */}
        {/* <div 
          className="absolute -top-0 -right-4 w-0 h-0"
          style={{
            borderLeft: '16px solid rgba(5, 10, 30, 0.4)',
            borderTop: '20px solid transparent',
            filter: 'drop-shadow(0 0 5px rgba(0, 229, 255, 0.3))',
          }}
        /> */}
        {children}
      </div>
    </div>
  );
};

export default MessageBubble;
