import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Sparkles, Users, ShieldCheck, Leaf, Wallet, HeartHandshake } from "lucide-react";
import yellow from "@/assets/arch-yellow.jpg";
import orange from "@/assets/arch-orange.jpg";
import teal from "@/assets/arch-teal.jpg";
import pink from "@/assets/arch-pink.jpg";
import street from "@/assets/split-street.jpg";
import field from "@/assets/split-field.jpg";
import { items } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Closet Circle — Your neighborhood's shared wardrobe" },
    { name: "description", content: "Rent dresses, shoes and bags from stylish neighbors, get AI outfit picks for any occasion, and meet your Closet Soulmates." },
    { property: "og:title", content: "Closet Circle — Your neighborhood's shared wardrobe" },
    { property: "og:description", content: "Local fashion rental, AI styling and a style-first community in one place." },
  ] }),
  component: Landing,
});

const arches = [
  { img: yellow, bg: "bg-secondary", h: "h-[300px] md:h-[380px]" },
  { img: teal, bg: "bg-accent", h: "h-[340px] md:h-[420px]" },
  { img: orange, bg: "bg-secondary", h: "h-[380px] md:h-[460px]", tag: true },
  { img: pink, bg: "bg-accent", h: "h-[340px] md:h-[420px]" },
  { img: items[0]!.image, bg: "bg-secondary", h: "h-[300px] md:h-[380px]" },
];
const cats = [
  { label: "Wedding Guest", img: items[1]!.image },
  { label: "Evening & Gala", img: items[0]!.image },
  { label: "Handbags", img: items[2]!.image },
  { label: "Shoes", img: items[4]!.image },
  { label: "Tailoring", img: items[3]!.image },
];
const pill = "inline-flex items-center gap-4 bg-ink-foreground py-2 pl-8 pr-2 text-[13px] tracking-[0.14em] text-ink transition hover:opacity-90";

