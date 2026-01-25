import { ArrowRight, Video, Phone, MoreVertical } from "lucide-react";
import { ReactNode } from "react";

interface WhatsAppChatSectionProps {
  name: string;
  status?: string;
  children: ReactNode;
  className?: string;
}

const WhatsAppChatSection = ({ 
  name, 
  status = "Online", 
  children,
  className = ""
}: WhatsAppChatSectionProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Subtle tech pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300E5FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Futuristic Chat Header */}
      <div className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b-2 border-primary/30 h-16 flex items-center px-4 gap-3 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
        {/* Back arrow */}
        <ArrowRight className="w-6 h-6 text-primary" />
        
        {/* Avatar with glow */}
        <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.5)]">
          <span className="text-primary text-lg font-bold">
            {name.charAt(0)}
          </span>
        </div>
        
        {/* Name and status */}
        <div className="flex flex-col text-right flex-1 min-w-0">
          <span className="text-primary font-semibold text-base truncate">
            {name}
          </span>
          <span className="text-foreground/70 text-xs">
            {status}
          </span>
        </div>

        {/* Action icons with cyber glow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Video className="w-5 h-5 text-primary/80 hover:text-primary cursor-pointer transition-colors" />
          <Phone className="w-5 h-5 text-primary/80 hover:text-primary cursor-pointer transition-colors" />
          <MoreVertical className="w-5 h-5 text-primary/80 hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>
      
      {/* Content with dark tech background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default WhatsAppChatSection;
