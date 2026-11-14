import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Bookmark, BadgeCheck, Shirt, UserPlus, UserCheck, X, Plus, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { users, getUser, getItem, ME } from "@/lib/data";
import { isVerified, postPoints, tasteTags, scorePost, recommendPeople, POST_CAP, type Post } from "@/lib/community";
import { useStore } from "@/lib/store";
import { Avatar, Chip, btn, btnGhost, input } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [
    { title: "Community — Closet Circle" },
    { name: "description", content: "An outfit feed from your neighbors: verified rental looks, owner styling and Closet Soulmates." },
    { property: "og:title", content: "Community outfit feed — Closet Circle" },
    { property: "og:description", content: "Real looks from neighborhood rentals, styling ideas and style-matched neighbors." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Community,
});

const needs = ["All", "Wedding Guest", "Graduation Photos", "Brunch", "Work", "Under $40"];
const styles = ["Any style", "Romantic", "Minimal", "Silk", "Evening", "Tailored", "Quiet luxury", "Vintage", "Boho"];
const hoods = ["Anywhere", ...new Set(users.filter((u) => u.id !== ME).map((u) => u.neighborhood))];

function Community() {
  const s = useStore();
  const me = getUser(ME);
  const [tab, setTab] = useState<"foryou" | "saved">("foryou");
  const [need, setNeed] = useState("All");
  const [style, setStyle] = useState(styles[0]!);
  const [hood, setHood] = useState(hoods[0]!);
  const [composing, setComposing] = useState(false);
  const taste = { likedPosts: s.likedPosts, savedPosts: s.savedPosts, favorites: s.favorites, soulmates: s.soulmates };
  const w = tasteTags(me, s.allPosts, taste);

  const feed = useMemo(() => s.allPosts
    .filter((p) => tab === "foryou" || s.savedPosts.includes(p.id))
    .filter((p) => need === "All" || (need === "Under $40" ? (getItem(p.itemId)?.dailyRate ?? 99) < 40 : p.occasion === need))
    .filter((p) => style === styles[0] || p.styleTags.includes(style))
    .filter((p) => hood === hoods[0] || getUser(p.userId).neighborhood === hood)
    .sort((a, b) => (a.userId === ME ? -1 : b.userId === ME ? 1 : scorePost(b, me, w, taste) - scorePost(a, me, w, taste))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s.allPosts, tab, need, style, hood, s.likedPosts, s.savedPosts, s.favorites, s.soulmates]);

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl">Community</h1>
          <p className="text-muted-foreground">Real looks from neighborhood closets. Like, save, and find your Closet Soulmates.</p>
        </div>
        <button onClick={() => setComposing(!composing)} className={btn}><Plus className="h-4 w-4" />Share a look</button>
      </section>

      {composing && <Composer onDone={() => setComposing(false)} />}

      <Recommended w={w} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-full bg-muted p-1">
            {([["foryou", "For You"], ["saved", `Saved (${s.savedPosts.length})`]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={cn("rounded-full px-4 py-1.5 text-sm", tab === k ? "bg-card shadow-soft" : "text-muted-foreground")}>{l}</button>
            ))}
          </div>
          <select aria-label="Style" className={input + " w-auto py-1.5"} value={style} onChange={(e) => setStyle(e.target.value)}>{styles.map((x) => <option key={x}>{x}</option>)}</select>
          <select aria-label="Neighborhood" className={input + " w-auto py-1.5"} value={hood} onChange={(e) => setHood(e.target.value)}>{hoods.map((x) => <option key={x}>{x}</option>)}</select>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">{needs.map((n) => <Chip key={n} active={need === n} onClick={() => setNeed(n)}>{n}</Chip>)}</div>
        {feed.length ? (
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4">{feed.map((p) => <PostCard key={p.id} p={p} />)}</div>
        ) : (
          <p className="rounded-2xl bg-muted p-6 text-sm text-muted-foreground">{tab === "saved" ? "Save looks with the bookmark to collect outfit inspiration here." : "No looks match these filters yet."}</p>
        )}
      </section>
    </div>
  );
}

