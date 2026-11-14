import { items, users, ME, getItem, type User } from "./data";
import sage from "@/assets/item-sage-dress.jpg";
import blush from "@/assets/item-blush-dress.jpg";
import bag from "@/assets/item-handbag.jpg";
import blazer from "@/assets/item-blazer.jpg";
import heels from "@/assets/item-heels.jpg";
import floral from "@/assets/item-floral.jpg";
import street from "@/assets/split-street.jpg";
import field from "@/assets/split-field.jpg";
import archTeal from "@/assets/arch-teal.jpg";
import archYellow from "@/assets/arch-yellow.jpg";

export type PostKind = "rented" | "closet";
export type Post = {
  id: string; userId: string; kind: PostKind; image: string; caption: string; itemId: string;
  styleTags: string[]; occasion: string; rentalId?: string;
  review?: { condition: number; accuracy: number; experience: number };
  likes: number; saves: number; // seeded engagement from other accounts
};

/** Completed rentals by other neighbors — used to verify "I rented this" posts. */
export const communityRentals = [
  { id: "cr1", itemId: "sage-slip", renterId: "ines", status: "Completed" },
  { id: "cr2", itemId: "cream-bag", renterId: "maya", status: "Completed" },
  { id: "cr3", itemId: "floral-sun", renterId: "maya", status: "Completed" },
  { id: "cr4", itemId: "nude-heels", renterId: "lena", status: "Completed" },
];

export const seedPosts: Post[] = [
  { id: "p1", userId: "ines", kind: "rented", rentalId: "cr1", image: sage, itemId: "sage-slip", caption: "Wore Maya's sage slip to a Sonoma garden wedding. Fit exactly like the measurements said.", styleTags: ["Silk", "Minimal", "Romantic"], occasion: "Wedding Guest", review: { condition: 5, accuracy: 5, experience: 5 }, likes: 14, saves: 6 },
  { id: "p2", userId: "maya", kind: "closet", image: blush, itemId: "blush-pleat", caption: "How I style my blush chiffon: pearl studs, bare shoulders, nothing else.", styleTags: ["Romantic", "Evening"], occasion: "Wedding Guest", likes: 32, saves: 11 },
  { id: "p3", userId: "maya", kind: "rented", rentalId: "cr2", image: street, itemId: "cream-bag", caption: "Lena's Mulberry bag made my linen blazer look expensive. Spotless condition, quick handoff.", styleTags: ["Quiet luxury", "Minimal"], occasion: "Work", review: { condition: 5, accuracy: 5, experience: 5 }, likes: 9, saves: 4 },
  { id: "p4", userId: "lena", kind: "closet", image: blazer, itemId: "black-suit", caption: "Suit set for graduation photos — add white sneakers to soften it.", styleTags: ["Tailored", "Minimal"], occasion: "Graduation Photos", likes: 21, saves: 8 },
  { id: "p5", userId: "maya", kind: "rented", rentalId: "cr3", image: field, itemId: "floral-sun", caption: "Inès's floral sundress + my pink knit for a windy picnic. Pockets!", styleTags: ["Vintage", "Romantic", "Boho"], occasion: "Brunch", review: { condition: 5, accuracy: 4, experience: 5 }, likes: 11, saves: 3 },
  { id: "p6", userId: "ines", kind: "closet", image: floral, itemId: "floral-sun", caption: "Garden party season isn't over in SF. Linen forever.", styleTags: ["Vintage", "Boho"], occasion: "Brunch", likes: 18, saves: 5 },
  { id: "p7", userId: "lena", kind: "rented", rentalId: "cr4", image: heels, itemId: "nude-heels", caption: "Maya's sandals lasted a full reception. Light sole wear, exactly as listed.", styleTags: ["Minimal", "Evening"], occasion: "Wedding Guest", review: { condition: 4, accuracy: 5, experience: 5 }, likes: 7, saves: 2 },
  { id: "p8", userId: "lena", kind: "closet", image: bag, itemId: "cream-bag", caption: "Quiet luxury, loud compliments.", styleTags: ["Quiet luxury"], occasion: "Work", likes: 25, saves: 9 },
  { id: "p9", userId: "maya", kind: "closet", image: archTeal, itemId: "sage-slip", caption: "Same sage slip, office edition: white shirt layered on top.", styleTags: ["Minimal", "Silk"], occasion: "Work", likes: 16, saves: 7 },
  { id: "p10", userId: "ines", kind: "closet", image: archYellow, itemId: "floral-sun", caption: "Florals on florals. Ask me about the matching sundress.", styleTags: ["Vintage", "Boho"], occasion: "Brunch", likes: 12, saves: 4 },
];

export const isVerified = (p: Post, myCompleted: string[]) =>
  p.kind === "rented" && !!p.rentalId && (communityRentals.some((r) => r.id === p.rentalId && r.status === "Completed") || myCompleted.includes(p.rentalId));

/** Points rule: verified rental posts only. Like = 1 pt, save = 3 pts, capped at 50 per post. Self-engagement never counts. */
export const LIKE_PTS = 1, SAVE_PTS = 3, POST_CAP = 50;
export function postPoints(p: Post, verified: boolean, likedByMe: boolean, savedByMe: boolean) {
  if (!verified) return 0;
  const self = p.userId === ME;
  const likes = p.likes + (likedByMe && !self ? 1 : 0);
  const saves = p.saves + (savedByMe && !self ? 1 : 0);
  return Math.min(POST_CAP, likes * LIKE_PTS + saves * SAVE_PTS);
}

export type Taste = { likedPosts: string[]; savedPosts: string[]; favorites: string[]; soulmates: string[] };
/** Weighted tag profile: own style tags, then tags of liked (1) and saved (2) posts and saved items (2). */
export function tasteTags(me: User, all: Post[], t: Taste) {
  const w: Record<string, number> = {};
  const add = (tags: string[], n: number) => tags.forEach((x) => (w[x] = (w[x] ?? 0) + n));
  add(me.styleTags, 2);
  all.forEach((p) => { if (t.likedPosts.includes(p.id)) add(p.styleTags, 1); if (t.savedPosts.includes(p.id)) add(p.styleTags, 2); });
  items.forEach((i) => t.favorites.includes(i.id) && add(i.styleTags, 2));
  return w;
}
export function scorePost(p: Post, me: User, w: Record<string, number>, t: Taste) {
  let s = p.styleTags.reduce((a, x) => a + (w[x] ?? 0), 0);
  if (t.soulmates.includes(p.userId)) s += 6;
  if (t.favorites.includes(p.itemId)) s += 4;
  if (users.find((u) => u.id === p.userId)?.neighborhood === me.neighborhood) s += 1;
  return s + p.saves * 0.05;
}
export function recommendPeople(me: User, w: Record<string, number>, exclude: string[]) {
  return users.filter((u) => u.id !== ME && !exclude.includes(u.id)).map((u) => {
    const shared = u.styleTags.filter((x) => w[x]).sort((a, b) => (w[b] ?? 0) - (w[a] ?? 0));
    const reason = shared.length ? `You both save ${shared[0]!.toLowerCase()} looks` : `Lends nearby in ${u.neighborhood}`;
    return { u, reason, score: shared.reduce((a, x) => a + (w[x] ?? 0), 0), closet: items.filter((i) => i.ownerId === u.id) };
  }).sort((a, b) => b.score - a.score);
}
export const taggedItem = (p: Post) => getItem(p.itemId);
