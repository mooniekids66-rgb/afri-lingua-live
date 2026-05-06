import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GripVertical, ChevronDown } from "lucide-react";

interface SubtitleBarProps {
  text: string;
  originalText: string;
  onClose: () => void;
}

export function SubtitleBar({ text, originalText, onClose }: SubtitleBarProps) {
  const [position, setPosition] = useState({ y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const opacity = Number(localStorage.getItem("afri_opacity") || 0.9);
  const fontSize = Number(localStorage.getItem("afri_font_size") || 16);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: position.y, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      drag="y"
      dragConstraints={{ top: -500, bottom: 50 }}
      onDragEnd={(_, info) => setPosition(p => ({ y: p.y + info.offset.y }))}
      className="fixed bottom-28 left-4 right-4 z-[100] cursor-grab active:cursor-grabbing"
    >
      <div 
        className="glass-card rounded-2xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        style={{ opacity }}
      >
        <div className="bg-neutral-900/80 px-4 py-2 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-neutral-600" />
            <span className="text-[10px] font-bold text-afri-gold uppercase tracking-tighter">AfriTranslate Live</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-neutral-500">
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <button onClick={onClose} className="text-neutral-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-black/40 backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
              style={{ fontSize: `${fontSize}px` }}
            >
              <p className="font-bold text-white leading-snug drop-shadow-md">
                {text || "Listening for speech..."}
              </p>
              
              {isExpanded && originalText && (
                <motion.p 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 0.6 }}
                  className="text-[12px] text-neutral-400 mt-2 italic border-t border-neutral-800 pt-2"
                >
                  {originalText}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Visual cue for dragging */}
      <div className="w-12 h-1 bg-neutral-800/50 rounded-full mx-auto mt-2" />
    </motion.div>
  );
}