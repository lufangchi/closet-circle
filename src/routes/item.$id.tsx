import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, ShieldCheck, Star, MapPin, Clock, Ruler, Info } from "lucide-react";
import { toast } from "sonner";
import { getItem, getUser, priceRental, pickupSpots, compatibility, users, ME } from "@/lib/data";
import { useStore } from "@/lib/store";
import { isVerified } from "@/lib/community";
import { Avatar, HeartButton, btn, btnGhost, input } from "@/components/ui-kit";

export const Route = createFileRoute("/item/$id")({
  loader: ({ params }) => { const item = getItem(params.id); if (!item) throw notFound(); return { title: item.title, desc: item.description }; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Item"} — Closet Circle` },
    { name: "description", content: loaderData?.desc ?? "Rent this piece from a neighbor." },
    { property: "og:title", content: `${loaderData?.title ?? "Item"} — Closet Circle` },
    { property: "og:description", content: loaderData?.desc ?? "Rent this piece from a neighbor." },
  ] }),
  component: ItemPage,
});

function ItemPage() {
  const { id } = Route.useParams();
  const store = useStore();
  const item = store.allItems.find((i) => i.id === id)!;
  const owner = getUser(item.ownerId);
  const nav = useNavigate();
  const [start, setStart] = useState("2026-11-20");
  const [end, setEnd] = useState("2026-11-22");
  const [pickup, setPickup] = useState<string>(pickupSpots[0]!);
  const [usePts, setUsePts] = useState(false);
  const pts = usePts ? Math.floor(store.points / 100) * 100 : 0;
  const p = priceRental(item, start, end, pts);
  const blocked = item.blockedDates.some((d) => d >= start && d <= end);
  const isSoul = store.soulmates.includes(owner.id);
  const match = compatibility(users.find((u) => u.id === ME)!, owner);

  const request = () => {
    const rid = store.requestRental({ itemId: item.id, ownerId: owner.id, start, end, pickup, pointsUsed: p.discount * 10 });
    toast.success("Request sent to " + owner.name);
    nav({ to: "/rentals/$id", params: { id: rid } });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full rounded-3xl object-cover" />
        <HeartButton active={store.favorites.includes(item.id)} onClick={() => store.toggleFav(item.id)} className="absolute right-4 top-4" />
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.brand} · {item.category}</p>
          <h1 className="text-4xl font-semibold">{item.title}</h1>
          <p className="mt-2 text-muted-foreground">{item.description}</p>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{owner.neighborhood}, {owner.zip} · {item.distance} mi away (exact spot shared after confirmation)</p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <Link to="/user/$id" params={{ id: owner.id }}><Avatar id={owner.id} size={52} /></Link>
          <div className="flex-1 text-sm">
            <Link to="/user/$id" params={{ id: owner.id }} className="font-medium">{owner.name}</Link>
            <p className="flex items-center gap-2 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-current" />{owner.rating} ({owner.reviews}) · {owner.responseRate}% response · <Clock className="h-3 w-3" />{owner.responseTime}</p>
            <p className="text-xs text-accent-foreground">{match}% style match</p>
          </div>
          <button onClick={() => { store.toggleSoulmate(owner.id); if (!isSoul) toast.success(`${owner.name} saved as a Closet Soulmate`); }} className={isSoul ? btnGhost : btn}>{isSoul ? "Soulmate ✓" : "Save Soulmate"}</button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-muted p-4">
            <p className="mb-2 flex items-center gap-1 font-medium"><Ruler className="h-4 w-4" />Measurements · Size {item.size}</p>
            {Object.entries(item.measurements).map(([k, v]) => <p key={k} className="flex justify-between text-muted-foreground"><span>{k}</span><span>{v}</span></p>)}
          </div>
          <div className="rounded-2xl bg-muted p-4 text-muted-foreground">
            <p className="mb-2 font-medium text-foreground">Condition</p>
            <p>{item.condition}</p><p>Flaws: {item.flaws}</p><p>Retail ${item.retail}</p><p>Notice: {item.minNotice}</p>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-muted-foreground">Pick up<input type="date" className={input} value={start} onChange={(e) => setStart(e.target.value)} /></label>
            <label className="text-xs text-muted-foreground">Return<input type="date" className={input} value={end} min={start} onChange={(e) => setEnd(e.target.value)} /></label>
          </div>
          <label className="block text-xs text-muted-foreground">Public meetup spot<select className={input} value={pickup} onChange={(e) => setPickup(e.target.value)}>{pickupSpots.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={usePts} onChange={(e) => setUsePts(e.target.checked)} />Use reward points ({store.points} pts)</label>
          <div className="space-y-1 border-t border-border pt-3 text-sm">
            <Row l={`$${item.dailyRate} × ${p.days} days`} r={p.rental} />
            <Row l="Cleaning fee" r={p.cleaning} />
            {p.discount > 0 && <Row l="Points discount" r={-p.discount} />}
            <Row l="Refundable deposit" r={p.deposit} />
            <Row l="Due at confirmation" r={p.total} bold />
          </div>
          {blocked && <p className="text-xs text-destructive">Some of these dates are blocked by the owner.</p>}
          <button disabled={blocked} onClick={request} className={btn + " w-full"}>Request to rent</button>
          <p className="flex gap-1 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0" />Free cancellation up to 48h before pickup. Condition photos at pickup & return; normal wear is never charged.</p>
          <p className="flex gap-1 text-xs text-muted-foreground"><Info className="h-4 w-4 shrink-0" />Fit guidance uses the owner's measurements. AI try-on is coming soon and is illustrative only.</p>
        </div>
      </div>
      <VisualReviews itemId={item.id} />
    </div>
  );
}

function VisualReviews({ itemId }: { itemId: string }) {
  const store = useStore();
  const looks = store.allPosts.filter((p) => p.itemId === itemId && isVerified(p, store.myCompleted));
  if (!looks.length) return null;
  return (
    <section className="md:col-span-2">
      <h2 className="mb-3 text-3xl">Worn by renters</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{looks.map((p) => (
        <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card">
          <img src={p.image} alt={p.caption} className="aspect-[3/4] w-full object-cover" loading="lazy" />
          <div className="space-y-1 p-3 text-xs"><p className="flex items-center gap-1 font-medium"><BadgeCheck className="h-3 w-3" />Verified Rental · {p.userId === ME ? "You" : getUser(p.userId).name}</p><p>{p.caption}</p>{p.review && <p className="text-muted-foreground">Condition {p.review.condition}/5 · As described {p.review.accuracy}/5 · Exchange {p.review.experience}/5</p>}</div>
        </div>))}</div>
    </section>
  );
}
const Row = ({ l, r, bold }: { l: string; r: number; bold?: boolean }) => (
  <p className={"flex justify-between " + (bold ? "pt-1 font-semibold" : "text-muted-foreground")}><span>{l}</span><span>{r < 0 ? "−" : ""}${Math.abs(r)}</span></p>
);
