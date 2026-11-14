import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Award } from "lucide-react";
import { users, posts, getUser, compatibility, ME } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Avatar, btn, btnGhost } from "@/components/ui-kit";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [
    { title: "Community — Closet Circle" },
    { name: "description", content: "Find your Closet Soulmate and share outfit inspiration with neighbors." },
    { property: "og:title", content: "Find your Closet Soulmate" },
    { property: "og:description", content: "Style-matched neighbors, outfit inspiration and trusted reviews." },
  ] }),
  component: Community,
});

function Community() {
  const { soulmates, toggleSoulmate, points } = useStore();
  const me = getUser(ME);
  const [liked, setLiked] = useState<string[]>([]);
  const others = users.filter((u) => u.id !== ME).map((u) => ({ u, m: compatibility(me, u) })).sort((a, b) => b.m - a.m);
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-4xl font-semibold">Find your Closet Soulmate</h1>
        <p className="text-muted-foreground">Neighbors whose style overlaps with yours — {me.styleTags.join(", ")}.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map(({ u, m }) => (
            <div key={u.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <Link to="/user/$id" params={{ id: u.id }} className="block aspect-square overflow-hidden bg-muted"><img src={u.avatar} alt={u.name} className="h-full w-full object-cover" loading="lazy" /></Link>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between"><h3 className="text-2xl">{u.name}</h3><span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">{m}% match</span></div>
                <p className="text-sm text-muted-foreground">{u.neighborhood} · ★ {u.rating} · {u.responseRate}% response</p>
                <div className="flex flex-wrap gap-1">{u.styleTags.map((t) => <span key={t} className={"rounded-full px-2 py-0.5 text-xs " + (me.styleTags.includes(t) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground")}>{t}</span>)}</div>
                <button onClick={() => toggleSoulmate(u.id)} className={(soulmates.includes(u.id) ? btnGhost : btn) + " w-full"}>{soulmates.includes(u.id) ? "Soulmate ✓" : "Save as Soulmate"}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex items-center gap-4 rounded-3xl bg-hero p-6">
        <Award className="h-10 w-10 text-accent-foreground" />
        <div><p className="font-display text-2xl">{points} community points</p><p className="text-sm text-muted-foreground">Earn 50 points per honest rental review. 100 pts = $10 off a rental.</p></div>
      </section>
      <section>
        <h2 className="mb-4 text-3xl">Style feed</h2>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {posts.map((p) => { const u = getUser(p.userId); const l = liked.includes(p.id); return (
            <article key={p.id} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card">
              <img src={p.image} alt="" loading="lazy" className="w-full" />
              <div className="space-y-2 p-4">
                <Link to="/user/$id" params={{ id: u.id }} className="flex items-center gap-2 text-sm font-medium"><Avatar id={u.id} size={28} />{u.name}</Link>
                <p className="text-sm">{p.caption}</p>
                <button onClick={() => setLiked(l ? liked.filter((x) => x !== p.id) : [...liked, p.id])} className="flex items-center gap-1 text-xs text-muted-foreground"><Heart className={"h-4 w-4 " + (l ? "animate-heart fill-blush text-blush" : "")} />{p.likes + (l ? 1 : 0)}</button>
              </div>
            </article>); })}
        </div>
      </section>
    </div>
  );
}
