export const AFRICAN_LANGUAGES = [
  { code: "tw", name: "Twi", region: "Ghana" },
  { code: "yo", name: "Yoruba", region: "Nigeria" },
  { code: "ha", name: "Hausa", region: "Nigeria/Niger" },
  { code: "ig", name: "Igbo", region: "Nigeria" },
  { code: "zu", name: "Zulu", region: "South Africa" },
  { code: "sw", name: "Swahili", region: "East Africa" },
  { code: "am", name: "Amharic", region: "Ethiopia" },
  { code: "wo", name: "Wolof", region: "Senegal/Gambia" },
];

export const GLOBAL_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "tr", name: "Turkish" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
];

export const ALL_LANGUAGES = [...AFRICAN_LANGUAGES, ...GLOBAL_LANGUAGES];

export const APP_CONFIG = {
  FREE_MINUTES_PER_DAY: 30,
  PRO_PRICE_MONTHLY: 4,
};