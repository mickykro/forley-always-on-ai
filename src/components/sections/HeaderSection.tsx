import forliMascot from "@/assets/forli_no_bg.png";
import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  onOpenContact: () => void;
}

const HeaderSection = ({ onOpenContact }: HeaderSectionProps) => {
  return (
    <header className="bg-cyber-void/80 backdrop-blur-sm shadow-lg border-b border-cyber-cyan/30 sticky top-0 z-50">
      <div className="px-4 py-4 flex gap-4 items-center justify-between flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={forliMascot} alt="פורלי הינשוף" className="w-22 h-12 animate-glow-pulse" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary cyber-glow">Call4li</h1>
            <p className="text-sm text-muted-foreground">עם פורלי הינשוף החכם</p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="text-primary hover:bg-primary hover:text-black border-primary cyber-border"
          onClick={onOpenContact}
        >
          להתחלת ניסיון חינם
        </Button>
      </div>
    </header>
  );
};

export default HeaderSection;
