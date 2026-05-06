import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL_LANGUAGES } from "@/lib/constants";
import { Languages, Type, Bell, Shield, LogOut, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [lang, setLang] = useState(() => localStorage.getItem("afri_translate_lang") || "tw");
  const [fontSize, setFontSize] = useState(() => [Number(localStorage.getItem("afri_font_size") || 16)]);
  const [opacity, setOpacity] = useState(() => [Number(localStorage.getItem("afri_opacity") || 0.9) * 100]);

  const saveSettings = () => {
    localStorage.setItem("afri_translate_lang", lang);
    localStorage.setItem("afri_font_size", fontSize[0].toString());
    localStorage.setItem("afri_opacity", (opacity[0] / 100).toString());
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-neutral-400">Customize your experience</p>
      </header>

      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-afri-gold">
            <Languages className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Translation</h2>
          </div>
          
          <div className="space-y-2">
            <Label>Target Language</Label>
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger className="bg-neutral-900 border-neutral-800 h-12 rounded-xl">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                {ALL_LANGUAGES.map(l => (
                  <SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-afri-green">
            <Type className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Subtitles</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Font Size</Label>
                <span className="text-xs text-neutral-500">{fontSize[0]}px</span>
              </div>
              <Slider 
                value={fontSize} 
                onValueChange={setFontSize} 
                max={24} 
                min={12} 
                step={1} 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Subtitle Opacity</Label>
                <span className="text-xs text-neutral-500">{opacity[0]}%</span>
              </div>
              <Slider 
                value={opacity} 
                onValueChange={setOpacity} 
                max={100} 
                min={20} 
                step={5} 
              />
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-neutral-900">
          <SettingLink icon={<Bell className="w-4 h-4" />} title="Notifications" />
          <SettingLink icon={<Shield className="w-4 h-4" />} title="Privacy & Security" />
          <Button 
            variant="outline" 
            className="w-full border-neutral-800 text-red-500 hover:bg-red-500/10 hover:text-red-500 h-12 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </section>

        <Button 
          onClick={saveSettings}
          className="w-full bg-afri-gold hover:bg-afri-gold/90 text-neutral-950 h-14 rounded-2xl font-bold text-lg shadow-xl"
        >
          Save All Changes
        </Button>
      </div>
    </div>
  );
}

function SettingLink({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 bg-neutral-900/40 rounded-xl hover:bg-neutral-900 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-neutral-500">{icon}</div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <ChevronDown className="w-4 h-4 text-neutral-700 -rotate-90" />
    </button>
  );
}