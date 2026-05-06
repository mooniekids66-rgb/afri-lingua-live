import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SubtitleBar } from "../ui/SubtitleBar";
import { Play, Pause, Power, Info, VideoOff } from "lucide-react";
import { toast } from "sonner";

export default function Translate() {
  const [isActive, setIsActive] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [originalText, setOriginalText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const mockTranslations = [
    { orig: "Check out this amazing recipe from Lagos!", trans: "Sɛ hwɛ aduane a ɛyɛ dɛ yi a efi Lagos!" },
    { orig: "I can't believe how beautiful the sunset is.", trans: "Mentumi nnye nni sɛnea awia kɔtɔeɛ no yɛ fɛ." },
    { orig: "Welcome to the future of African technology.", trans: "Akwaaba kɔ Abibiman mfiridwuma mpuntuo daakye." },
    { orig: "Every child deserves a quality education.", trans: "Abofra biara fata nhomasua a ɛyɛ." }
  ];

  const startTranslation = () => {
    setIsActive(true);
    toast.success("AfriTranslate is listening...", {
      description: "Play any video to see subtitles",
    });

    let index = 0;
    intervalRef.current = setInterval(() => {
      const item = mockTranslations[index % mockTranslations.length];
      setOriginalText(item.orig);
      setCurrentSubtitle(item.trans);
      index++;
    }, 3000);
  };

  const stopTranslation = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentSubtitle("");
    setOriginalText("");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="p-6 h-full flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold">Active Translate</h1>
          <p className="text-xs text-neutral-500">Listening for video audio</p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full border-neutral-800 ${isActive ? "text-afri-green" : "text-neutral-500"}`}
        >
          <Info className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <motion.div 
            animate={isActive ? { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 bg-afri-green/20 rounded-full blur-3xl ${!isActive && 'hidden'}`}
          />
          <div className={`w-40 h-40 rounded-full flex items-center justify-center border-4 ${isActive ? 'border-afri-green' : 'border-neutral-800'} relative z-10 transition-colors`}>
            {isActive ? (
              <div className="flex items-end gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 30, 15, 40, 10] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    className="w-2 bg-afri-gold rounded-full"
                  />
                ))}
              </div>
            ) : (
              <VideoOff className="w-16 h-16 text-neutral-800" />
            )}
          </div>
        </div>

        <h2 className="text-lg font-bold mb-2">{isActive ? "Real-time Tracking" : "Ready to start"}</h2>
        <p className="text-sm text-neutral-400 max-w-[240px] mb-8">
          {isActive ? "Audio detected. Displaying subtitles on your screen." : "Switch to your favorite video app and AfriTranslate will follow."}
        </p>

        <Button
          onClick={isActive ? stopTranslation : startTranslation}
          className={`w-20 h-20 rounded-full shadow-2xl transition-all ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-afri-green hover:bg-afri-green-dark'}`}
        >
          {isActive ? <Power className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </Button>
      </div>

      <AnimatePresence>
        {isActive && (
          <SubtitleBar 
            key="subtitle-bar"
            text={currentSubtitle} 
            originalText={originalText}
            onClose={stopTranslation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}