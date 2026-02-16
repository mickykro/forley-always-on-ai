import { ReactNode } from "react";

interface MessageBubbleProps {
  children: ReactNode;
  className?: string;
}

const MessageBubble = ({ children, className = "" }: MessageBubbleProps) => {
  return (
    <div className={`relative inline-block max-w-[85%] ${className}`}>
      <div className="bg-card/40 backdrop-blur-md rounded-lg rounded-tr-none px-4 py-3 shadow-[0_0_20px_rgba(240,177,220,0.2)] relative hover:shadow-[0_0_30px_rgba(240,177,220,0.4)] transition-all duration-300"
        style={{
          border: "2px solid transparent",
          backgroundClip: "padding-box",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-lg -z-10"
          style={{
            background: "linear-gradient(135deg, #00FFFF, rgba(240, 177, 220, 0.9))",
            padding: "2px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskClip: "content-box, border-box",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
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
