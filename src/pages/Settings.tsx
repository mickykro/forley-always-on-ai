import { IntegrationSettings } from "@/components/IntegrationSettings";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowRight className="w-4 h-4 rotate-180 ml-2" />
              חזרה לאתר
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">הגדרות מערכת</h1>
        </div>
        
        <IntegrationSettings />
      </div>
    </div>
  );
};

export default Settings;