function PostCard({ p }: { p: Post }) {
  const s = useStore();
  const u = getUser(p.userId);
  const item = getItem(p.itemId) ?? s.allItems.find((i) => i.id === p.itemId);
  const liked = s.likedPosts.includes(p.id), saved = s.savedPosts.includes(p.id);
  const verified = isVerified(p, s.myCompleted);
  const self = p.userId === ME;
  const pts = postPoints(p, verified, liked, saved);
  const likes = p.likes + (liked && !self ? 1 : 0);
  return (
    <article className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="relative">
        <img src={p.image} alt={p.caption} loading="lazy" className="w-full object-cover" />
        <span className={cn("absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium", verified ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground")}>
          {verified ? <><BadgeCheck className="h-3 w-3" />Verified Rental</> : <><Shirt className="h-3 w-3" />Owner styling</>}
        </span>
        <button aria-label={saved ? "Unsave look" : "Save look"} onClick={() => { s.toggleSavePost(p.id); if (!saved) toast.success("Look saved to your inspiration"); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow-soft">
          <Bookmark className={cn("h-4 w-4", saved && "fill-primary")} />
        </button>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-sm leading-snug">{p.caption}</p>
        {p.review && <p className="flex flex-wrap gap-x-3 text-[11px] text-muted-foreground"><span>Condition {p.review.condition}/5</span><span>As described {p.review.accuracy}/5</span><span>Exchange {p.review.experience}/5</span></p>}
        <div className="flex flex-wrap gap-1">{p.styleTags.map((t) => <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>)}</div>
        {item && (
          <div className="flex items-center gap-2 rounded-xl bg-muted/70 p-2">
            <Link to="/item/$id" params={{ id: item.id }} className="flex min-w-0 flex-1 items-center gap-2">
              <img src={item.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
              <span className="min-w-0"><span className="block truncate text-xs font-medium">{item.title}</span><span className="text-[11px] text-muted-foreground">${item.dailyRate}/day · Rent it</span></span>
            </Link>
            <button aria-label={s.favorites.includes(item.id) ? "Remove from wishlist" : "Add to wishlist"} onClick={() => { s.toggleFav(item.id); if (!s.favorites.includes(item.id)) toast.success("Added to your rental wishlist"); }} className="grid h-8 w-8 place-items-center rounded-full bg-card">
              <Heart className={cn("h-4 w-4", s.favorites.includes(item.id) && "fill-blush text-blush")} />
            </button>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <Link to="/user/$id" params={{ id: u.id }} className="flex min-w-0 items-center gap-2 text-xs font-medium"><Avatar id={u.id} size={24} /><span className="truncate">{self ? "You" : u.name}</span></Link>
          <div className="flex items-center gap-2">
            {!self && <button aria-label={s.soulmates.includes(u.id) ? "Remove Soulmate" : "Save as Soulmate"} title="Save as Closet Soulmate" onClick={() => { s.toggleSoulmate(u.id); if (!s.soulmates.includes(u.id)) toast.success(`${u.name} saved as a Closet Soulmate`); }} className="text-muted-foreground">
              {s.soulmates.includes(u.id) ? <UserCheck className="h-4 w-4 text-accent-foreground" /> : <UserPlus className="h-4 w-4" />}
            </button>}
            <button aria-label="Like" onClick={() => s.toggleLike(p.id)} className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart key={String(liked)} className={cn("h-4 w-4", liked && "animate-heart fill-blush text-blush")} />{likes}
            </button>
          </div>
        </div>
        {verified && <p className="flex items-center gap-1 text-[11px] text-accent-foreground"><Sparkles className="h-3 w-3" />{pts} pts earned{pts >= POST_CAP ? " (max)" : ""}</p>}
      </div>
    </article>
  );
}

function Recommended({ w }: { w: Record<string, number> }) {
  const s = useStore();
  const me = getUser(ME);
  const recs = recommendPeople(me, w, [...s.soulmates, ...s.skipped]);
  const saved = users.filter((u) => s.soulmates.includes(u.id));
  const r = recs[0];
  return (
    <section className="grid gap-4 rounded-3xl bg-hero p-5 md:grid-cols-[1.4fr_1fr] md:p-6">
      <div>
        <h2 className="text-3xl">Recommended for you</h2>
        {r ? (
          <div className="mt-3 overflow-hidden rounded-2xl bg-card shadow-soft sm:flex">
            <Link to="/user/$id" params={{ id: r.u.id }} className="block sm:w-2/5"><img src={r.u.avatar} alt={r.u.name} className="h-56 w-full object-cover sm:h-full" /></Link>
            <div className="flex-1 space-y-3 p-4">
              <div><p className="font-display text-3xl">{r.u.name}</p><p className="text-xs text-muted-foreground">{r.u.neighborhood} · <Star className="inline h-3 w-3 fill-current" /> {r.u.rating}</p></div>
              <p className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{r.reason}</p>
              <div className="flex flex-wrap gap-1">{r.u.styleTags.map((t) => <span key={t} className={cn("rounded-full px-2 py-0.5 text-[11px]", w[t] ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground")}>{t}</span>)}</div>
              <div className="flex gap-2">{r.closet.slice(0, 3).map((i) => <Link key={i.id} to="/item/$id" params={{ id: i.id }}><img src={i.image} alt={i.title} className="h-14 w-14 rounded-lg object-cover" /></Link>)}</div>
              <div className="flex gap-2">
                <button onClick={() => s.skipPerson(r.u.id)} className={btnGhost + " flex-1"}><X className="h-4 w-4" />Skip</button>
                <button onClick={() => { s.toggleSoulmate(r.u.id); toast.success(`${r.u.name} saved as a Closet Soulmate`); }} className={btn + " flex-1"}><Heart className="h-4 w-4" />Save as Soulmate</button>
              </div>
            </div>
          </div>
        ) : <p className="mt-3 text-sm text-muted-foreground">You've seen everyone nearby for now.</p>}
      </div>
      <div>
        <h3 className="text-2xl">Your Closet Soulmates</h3>
        {saved.length ? (
          <ul className="mt-3 space-y-2">{saved.map((u) => (
            <li key={u.id} className="flex items-center justify-between rounded-xl bg-card/80 p-2">
              <Link to="/user/$id" params={{ id: u.id }} className="flex items-center gap-2 text-sm"><Avatar id={u.id} size={32} />{u.name}</Link>
              <button onClick={() => s.toggleSoulmate(u.id)} className="text-xs text-muted-foreground hover:underline">Remove</button>
            </li>))}</ul>
        ) : <p className="mt-3 text-sm text-muted-foreground">Save people from posts or cards — their closets rank higher in Discover.</p>}
        <p className="mt-4 text-xs text-muted-foreground">Your balance: <b className="text-foreground">{s.points} pts</b>{s.earned ? ` · ${s.earned} earned from your looks` : ""}</p>
      </div>
    </section>
  );
}

const tagPool = ["Romantic", "Minimal", "Silk", "Evening", "Tailored", "Quiet luxury", "Vintage", "Boho"];
const occasions = ["Wedding Guest", "Graduation Photos", "Brunch", "Work"];

function Composer({ onDone }: { onDone: () => void }) {
  const s = useStore();
  const completed = s.rentals.filter((r) => r.status === "Completed" && r.renterId === ME);
  const [kind, setKind] = useState<"rented" | "closet">(completed.length ? "rented" : "closet");
  const [rentalId, setRentalId] = useState(completed[0]?.id ?? "");
  const [ownId, setOwnId] = useState(s.myItems[0]?.id ?? "");
  const [photo, setPhoto] = useState("");
  const [caption, setCaption] = useState("");
  const [occasion, setOccasion] = useState(occasions[0]!);
  const [rv, setRv] = useState({ condition: 5, accuracy: 5, experience: 5 });
  const itemId = kind === "rented" ? completed.find((r) => r.id === rentalId)?.itemId : ownId;
  const item = s.allItems.find((i) => i.id === itemId);
  const [tags, setTags] = useState<string[]>([]);
  const shownTags = tags.length ? tags : item?.styleTags ?? [];

  const onFile = (f?: File) => { if (!f) return; const r = new FileReader(); r.onload = () => setPhoto(String(r.result)); r.readAsDataURL(f); };
  const publish = () => {
    if (!item) return;
    s.addPost({ id: "mp" + Date.now(), userId: ME, kind, rentalId: kind === "rented" ? rentalId : undefined, image: photo || item.image, itemId: item.id, caption, styleTags: shownTags, occasion, review: kind === "rented" ? rv : undefined, likes: 0, saves: 0 });
    toast.success(kind === "rented" ? "Posted! Verified looks earn points as neighbors like and save them." : "Styling post shared");
    onDone();
  };
  return (
    <section className="space-y-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex rounded-full bg-muted p-1 w-fit">
        {([["rented", "I rented this"], ["closet", "From my closet"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setKind(k)} className={cn("rounded-full px-4 py-1.5 text-sm", kind === k ? "bg-card shadow-soft" : "text-muted-foreground")}>{l}</button>
        ))}
      </div>
      {kind === "rented" ? (
        completed.length ? <label className="block text-xs text-muted-foreground">Completed rental<select className={input} value={rentalId} onChange={(e) => setRentalId(e.target.value)}>{completed.map((r) => <option key={r.id} value={r.id}>{s.allItems.find((i) => i.id === r.itemId)?.title} · {r.start}</option>)}</select></label>
          : <p className="text-sm text-muted-foreground">Finish a rental to share a verified look.</p>
      ) : (
        s.myItems.length ? <label className="block text-xs text-muted-foreground">Tag your listing<select className={input} value={ownId} onChange={(e) => setOwnId(e.target.value)}>{s.myItems.map((i) => <option key={i.id} value={i.id}>{i.title}</option>)}</select></label>
          : <p className="text-sm text-muted-foreground">List a piece in My Closet first, then show how you style it.</p>
      )}
      {item && (
        <div className="grid gap-4 md:grid-cols-[160px_1fr]">
          <label className="relative block cursor-pointer overflow-hidden rounded-2xl bg-muted">
            <img src={photo || item.image} alt="" className="aspect-[3/4] w-full object-cover" />
            <span className="absolute inset-x-2 bottom-2 rounded-full bg-card/90 py-1 text-center text-[11px]">Upload outfit photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <div className="space-y-3">
            <textarea className={input} rows={2} placeholder="Styling notes — what did you pair it with?" value={caption} onChange={(e) => setCaption(e.target.value)} />
            <div className="flex flex-wrap gap-1">{tagPool.map((t) => <Chip key={t} active={shownTags.includes(t)} onClick={() => setTags(shownTags.includes(t) ? shownTags.filter((x) => x !== t) : [...shownTags, t])}>{t}</Chip>)}</div>
            <label className="block text-xs text-muted-foreground">Occasion<select className={input} value={occasion} onChange={(e) => setOccasion(e.target.value)}>{occasions.map((o) => <option key={o}>{o}</option>)}</select></label>
            {kind === "rented" && (
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                {([["condition", "Item condition"], ["accuracy", "As described"], ["experience", "Rental exchange"]] as const).map(([k, l]) => (
                  <label key={k}>{l}<select className={input} value={rv[k]} onChange={(e) => setRv({ ...rv, [k]: +e.target.value })}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} / 5</option>)}</select></label>
                ))}
              </div>
            )}
            <div className="flex gap-2"><button disabled={caption.trim().length < 5} onClick={publish} className={btn}>Publish</button><button onClick={onDone} className={btnGhost}>Cancel</button></div>
          </div>
        </div>
      )}
    </section>
  );
}
