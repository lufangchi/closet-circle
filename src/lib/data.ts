import sage from "@/assets/item-sage-dress.jpg";
import blush from "@/assets/item-blush-dress.jpg";
import bag from "@/assets/item-handbag.jpg";
import blazer from "@/assets/item-blazer.jpg";
import heels from "@/assets/item-heels.jpg";
import floral from "@/assets/item-floral.jpg";
import maya from "@/assets/avatar-maya.jpg";
import lena from "@/assets/avatar-lena.jpg";

export type User = {
  id: string; name: string; avatar: string; bio: string; zip: string; neighborhood: string;
  styleTags: string[]; size: string; rating: number; reviews: number; responseRate: number; responseTime: string; points: number;
};
export type Item = {
  id: string; ownerId: string; title: string; brand: string; category: "Dress" | "Bag" | "Shoes" | "Suit" | "Jewelry";
  size: string; image: string; dailyRate: number; deposit: number; retail: number; cleaningFee: number;
  occasions: string[]; styleTags: string[]; condition: string; flaws: string; distance: number;
  measurements: Record<string, string>; blockedDates: string[]; minNotice: string; description: string;
};
export type RentalStatus = "Requested" | "Confirmed" | "Picked Up" | "Returned" | "Completed" | "Declined";
export type Rental = {
  id: string; itemId: string; renterId: string; ownerId: string; start: string; end: string; status: RentalStatus;
  pickup: string; messages: { from: string; text: string; at: string }[]; reviewed?: boolean; pointsUsed?: number;
};

export const ME = "me";

export const users: User[] = [
  { id: ME, name: "Fangchi", avatar: "", bio: "Weekend brunches, gallery openings, and a soft spot for silk.", zip: "94110", neighborhood: "Mission", styleTags: ["Minimal", "Romantic", "Silk"], size: "S", rating: 4.9, reviews: 6, responseRate: 98, responseTime: "within 1 hr", points: 120 },
  { id: "maya", name: "Maya R.", avatar: maya, bio: "Stylist by day. My closet is your closet — especially for weddings.", zip: "94110", neighborhood: "Bernal Heights", styleTags: ["Romantic", "Silk", "Minimal", "Evening"], size: "S", rating: 4.95, reviews: 42, responseRate: 100, responseTime: "within 30 min", points: 860 },
  { id: "lena", name: "Lena K.", avatar: lena, bio: "Tailoring obsessive. Power suits & quiet luxury accessories.", zip: "94103", neighborhood: "SoMa", styleTags: ["Tailored", "Minimal", "Quiet luxury"], size: "S", rating: 4.88, reviews: 27, responseRate: 96, responseTime: "within 2 hrs", points: 540 },
  { id: "ines", name: "Inès D.", avatar: floral, bio: "Vintage florals and garden parties forever.", zip: "94114", neighborhood: "Noe Valley", styleTags: ["Vintage", "Romantic", "Boho"], size: "M", rating: 4.8, reviews: 15, responseRate: 91, responseTime: "within 3 hrs", points: 310 },
];

export const items: Item[] = [
  { id: "sage-slip", ownerId: "maya", title: "Sage Silk Slip Midi", brand: "Reformation", category: "Dress", size: "S", image: sage, dailyRate: 28, deposit: 80, retail: 248, cleaningFee: 12, occasions: ["Wedding", "Cocktail", "Date night"], styleTags: ["Silk", "Minimal", "Romantic"], condition: "Excellent", flaws: "None noted", distance: 0.8, measurements: { Bust: "33 in", Waist: "26 in", Hips: "36 in", Length: "47 in" }, blockedDates: ["2026-11-27", "2026-11-28"], minNotice: "1 day", description: "Bias-cut silk that skims beautifully. A dream for garden and evening weddings." },
  { id: "blush-pleat", ownerId: "maya", title: "Blush Pleated Chiffon Gown", brand: "Self-Portrait", category: "Dress", size: "S", image: blush, dailyRate: 45, deposit: 120, retail: 495, cleaningFee: 15, occasions: ["Wedding", "Gala"], styleTags: ["Romantic", "Evening"], condition: "Like new", flaws: "Tiny pull at hem, inside", distance: 0.8, measurements: { Bust: "33 in", Waist: "25.5 in", Length: "58 in" }, blockedDates: [], minNotice: "2 days", description: "Floor-length pleated chiffon with a soft V. Photographs like a dream." },
  { id: "cream-bag", ownerId: "lena", title: "Cream Top-Handle Bag", brand: "Mulberry", category: "Bag", size: "One size", image: bag, dailyRate: 22, deposit: 150, retail: 890, cleaningFee: 0, occasions: ["Wedding", "Work", "Cocktail"], styleTags: ["Quiet luxury", "Minimal"], condition: "Excellent", flaws: "Light wear on base corners", distance: 1.9, measurements: { Width: "9 in", Height: "6.5 in" }, blockedDates: [], minNotice: "1 day", description: "Structured calf leather with gold hardware. Pearl studs included on request." },
  { id: "black-suit", ownerId: "lena", title: "Black Tailored Suit Set", brand: "The Frankie Shop", category: "Suit", size: "S", image: blazer, dailyRate: 32, deposit: 100, retail: 420, cleaningFee: 14, occasions: ["Work", "Gala", "Interview"], styleTags: ["Tailored", "Minimal"], condition: "Excellent", flaws: "None noted", distance: 1.9, measurements: { Shoulder: "15.5 in", Waist: "27 in", Inseam: "31 in" }, blockedDates: [], minNotice: "1 day", description: "Relaxed single-breasted blazer with matching wide-leg trousers." },
  { id: "nude-heels", ownerId: "maya", title: "Nude Strappy Sandals", brand: "Stuart Weitzman", category: "Shoes", size: "7", image: heels, dailyRate: 15, deposit: 60, retail: 425, cleaningFee: 0, occasions: ["Wedding", "Cocktail", "Date night"], styleTags: ["Minimal", "Evening"], condition: "Good", flaws: "Light sole wear", distance: 0.8, measurements: { Heel: "3.5 in", Fit: "True to size" }, blockedDates: [], minNotice: "1 day", description: "Pairs with everything. Walkable for a full reception." },
  { id: "floral-sun", ownerId: "ines", title: "Ditsy Floral Linen Sundress", brand: "Doen", category: "Dress", size: "M", image: floral, dailyRate: 20, deposit: 60, retail: 298, cleaningFee: 10, occasions: ["Brunch", "Garden party", "Wedding"], styleTags: ["Vintage", "Romantic", "Boho"], condition: "Excellent", flaws: "None noted", distance: 2.6, measurements: { Bust: "35 in", Waist: "28 in", Length: "48 in" }, blockedDates: [], minNotice: "1 day", description: "Sweetheart neckline, swishy skirt, actual pockets." },
];

