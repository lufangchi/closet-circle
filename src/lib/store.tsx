import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { seedPosts, isVerified, postPoints, type Post } from "./community";
import { ME, seedRentals, type Rental, type RentalStatus, type Item, items as seedItems } from "./data";

type State = { favorites: string[]; soulmates: string[]; rentals: Rental[]; points: number; myItems: Item[]; requests: string[]; likedPosts: string[]; savedPosts: string[]; myPosts: Post[]; skipped: string[] };
const initial: State = { likedPosts: [], savedPosts: [], myPosts: [], skipped: [], favorites: [], soulmates: [], rentals: seedRentals, points: 120, myItems: [], requests: [] };

type Ctx = State & {
  toggleFav: (id: string) => void; toggleSoulmate: (id: string) => void;
  requestRental: (r: Omit<Rental, "id" | "status" | "messages" | "renterId">) => string;
  setStatus: (id: string, s: RentalStatus) => void; sendMessage: (id: string, text: string) => void;
  review: (id: string) => void; addItem: (i: Item) => void; postRequest: (t: string) => void; allItems: Item[];
  allPosts: Post[]; earned: number; myCompleted: string[]; toggleLike: (id: string) => void; toggleSavePost: (id: string) => void; addPost: (p: Post) => void; skipPerson: (id: string) => void;
};
const C = createContext<Ctx | null>(null);
const KEY = "closet-circle-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, set] = useState<State>(initial);
  useEffect(() => { try { const v = localStorage.getItem(KEY); if (v) set({ ...initial, ...JSON.parse(v) }); } catch {} }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(s)); }, [s]);
  const tog = (arr: string[], id: string) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  const upd = (id: string, f: (r: Rental) => Rental) => set((p) => ({ ...p, rentals: p.rentals.map((r) => (r.id === id ? f(r) : r)) }));
  const myCompleted = s.rentals.filter((r) => r.status === "Completed" && r.renterId === ME).map((r) => r.id);
  const allPosts = [...s.myPosts, ...seedPosts];
  const earned = s.myPosts.reduce((a, p) => a + postPoints(p, isVerified(p, myCompleted), false, false), 0);
  const ctx: Ctx = {
    ...s, points: s.points + earned, earned, myCompleted, allPosts,
    toggleLike: (id) => set((p) => ({ ...p, likedPosts: tog(p.likedPosts, id) })),
    toggleSavePost: (id) => set((p) => ({ ...p, savedPosts: tog(p.savedPosts, id) })),
    addPost: (post) => set((p) => ({ ...p, myPosts: [post, ...p.myPosts] })),
    skipPerson: (id) => set((p) => ({ ...p, skipped: [...p.skipped, id] })),
    allItems: [...s.myItems, ...seedItems],
    toggleFav: (id) => set((p) => ({ ...p, favorites: tog(p.favorites, id) })),
    toggleSoulmate: (id) => set((p) => ({ ...p, soulmates: tog(p.soulmates, id) })),
    requestRental: (r) => {
      const id = "r" + Date.now();
      set((p) => ({ ...p, points: p.points - (r.pointsUsed ?? 0), rentals: [{ ...r, id, renterId: ME, status: "Requested", messages: [] }, ...p.rentals] }));
      return id;
    },
    setStatus: (id, status) => upd(id, (r) => ({ ...r, status })),
    sendMessage: (id, text) => upd(id, (r) => ({ ...r, messages: [...r.messages, { from: ME, text, at: "now" }] })),
    review: (id) => { upd(id, (r) => ({ ...r, reviewed: true })); set((p) => ({ ...p, points: p.points + 50 })); },
    addItem: (i) => set((p) => ({ ...p, myItems: [i, ...p.myItems] })),
    postRequest: (t) => set((p) => ({ ...p, requests: [t, ...p.requests] })),
  };
  return <C.Provider value={ctx}>{children}</C.Provider>;
}
export const useStore = () => useContext(C)!;
