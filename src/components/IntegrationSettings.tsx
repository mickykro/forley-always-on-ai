import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ContactIntegrationService } from "@/services/contactIntegration";
import { useToast } from "@/components/ui/use-toast";
import { Settings, Webhook, Zap, MessageSquare, Mail } from "lucide-react";

export const IntegrationSettings = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    webhookUrl: "",
    zapierWebhook: "",
    slackWebhook: "",
    formspreeEndpoint: "",
  });

  useEffect(() => {
    const savedConfig = ContactIntegrationService.getConfig({webhookUrl:"https://hook.eu2.make.com/plnfn1an3nb92tnvi6xctpt9wwylqfx8"});
    setConfig({
      webhookUrl: savedConfig.webhookUrl || "",
      zapierWebhook: savedConfig.zapierWebhook || "",
      slackWebhook: savedConfig.slackWebhook || "",
      formspreeEndpoint: savedConfig.emailService?.config?.endpoint || "",
    });
  }, []);

  const handleSave = () => {
    const integrationConfig = {
      webhookUrl: config.webhookUrl || undefined,
      zapierWebhook: config.zapierWebhook || undefined,
      slackWebhook: config.slackWebhook || undefined,
      emailService: config.formspreeEndpoint ? {
        type: 'formspree' as const,
        config: { endpoint: config.formspreeEndpoint }
      } : undefined,
    };

    ContactIntegrationService.setConfig(integrationConfig);
    
    toast({
      title: "הגדרות נשמרו",
      description: "האינטגרציות עודכנו בהצלחה",
    });
  };

  const getActiveIntegrationsCount = () => {
    return [config.webhookUrl, config.zapierWebhook, config.slackWebhook, config.formspreeEndpoint]
      .filter(Boolean).length;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <CardTitle>הגדרות אינטגרציות</CardTitle>
          <Badge variant="secondary">{getActiveIntegrationsCount()} פעילות</Badge>
        </div>
        <CardDescription>
          הגדירו לאן ישלחו נתוני הטופס מהאתר
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="webhook" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="webhook" className="flex items-center gap-2">
              <Webhook className="w-4 h-4" />
              Webhook
            </TabsTrigger>
            <TabsTrigger value="zapier" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Zapier
            </TabsTrigger>
            <TabsTrigger value="slack" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Slack
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="webhook" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook">Generic Webhook URL</Label>
              <Input
                id="webhook"
                value={config.webhookUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                placeholder="https://your-server.com/webhook"
                dir="ltr"
              />
              <p className="text-sm text-muted-foreground">
                הזינו URL של webhook שיקבל את נתוני הטופס בפורמט JSON
              </p>
            </div>
          </TabsContent>

          <TabsContent value="zapier" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zapier">Zapier Webhook URL</Label>
              <Input
                id="zapier"
                value={config.zapierWebhook}
                onChange={(e) => setConfig(prev => ({ ...prev, zapierWebhook: e.target.value }))}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                dir="ltr"
              />
              <p className="text-sm text-muted-foreground">
                צרו Zap חדש ב-Zapier עם Webhook trigger והדביקו כאן את ה-URL
              </p>
            </div>
          </TabsContent>

          <TabsContent value="slack" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slack">Slack Webhook URL</Label>
              <Input
                id="slack"
                value={config.slackWebhook}
                onChange={(e) => setConfig(prev => ({ ...prev, slackWebhook: e.target.value }))}
                placeholder="https://hooks.slack.com/services/..."
                dir="ltr"
              />
              <p className="text-sm text-muted-foreground">
                צרו Incoming Webhook ב-Slack והדביקו כאן את ה-URL
              </p>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="formspree">Formspree Endpoint</Label>
              <Input
                id="formspree"
                value={config.formspreeEndpoint}
                onChange={(e) => setConfig(prev => ({ ...prev, formspreeEndpoint: e.target.value }))}
                placeholder="https://formspree.io/f/your-form-id"
                dir="ltr"
              />
              <p className="text-sm text-muted-foreground">
                צרו טופס חדש ב-Formspree והדביקו כאן את ה-endpoint URL
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button onClick={handleSave}>
            שמירת הגדרות
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};