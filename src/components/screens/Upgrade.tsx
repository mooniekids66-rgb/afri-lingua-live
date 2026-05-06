import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, ShieldCheck, Star } from "lucide-react";
import { toast } from "sonner";

export default function Upgrade() {
  const handleUpgrade = () => {
    toast.info("Connecting to secure checkout...", {
      description: "Redirecting to Stripe",
    });
    // In a real app, this would trigger Stripe Checkout
  };

  return (
    <div className="p-6 flex flex-col min-h-full">
      <header className="text-center mb-10 pt-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-afri-gold/10 text-afri-gold mb-4">
          <Crown className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Go Pro</h1>
        <p className="text-neutral-400">Unlock unlimited real-time translation</p>
      </header>

      <div className="space-y-6 flex-1">
        <PricingCard 
          tier="Free"
          price="$0"
          features={[
            "30 mins/day translation",
            "8 African languages",
            "Standard speed",
          ]}
          active
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-afri-gold text-neutral-950 text-[10px] font-bold px-3 py-1 rounded-full z-10 uppercase tracking-widest shadow-lg">
            Recommended
          </div>
          <PricingCard 
            tier="Pro"
            price="$4"
            period="/month"
            features={[
              "Unlimited translation 24/7",
              "All 50+ Global languages",
              "Priority AI processing",
              "No daily limits",
              "Custom subtitle styles",
            ]}
            highlight
            onUpgrade={handleUpgrade}
          />
        </motion.div>
      </div>

      <footer className="mt-12 text-center pb-8">
        <div className="flex items-center justify-center gap-6 mb-6">
          <TrustIcon icon={<ShieldCheck />} label="Secure" />
          <TrustIcon icon={<Zap />} label="Instant" />
          <TrustIcon icon={<Star />} label="5-Star" />
        </div>
        <p className="text-[10px] text-neutral-600 px-8">
          By upgrading, you support local African developers and the advancement of language technology for the continent.
        </p>
      </footer>
    </div>
  );
}

function PricingCard({ 
  tier, 
  price, 
  period = "", 
  features, 
  highlight, 
  active,
  onUpgrade 
}: { 
  tier: string; 
  price: string; 
  period?: string; 
  features: string[]; 
  highlight?: boolean;
  active?: boolean;
  onUpgrade?: () => void;
}) {
  return (
    <div className={`rounded-[32px] p-6 border-2 transition-all ${highlight ? 'bg-gradient-to-br from-neutral-900 to-afri-green/10 border-afri-gold/50 shadow-2xl shadow-afri-gold/5' : 'bg-neutral-900/40 border-neutral-800'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`font-bold ${highlight ? 'text-afri-gold' : 'text-neutral-400'}`}>{tier}</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold">{price}</span>
            <span className="text-sm text-neutral-500">{period}</span>
          </div>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <Check className={`w-4 h-4 ${highlight ? 'text-afri-gold' : 'text-afri-green'}`} />
            <span className="text-neutral-300">{f}</span>
          </li>
        ))}
      </ul>

      {active ? (
        <Button disabled className="w-full bg-neutral-800 text-neutral-500 rounded-2xl h-12 font-bold">
          Current Plan
        </Button>
      ) : (
        <Button 
          onClick={onUpgrade}
          className={`w-full rounded-2xl h-14 font-extrabold text-lg shadow-xl ${highlight ? 'bg-afri-gold hover:bg-afri-gold/90 text-neutral-950' : 'bg-white hover:bg-neutral-200 text-neutral-950'}`}
        >
          Get Started
        </Button>
      )}
    </div>
  );
}

function TrustIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-neutral-700">{icon}</div>
      <span className="text-[10px] font-bold text-neutral-700 uppercase">{label}</span>
    </div>
  );
}