export const seedRentals: Rental[] = [
  { id: "r1", itemId: "black-suit", renterId: ME, ownerId: "lena", start: "2026-10-20", end: "2026-10-22", status: "Completed", pickup: "Blue Bottle, Mint Plaza", messages: [{ from: "lena", text: "Hope the interview went well!", at: "Oct 22" }], reviewed: true },
  { id: "r2", itemId: "floral-sun", renterId: ME, ownerId: "ines", start: "2026-11-21", end: "2026-11-22", status: "Confirmed", pickup: "Noe Valley Library steps", messages: [{ from: "ines", text: "Confirmed! It's freshly pressed.", at: "Nov 12" }] },
];


export const getUser = (id: string) => users.find((u) => u.id === id)!;
export const getItem = (id: string) => items.find((i) => i.id === id);

/** Style compatibility: % overlap of style tags (Jaccard), boosted by same size. */
export function compatibility(a: User, b: User) {
  const A = new Set(a.styleTags), B = new Set(b.styleTags);
  const inter = [...A].filter((t) => B.has(t)).length;
  const union = new Set([...A, ...B]).size || 1;
  return Math.min(99, Math.round((inter / union) * 85 + (a.size === b.size ? 15 : 0)));
}

export type Pricing = { days: number; rental: number; cleaning: number; deposit: number; discount: number; total: number };
/** Days are inclusive. 100 points = $10 discount, capped at the rental subtotal. */
export function priceRental(item: Item, start: string, end: string, points = 0): Pricing {
  const days = Math.max(1, Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1);
  const rental = days * item.dailyRate;
  const discount = Math.min(rental, Math.floor(points / 100) * 10);
  return { days, rental, cleaning: item.cleaningFee, deposit: item.deposit, discount, total: rental + item.cleaningFee + item.deposit - discount };
}

export type RecCtx = { soulmates: string[]; favorites: string[]; savedPostItems: string[] };
export type Rec = { item: Item; score: number; reasons: string[] };
/** Two-step demo ranking: hard eligibility (size, budget for 2 days, date, ≤5 mi), then score. Saves visibly boost rank. */
export function recommend(q: { occasion: string; size: string; budget: number; date?: string }, ctx: RecCtx, pool: Item[] = items): Rec[] {
  return pool
    .filter((i) => (!q.size || i.size === q.size || i.size === "One size" || i.category === "Shoes")
      && (!q.budget || i.dailyRate * 2 <= q.budget)
      && (!q.date || !i.blockedDates.includes(q.date))
      && i.distance <= 5)
    .map((i) => {
      let s = 0; const reasons: string[] = [];
      if (q.occasion && i.occasions.some((o) => o.toLowerCase().includes(q.occasion.toLowerCase()))) s += 5;
      if (ctx.favorites.includes(i.id)) { s += 6; reasons.push("On your wishlist"); }
      if (ctx.savedPostItems.includes(i.id)) { s += 5; reasons.push("From a saved post"); }
      if (ctx.soulmates.includes(i.ownerId)) { s += 4; reasons.push("From your Closet Soulmate"); }
      s += Math.max(0, 3 - i.distance);
      return { item: i, score: s, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

export const pickupSpots = ["Ritual Coffee, Valencia St", "Bernal Heights Library", "Mission Dry Cleaners (partner, demo)", "Dolores Park, 18th St entrance"];
