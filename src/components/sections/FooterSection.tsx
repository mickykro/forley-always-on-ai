import forliMascot from "@/assets/forli_no_bg.png";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="backdrop-blur-sm py-12 bg-card/30 text-foreground border-t-2 border-primary/20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-void/50 pointer-events-none"></div>
      <div className="px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img src={forliMascot} alt="פורלי הינשוף" className="w-10 h-10 animate-glow-pulse" />
              <h3 className="text-2xl font-bold text-primary cyber-glow">Call4li</h3>
            </div>
            <p className="text-foreground">פורלי הינשוף שתמיד ער בשביל העסק שלך</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">יצירת קשר</h4>
            <div className="space-y-2 text-foreground">
              <p>📧 micky@call4li.com</p>
              <p>📞 054-2045280</p>
              <p>💬 ווטסאפ: 054-2045280</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">קישורים</h4>
            <div className="space-y-2 text-foreground">
              <Link to="/privacy" className="block transition-colors hover:text-primary">
                מדיניות פרטיות
              </Link>
              <Link to="/faq" className="block transition-colors hover:text-primary">
                שאלות נפוצות
              </Link>
              <a href="#" className="block transition-colors hover:text-primary">
                תנאי שימוש
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                צור קשר
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-foreground/70">© 2024 Call4li. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
