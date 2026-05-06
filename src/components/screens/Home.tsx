import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AFRICAN_LANGUAGES, ALL_LANGUAGES } from "@/lib/constants";
import { Globe, Languages, Sparkles, Video } from "lucide-react";

interface HomeProps {
  onStart: () => void;
  onSelectLanguage: (lang: string) => void;
  userLanguage: string | null;
}

export default function Home({ onStart, onSelectLanguage, userLanguage }: HomeProps) {
  if (!userLanguage) {
    return <Onboarding onSelectLanguage={onSelectLanguage} />;
  }

  const selectedLangName = ALL_LANGUAGES.find(l => l.code === userLanguage)?.name;

  return (
    <div className="p-6 relative">
      <div className="african-pattern" />
      
      <header className="mb-8 pt-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-afri-green rounded-lg flex items-center justify-center shadow-lg shadow-afri-green/20">
            <Languages className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AfriTranslate</h1>
        </div>
        <p className="text-neutral-400 text-sm">Your world, in your language.</p>
      </header>

      <section className="space-y-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-afri-gold">Active Subtitles</h2>
              <p className="text-sm text-neutral-400">Currently translating to: <span className="text-white font-medium">{selectedLangName}</span></p>
            </div>
            <div className="bg-afri-gold/10 text-afri-gold p-2 rounded-full">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          
          <div className="aspect-video rounded-2xl bg-neutral-800 flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-700 p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center">
              <Video className="text-neutral-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium">No video detected</p>
              <p className="text-xs text-neutral-500 mt-1">Open TikTok, YouTube or Instagram to start</p>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6 bg-afri-green hover:bg-afri-green-dark text-white rounded-xl h-12 font-bold shadow-xl shadow-afri-green/10"
            onClick={onStart}
          >
            Start Translating
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <FeatureCard 
            icon={<Sparkles className="text-afri-gold" />}
            title="AI Detection"
            desc="Auto-detects 100+ languages"
          />
          <FeatureCard 
            icon={<Languages className="text-afri-green" />}
            title="Local Dialects"
            desc="Focused on African roots"
          />
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-afri-gold">
          <div className="flex-1">
            <h3 className="text-sm font-semibold">Today's Usage</h3>
            <div className="h-2 bg-neutral-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-afri-gold w-1/3" />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">10 of 30 mins used</p>
          </div>
          <Button variant="ghost" className="text-afri-gold text-xs h-auto p-0 font-bold">UPGRADE</Button>
        </div>
      </section>
    </div>
  );
}

function Onboarding({ onSelectLanguage }: { onSelectLanguage: (lang: string) => void }) {
  return (
    <div className="min-h-screen relative flex flex-col">
      <div 
        className="h-[45vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/dc9c4218-351b-481b-b6eb-135c9e6a0285/onboarding-hero-78813e05-1778070200481.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold text-white leading-tight"
          >
            Africa's Voice, <br />
            <span className="text-afri-gold underline decoration-afri-green underline-offset-8">Translated.</span>
          </motion.h1>
        </div>
      </div>

      <div className="flex-1 p-6 bg-neutral-950 -mt-2 rounded-t-[32px] relative z-10">
        <h2 className="text-xl font-bold mb-2">Welcome to AfriTranslate</h2>
        <p className="text-neutral-400 text-sm mb-8">What is your primary language? We'll translate all videos into this for you.</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-afri-gold mb-3">African Languages</h3>
            <div className="grid grid-cols-2 gap-3">
              {AFRICAN_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLanguage(lang.code)}
                  className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl text-left hover:border-afri-green transition-colors active:scale-95 group"
                >
                  <span className="block font-bold group-hover:text-afri-green">{lang.name}</span>
                  <span className="text-[10px] text-neutral-500">{lang.region}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Other Languages</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_LANGUAGES.filter(l => !AFRICAN_LANGUAGES.find(a => a.code === l.code)).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLanguage(lang.code)}
                  className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-xs font-medium hover:border-neutral-600 active:scale-95"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass-card p-4 rounded-2xl flex flex-col gap-2">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-[11px] text-neutral-500 leading-tight">{desc}</p>
    </div>
  );
}