function Landing() {
  return (
    <div className="bg-background">
      {/* HERO — dark, arched model cards */}
      <section className="m-2 overflow-hidden rounded-[2rem] bg-secondary text-secondary-foreground md:m-4">
        <nav className="flex items-center justify-between px-6 py-7 md:px-12">
          <span className="font-display text-2xl tracking-wide">Closet <em>Circle</em></span>
          <div className="hidden items-center gap-8 md:flex">
            {[["Discover", "/discover"], ["Community", "/community"], ["List a piece", "/closet"], ["Rentals", "/rentals"]].map(([l, to]) => (
              <Link key={l} to={to as "/discover"} className="text-[13px] tracking-[0.14em] text-secondary-foreground/80 transition hover:text-secondary-foreground">{l}</Link>
            ))}
          </div>
          <Link to="/discover" className="border border-foreground/30 px-6 py-2 text-[13px] tracking-[0.14em] transition hover:bg-foreground hover:text-secondary">Open app</Link>
        </nav>
        <div className="mx-auto max-w-3xl px-6 pt-10 text-center">
          <span className="inline-block border-b border-foreground/25 pb-2 text-[11px] tracking-luxe text-muted-foreground">Now in San Francisco · Mission, Bernal, Noe & SoMa</span>
          <h1 className="mt-8 text-5xl leading-[1.08] md:text-7xl">Your neighborhood's <em>shared wardrobe</em></h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">Rent the dress for Saturday's wedding from a neighbor three blocks away. Get AI outfit picks, meet women who share your taste, and earn rewards for every honest review.</p>
          <Link to="/discover" className={pill + " mt-10"}>Find my look <span className="grid h-9 w-9 place-items-center rounded-full bg-background text-foreground"><ArrowRight className="h-4 w-4" /></span></Link>
        </div>
        <div className="mt-16 flex items-end justify-center gap-3 px-2 md:gap-5">
          {arches.map((a, i) => (
            <div key={i} className={`arch relative w-1/5 max-w-[260px] shrink-0 overflow-hidden ${a.bg} ${a.h} ${i === 0 || i === 4 ? "hidden sm:block" : ""}`}>
              <img src={a.img} alt="" className="h-full w-full object-cover object-top" loading={i === 2 ? "eager" : "lazy"} />
              {a.tag && <div className="arch absolute bottom-6 left-1/2 w-28 -translate-x-1/2 bg-blush/90 px-3 pb-4 pt-10 text-center text-xs text-secondary-foreground">From<br /><b className="font-display text-2xl">$28</b>/day</div>}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — split imagery */}
      <section className="mx-2 grid overflow-hidden rounded-[2rem] md:mx-4 md:grid-cols-2">
        <div className="relative"><img src={street} alt="" loading="lazy" className="h-[520px] w-full object-cover md:h-[720px]" /></div>
        <div className="relative">
          <img src={field} alt="" loading="lazy" className="h-[520px] w-full object-cover md:h-[720px]" />
          <div className="absolute inset-x-6 bottom-6 bg-secondary/95 p-6 text-secondary-foreground backdrop-blur md:inset-x-10 md:bottom-10 md:p-8">
            <h2 className="text-4xl">How it works</h2>
            <ol className="mt-4 space-y-3">
              {["Search by occasion, size & budget", "Request & message the owner", "Meet at a public spot, snap condition photos", "Return, review, earn points"].map((s, i) => (
                <li key={s} className="flex items-baseline gap-4"><span className="font-display text-2xl text-muted-foreground">0{i + 1}</span><span>{s}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <p className="text-center text-[11px] tracking-luxe text-muted-foreground">The Closet Circle difference</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-4xl md:text-6xl">Three things, in <em>one place</em></h2>
        <div className="mx-auto mt-6 h-px w-16 bg-foreground/30" />
        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {[
            { icon: MapPin, t: "Local rental", d: "Pieces from closets within a few miles. Same-day pickup at public spots — no shipping, no waiting." },
            { icon: Sparkles, t: "AI styling", d: "Tell us the occasion, date, size and budget. Get complete outfit picks from nearby closets in seconds." },
            { icon: Users, t: "Closet Soulmates", d: "Find and follow women whose style matches yours. Their closets show up first in your recommendations." },
          ].map((v) => (
            <div key={v.t} className="bg-card p-10">
              <v.icon className="h-5 w-5" strokeWidth={1.25} />
              <h3 className="mt-7 text-3xl">{v.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <h2 className="text-4xl md:text-5xl">Shop by <em>occasion</em></h2>
          <Link to="/discover" className="flex items-center gap-1 text-[13px] tracking-[0.14em] underline-offset-4 hover:underline">Browse all <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
          {cats.map((c) => (
            <Link key={c.label} to="/discover" className="group relative aspect-[4/5] overflow-hidden bg-muted">
              <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-4 text-center text-ink-foreground">
                <p className="font-display text-2xl">{c.label}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-0 transition group-hover:opacity-100">Rent now</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center text-[11px] tracking-luxe text-muted-foreground">This week in the circle</p>
        <h2 className="mt-5 text-center text-4xl md:text-5xl">Trending <em>now</em></h2>
        <div className="mx-auto mt-6 h-px w-16 bg-foreground/30" />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.slice(0, 4).map((it, i) => (
            <Link key={it.id} to="/item/$id" params={{ id: it.id }} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                {i % 2 === 0 && <span className="absolute right-3 top-3 z-10 bg-card px-2 py-1 text-[10px] uppercase tracking-wider">{i === 0 ? "Most rented" : "Trending"}</span>}
                <img src={it.image} alt={it.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-sm">{it.title}</p>
              <p className="text-xs text-muted-foreground">{it.brand} · <span className="line-through">${it.retail}</span> <span className="text-foreground">${it.dailyRate}/day</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto grid max-w-6xl gap-12 border-t border-border px-6 py-28 md:grid-cols-[1fr_1.2fr]">
        <h2 className="text-4xl md:text-5xl">Built on <em>trust</em>, not just transactions</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { icon: ShieldCheck, t: "Transparent & safe", d: "Only neighborhoods are public. Meetup details unlock after confirmation. Deposits and fees shown up front." },
            { icon: HeartHandshake, t: "Respectful reviews", d: "Rate the item, its accuracy and the exchange — never anyone's appearance or body." },
            { icon: Wallet, t: "Earn as you go", d: "List your closet to earn. Leave honest reviews for points toward future rentals." },
            { icon: Leaf, t: "Wear more, waste less", d: "Every rental keeps a piece in circulation instead of a one-time buy." },
          ].map((v) => (
            <div key={v.t}><v.icon className="h-5 w-5" strokeWidth={1.25} /><h3 className="mt-4 text-2xl">{v.t}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="m-2 rounded-[2rem] bg-accent px-6 py-24 text-center text-accent-foreground md:m-4">
        <h2 className="mx-auto max-w-2xl text-5xl leading-tight md:text-6xl">Your next look is <em>around the corner</em></h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/discover" className={pill}>Start discovering <span className="grid h-9 w-9 place-items-center rounded-full bg-background text-foreground"><ArrowRight className="h-4 w-4" /></span></Link>
          <Link to="/closet" className="border border-foreground/30 px-8 py-3 text-[13px] tracking-[0.14em] transition hover:bg-foreground hover:text-accent">List your closet</Link>
        </div>
        <p className="mt-20 text-[11px] tracking-luxe text-muted-foreground">© 2026 Closet Circle · Made for neighbors</p>
      </section>
    </div>
  );
}
