import forliMascot from "@/assets/forli_no_bg.png";
import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  onOpenContact: () => void;
}

const HeaderSection = ({ onOpenContact }: HeaderSectionProps) => {
  return (
    <header className="header-bar bg-cyber-void/80 backdrop-blur-sm shadow-lg border-b border-cyber-cyan/30 sticky top-0 z-50">
      <div className="header-inner py-4 flex gap-8 items-center justify-between flex-row md:items-center md:justify-between">
        <div className="header-brand flex items-center">
          <img src={forliMascot} alt="פורלי הינשוף" className="w-22 h-12 animate-glow-pulse" />
          <div className="header-text">
            <h1 className="text-xl md:text-2xl font-bold text-primary cyber-glow">Call4li</h1>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="header-cta text-primary hover:bg-primary hover:text-black border-primary cyber-border"
          onClick={onOpenContact}
        >
          להתחלת ניסיון חינם
        </Button>
      </div>
    </header>
  );
};

export default HeaderSection;
