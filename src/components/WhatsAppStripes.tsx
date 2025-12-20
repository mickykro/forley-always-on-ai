import { ArrowRight, Video, Phone, MoreVertical } from "lucide-react";

const contacts = [
  { name: "יוסי טכנאי 🔧", status: "Online" },
  { name: "אריק שליח", status: "last seen today" },
  { name: "שמעון רואה חשבון", status: "typing..." },
  { name: "דני אינסטלטור 🚿", status: "Online" },
  { name: "מוטי חשמלאי ⚡", status: "last seen yesterday" },
  { name: "רונית עורכת דין", status: "Online" },
  { name: "אבי מסעדן 🍽️", status: "last seen 2h ago" },
  { name: "גילי מעצבת", status: "typing..." },
  { name: "עמית קבלן 🏗️", status: "Online" },
  { name: "נועה פיזיותרפיסטית", status: "last seen today" },
];

const WhatsAppStripes = () => {
  // Based on the gradient: 30% cycle, green appears at 0-5% and around 25-30%
  // Each cycle is 30% of viewport height
  const stripes = [];
  const cycleHeight = 30; // 30% per cycle
  const totalCycles = Math.ceil(100 / cycleHeight) + 1; // Ensure we cover the full viewport

  for (let i = 0; i < totalCycles; i++) {
    const contact = contacts[i % contacts.length];
    // Position at the start of each cycle (where green appears)
    const topPosition = i * cycleHeight;

    stripes.push(
      <div
        key={i}
        className="absolute left-0 right-0 h-14 flex items-center px-4 gap-3"
        style={{ top: `${topPosition}%` }}
      >
        {/* WhatsApp header content */}
        <div className="flex items-center gap-3 flex-1">
          {/* Back arrow */}
          <ArrowRight className="w-6 h-6 text-white/90" />
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {contact.name.charAt(0)}
            </span>
          </div>
          
          {/* Name and status */}
          <div className="flex flex-col text-right flex-1">
            <span className="text-white font-semibold text-base">
              {contact.name}
            </span>
            <span className="text-white/70 text-xs">
              {contact.status}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-4">
          <Video className="w-5 h-5 text-white/90" />
          <Phone className="w-5 h-5 text-white/90" />
          <MoreVertical className="w-5 h-5 text-white/90" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stripes}
    </div>
  );
};

export default WhatsAppStripes;
