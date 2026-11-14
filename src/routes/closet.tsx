import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";
import { ME, getUser, type Item } from "@/lib/data";
import { useStore } from "@/lib/store";
import { ItemCard, DemoTag, btn, input } from "@/components/ui-kit";

export const Route = createFileRoute("/closet")({
  head: () => ({ meta: [
    { title: "My Closet — Closet Circle" },
    { name: "description", content: "List your clothes, shoes and accessories for neighbors to rent." },
    { property: "og:title", content: "My Closet — Closet Circle" },
    { property: "og:description", content: "Manage your listings, availability and saved looks." },
  ] }),
  component: Closet,
});

const empty = { title: "", brand: "", category: "Dress" as Item["category"], size: "S", dailyRate: 20, deposit: 60, retail: 200, cleaningFee: 10, condition: "Excellent", flaws: "", description: "", bust: "", waist: "", length: "", tags: "", minNotice: "1 day" };

function Closet() {
  const { myItems, addItem, favorites, allItems } = useStore();
  const [f, setF] = useState(empty);
  const [img, setImg] = useState<string>("");
  const [ai, setAi] = useState(false);
  const [verified, setVerified] = useState(false);
  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const onFile = (file?: File) => { if (!file) return; const r = new FileReader(); r.onload = () => setImg(r.result as string); r.readAsDataURL(file); };
  const suggest = () => { setAi(true); setTimeout(() => { setF({ ...f, title: f.title || "Satin Midi Dress", category: "Dress", description: "Fluid satin midi with a flattering bias cut — perfect for weddings and evening events.", tags: "Silk, Minimal, Evening" }); setAi(false); toast("Suggestions added — please verify measurements yourself"); }, 800); };
  const submit = () => {
    if (!f.title || !img || !verified) return;
    addItem({ id: "my-" + Date.now(), ownerId: ME, title: f.title, brand: f.brand || "Unbranded", category: f.category, size: f.size, image: img, dailyRate: +f.dailyRate, deposit: +f.deposit, retail: +f.retail, cleaningFee: +f.cleaningFee,
      occasions: ["Wedding", "Cocktail"], styleTags: f.tags.split(",").map((t) => t.trim()).filter(Boolean), condition: f.condition, flaws: f.flaws || "None noted", distance: 0,
      measurements: Object.fromEntries([["Bust", f.bust], ["Waist", f.waist], ["Length", f.length]].filter(([, v]) => v)), blockedDates: [], minNotice: f.minNotice, description: f.description });
    setF(empty); setImg(""); setVerified(false); toast.success("Listed in your closet");
  };
  const saved = allItems.filter((i) => favorites.includes(i.id));

  return (
    <div className="space-y-10">
      <div><h1 className="text-4xl font-semibold">My Closet</h1><p className="text-muted-foreground">{getUser(ME).neighborhood} · {myItems.length} listed</p></div>
      <section className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-[240px_1fr]">
        <label className="grid aspect-[3/4] cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-muted text-sm text-muted-foreground">
          {img ? <img src={img} alt="" className="h-full w-full object-cover" /> : <span className="flex flex-col items-center gap-2"><Upload className="h-6 w-6" />Add photo</span>}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 sm:col-span-2"><button onClick={suggest} disabled={!img || ai} className={btn}><Sparkles className="h-4 w-4" />{ai ? "Analyzing…" : "AI-fill from photo"}</button><DemoTag /></div>
          <input className={input} placeholder="Title" value={f.title} onChange={set("title")} />
          <input className={input} placeholder="Brand" value={f.brand} onChange={set("brand")} />
          <select className={input} value={f.category} onChange={set("category")}>{["Dress", "Suit", "Bag", "Shoes", "Jewelry"].map((c) => <option key={c}>{c}</option>)}</select>
          <input className={input} placeholder="Size" value={f.size} onChange={set("size")} />
          <textarea className={input + " sm:col-span-2"} placeholder="Description" value={f.description} onChange={set("description")} />
          <input className={input} placeholder="Style tags (comma separated)" value={f.tags} onChange={set("tags")} />
          <input className={input} placeholder="Existing flaws" value={f.flaws} onChange={set("flaws")} />
          <div className="grid grid-cols-3 gap-2 sm:col-span-2">{(["bust", "waist", "length"] as const).map((k) => <input key={k} className={input} placeholder={`${k} (in)`} value={f[k]} onChange={set(k)} />)}</div>
          <div className="grid grid-cols-4 gap-2 sm:col-span-2 text-xs text-muted-foreground">
            {([["dailyRate", "$/day"], ["deposit", "Deposit"], ["retail", "Retail"], ["cleaningFee", "Cleaning"]] as const).map(([k, l]) => <label key={k}>{l}<input type="number" className={input} value={f[k]} onChange={set(k)} /></label>)}
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />I measured this item myself and the measurements are accurate</label>
          <button onClick={submit} disabled={!f.title || !img || !verified} className={btn + " sm:col-span-2"}>List item</button>
        </div>
      </section>
      {myItems.length > 0 && <section><h2 className="mb-4 text-3xl">Listed</h2><div className="columns-2 gap-4 md:columns-4">{myItems.map((i) => <ItemCard key={i.id} item={i} />)}</div></section>}
      <section><h2 className="mb-4 text-3xl">Saved pieces</h2>
        {saved.length ? <div className="columns-2 gap-4 md:columns-4">{saved.map((i) => <ItemCard key={i.id} item={i} />)}</div> : <p className="text-sm text-muted-foreground">Tap the heart on any piece to save it here.</p>}
      </section>
    </div>
  );
}
