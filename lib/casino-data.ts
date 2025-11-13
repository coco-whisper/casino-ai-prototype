export interface Casino {
  id: string;
  name: string;
  logo: string;
  rating: number;
  bonuses: string[];
  countries: string[];
  payments: string[];
  gameTypes: string[];
  bonusTypes: string[];
  providers: string[];
  description: string;
  verified: boolean;
  featured: boolean;
}

export const casinos: Casino[] = [
  {
    id: "1",
    name: "Lucky Spin Casino",
    logo: "/casino-logo-lucky.jpg",
    rating: 4.8,
    bonuses: ["100% up to $1000", "Free Credit Casinos", "50 Free Spins"],
    countries: ["USA", "UK", "Canada", "Germany"],
    payments: ["USDT", "BITCOIN", "ETHERIUM", "VISA", "PAYPAL"],
    gameTypes: ["Slots", "Live Casino", "Sports", "Poker"],
    bonusTypes: [
      "Welcome Bonus",
      "Free Credit Casinos",
      "Reload",
      "Crypto Deposit Bonus",
    ],
    providers: ["PG Soft", "Pragmatic Play", "Evolution"],
    description:
      "Premium casino with top-tier games and massive welcome bonuses.",
    verified: true,
    featured: true,
  },
  {
    id: "2",
    name: "Golden Dice Gaming",
    logo: "/casino-logo-golden-dice.jpg",
    rating: 4.6,
    bonuses: ["200% up to $2000", "No Deposit Bonus $25"],
    countries: ["USA", "Canada", "Australia", "New Zealand"],
    payments: ["BITCOIN", "ETHERIUM", "USDT", "BANK"],
    gameTypes: ["Slots", "Live Casino", "Esports", "Fishing Games"],
    bonusTypes: ["Welcome Bonus", "No Deposit Bonus", "Cashback Bonus", "VIP"],
    providers: ["JILI", "Pragmatic Play", "PG Soft"],
    description:
      "Crypto-friendly casino with extensive esports betting options.",
    verified: true,
    featured: true,
  },
  {
    id: "3",
    name: "Diamond Crown Casino",
    logo: "/casino-logo-diamond.jpg",
    rating: 4.9,
    bonuses: ["$3000 Welcome Package", "20% Cashback"],
    countries: ["UK", "Germany", "France", "Spain"],
    payments: ["VISA", "PAYPAL", "BANK", "BITCOIN"],
    gameTypes: ["Live Casino", "Slots", "Sports", "Lottery"],
    bonusTypes: ["Welcome Bonus", "Cashback Bonus", "Daily Bonus", "VIP"],
    providers: ["Evolution", "Pragmatic Play", "PG Soft"],
    description: "Luxury casino experience with VIP rewards and live dealers.",
    verified: true,
    featured: true,
  },
  {
    id: "4",
    name: "Neon Jackpot",
    logo: "/neon-casino-logo.jpg",
    rating: 4.5,
    bonuses: ["150% up to $1500", "100 Free Spins"],
    countries: ["USA", "Canada", "Mexico"],
    payments: ["USDT", "BITCOIN", "ETHERIUM"],
    gameTypes: ["Slots", "Poker", "Sports", "Esports"],
    bonusTypes: ["Welcome Bonus", "Reload", "Crypto Deposit Bonus"],
    providers: ["JILI", "PG Soft", "Pragmatic Play"],
    description: "Fast withdrawals and crypto-exclusive bonuses.",
    verified: true,
    featured: false,
  },
  {
    id: "5",
    name: "Royal Flush Palace",
    logo: "/royal-casino-logo.jpg",
    rating: 4.7,
    bonuses: ["$2500 Bonus + 200 Free Spins"],
    countries: ["UK", "Canada", "Australia", "Germany"],
    payments: ["VISA", "PAYPAL", "BANK", "BITCOIN", "USDT"],
    gameTypes: ["Poker", "Live Casino", "Slots", "Sports"],
    bonusTypes: ["Welcome Bonus", "VIP", "Daily Bonus", "Cashback Bonus"],
    providers: ["Evolution", "Pragmatic Play"],
    description: "World-class poker rooms and exclusive VIP treatment.",
    verified: true,
    featured: false,
  },
  {
    id: "6",
    name: "Cyber Slots Arena",
    logo: "/cyber-casino-logo.jpg",
    rating: 4.4,
    bonuses: ["50 No Deposit Spins", "100% Match Bonus"],
    countries: ["USA", "Canada", "UK"],
    payments: ["BITCOIN", "ETHERIUM", "USDT"],
    gameTypes: ["Slots", "Esports", "Fishing Games"],
    bonusTypes: ["No Deposit Bonus", "Welcome Bonus", "Free Credit Casinos"],
    providers: ["JILI", "PG Soft"],
    description: "Next-gen gaming platform with cutting-edge slot games.",
    verified: false,
    featured: false,
  },
];

export const filterOptions = {
  countries: ["Australia", "Bangladesh", "Brazil", "Canada"],
  payments: ["USDT", "BITCOIN", "ETHERIUM", "BANK", "VISA", "PAYPAL"],
  gameTypes: [
    "Slots",
    "Live Casino",
    "Sports",
    "Esports",
    "Fishing Games",
    "Poker",
    "Lottery",
  ],
  bonusTypes: [
    "Welcome Bonus",
    "No Deposit Bonus",
    "Free Credit Casinos",
    "Cashback Bonus",
    "Reload",
    "Daily Bonus",
    "VIP",
    "Crypto Deposit Bonus",
  ],
  providers: ["PG Soft", "Pragmatic Play", "JILI", "Evolution"],
};
