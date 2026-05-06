import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Home, MessageSquare, Settings as SettingsIcon, Crown } from "lucide-react";
import HomePage from "./components/screens/Home";
import TranslatePage from "./components/screens/Translate";
import SettingsPage from "./components/screens/Settings";
import UpgradePage from "./components/screens/Upgrade";

type Screen = "home" | "translate" | "settings" | "upgrade";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [userLanguage, setUserLanguage] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem("afri_translate_lang");
    if (savedLang) {
      setUserLanguage(savedLang);
      setIsNewUser(false);
    }
  }, []);

  const handleLanguageSelect = (lang: string) => {
    setUserLanguage(lang);
    localStorage.setItem("afri_translate_lang", lang);
    setIsNewUser(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomePage onStart={() => setCurrentScreen("translate")} onSelectLanguage={handleLanguageSelect} userLanguage={userLanguage} />;
      case "translate":
        return <TranslatePage />;
      case "settings":
        return <SettingsPage />;
      case "upgrade":
        return <UpgradePage />;
      default:
        return <HomePage onStart={() => setCurrentScreen("translate")} onSelectLanguage={handleLanguageSelect} userLanguage={userLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-[#D4AF37] selection:text-neutral-950">
      <style dangerouslySetInnerHTML={{ __html: `
        .african-pattern {
          background-image: url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/dc9c4218-351b-481b-b6eb-135c9e6a0285/african-pattern-5992efa6-1778070199533.webp');
          background-size: cover;
          background-position: center;
          opacity: 0.1;
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .glass-card {
          background-color: rgba(23, 23, 23, 0.4);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(38, 38, 38, 0.5);
        }
        .text-afri-gold { color: #D4AF37; }
        .bg-afri-gold { background-color: #D4AF37; }
        .border-afri-gold { border-color: #D4AF37; }
        .text-afri-green { color: #2E8B57; }
        .bg-afri-green { background-color: #2E8B57; }
        .border-afri-green { border-color: #2E8B57; }
        .hover\\:bg-afri-green-dark:hover { background-color: #006400; }
        .shadow-afri-green\\/20 { shadow-color: rgba(46, 139, 87, 0.2); }
        .shadow-afri-gold\\/20 { shadow-color: rgba(212, 175, 55, 0.2); }
      `}} />
      
      <main className="pb-20 max-w-md mx-auto min-h-screen border-x border-neutral-900 shadow-2xl relative overflow-hidden">
        {renderScreen()}
      </main>

      {/* Mobile Bottom Navigation */}
      {!isNewUser && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-neutral-950/80 backdrop-blur-lg border-t border-neutral-800 px-6 py-3 flex justify-between items-center z-50">
          <NavButton 
            active={currentScreen === "home"} 
            onClick={() => setCurrentScreen("home")}
            icon={<Home className="w-6 h-6" />}
            label="Home"
          />
          <NavButton 
            active={currentScreen === "translate"} 
            onClick={() => setCurrentScreen("translate")}
            icon={<MessageSquare className="w-6 h-6" />}
            label="Translate"
          />
          <NavButton 
            active={currentScreen === "upgrade"} 
            onClick={() => setCurrentScreen("upgrade")}
            icon={<Crown className="w-6 h-6" />}
            label="Pro"
          />
          <NavButton 
            active={currentScreen === "settings"} 
            onClick={() => setCurrentScreen("settings")}
            icon={<SettingsIcon className="w-6 h-6" />}
            label="Settings"
          />
        </nav>
      )}
      <Toaster position="top-center" theme="dark" closeButton />
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? "text-[#D4AF37] scale-110" : "text-neutral-500 hover:text-neutral-300"}`}
    >
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
    </button>
  );
}

export default App;