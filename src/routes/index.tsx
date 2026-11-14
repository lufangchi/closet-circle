import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import yellow from "@/assets/arch-yellow.jpg";
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

const collections = [
  { t: "Local rental", d: "Pieces from closets within a few miles — same-day pickup, no shipping.", img: street, to: "/discover", span: "md:col-span-3" },
  { t: "AI styling", d: "Tell us the occasion, size and budget. Get complete outfit picks in seconds.", img: teal, to: "/discover", span: "md:col-span-2" },
  { t: "Closet Soulmates", d: "Follow women whose style matches yours — their closets show up first.", img: field, to: "/community", span: "md:col-span-2" },
  { t: "Trust & care", d: "Deposits and fees up front, condition photos at every handoff, reviews that respect.", img: pink, to: "/rentals", span: "md:col-span-3" },
];
const cats = [
  { label: "Wedding Guest", img: items[1]!.image },
  { label: "Evening & Gala", img: items[0]!.image },
  { label: "Handbags", img: items[2]!.image },
  { label: "Shoes", img: items[4]!.image },
  { label: "Tailoring", img: items[3]!.image },
];
const steps = ["Search by occasion, size & budget", "Request & message the owner", "Meet at a public spot, snap condition photos", "Return, review, earn points"];

function Landing() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO — full-bleed photo, floating nav, value prop */}
      <section className="relative">
        <img src={street} alt="A neighbor lending a dress" className="h-[92vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-ink/20" />
        <nav className="absolute inset-x-4 top-4 flex items-center justify-between rounded-full bg-background/90 px-6 py-3 backdrop-blur md:inset-x-8 md:px-8">
          <div className="hidden items-center gap-7 md:flex">
            {[["Discover", "/discover"], ["Community", "/community"]].map(([l, to]) => (
              <Link key={l} to={to as "/discover"} className="text-[13px] tracking-[0.08em] text-foreground/70 transition hover:text-foreground">{l}</Link>
            ))}
          </div>
          <Link to="/" className="font-display text-xl tracking-wide md:absolute md:left-1/2 md:-translate-x-1/2">Closet <em>Circle</em></Link>
          <div className="flex items-center gap-6">
            <Link to="/closet" className="hidden text-[13px] tracking-[0.08em] text-foreground/70 transition hover:text-foreground md:block">List a piece</Link>
            <Link to="/discover" className="rounded-full bg-primary px-5 py-2 text-[13px] tracking-[0.08em] text-primary-foreground transition hover:opacity-90">Open app</Link>
          </div>
        </nav>
        <div className="absolute inset-x-6 bottom-10 md:inset-x-12 md:bottom-14">
          <p className="text-[12px] tracking-luxe text-ink-foreground/80">Now in San Francisco — Mission, Bernal, Noe & SoMa</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[1.04] text-ink-foreground md:text-8xl">Redesigning the way we <em>share fashion</em>.</h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/discover" className="inline-flex items-center gap-3 rounded-full bg-background px-7 py-3 text-[13px] tracking-[0.1em] text-foreground transition hover:opacity-90">Find my look <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/community" className="inline-flex items-center gap-3 rounded-full border border-ink-foreground/50 px-7 py-3 text-[13px] tracking-[0.1em] text-ink-foreground transition hover:bg-ink-foreground/10">Meet the circle</Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DO — centered statement + numbered steps, flows straight off the hero */}
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-24 text-center md:pt-32">
        <p className="text-[12px] tracking-luxe text-accent-foreground">What we're doing</p>
        <h2 className="mt-6 font-display text-4xl leading-[1.15] md:text-6xl">One closet is never enough. <em>A whole neighborhood's is.</em></h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">Closet Circle turns the closets around you into one shared wardrobe — rent the dress for Saturday's wedding from a neighbor three blocks away, get AI outfit picks for any occasion, and meet the women who share your taste.</p>
        <ol className="mt-16 grid gap-px overflow-hidden border border-border bg-border text-left sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="bg-background p-6">
              <span className="font-display text-3xl text-accent-foreground">0{i + 1}</span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FOUR SUB-SECTIONS — connected photo mosaic */}
      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between pb-8">
            <h2 className="font-display text-4xl md:text-5xl">Inside the <em>circle</em></h2>
            <Link to="/discover" className="flex items-center gap-1 text-[13px] tracking-[0.1em] underline-offset-4 hover:underline">Browse all <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {collections.map((c) => (
              <Link key={c.t} to={c.to as "/discover"} className={`group relative block overflow-hidden ${c.span} h-[380px] md:h-[440px]`}>
                <img src={c.img} alt={c.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute inset-x-6 top-6 md:inset-x-8 md:top-8">
                  <h3 className="font-display text-3xl text-ink-foreground md:text-4xl">{c.t}</h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-foreground/85">{c.d}</p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-foreground/60 px-5 py-2 text-[12px] tracking-[0.1em] text-ink-foreground transition group-hover:bg-ink-foreground group-hover:text-ink">Explore <ArrowUpRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES — serif index list with side image */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-28 md:grid-cols-2 md:gap-16">
        <div className="relative hidden overflow-hidden md:block">
          <img src={yellow} alt="Wedding guest looks" loading="lazy" className="h-full min-h-[560px] w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[12px] tracking-luxe text-accent-foreground">Explore by occasion</p>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {cats.map((c) => (
              <Link key={c.label} to="/discover" className="group flex items-baseline justify-between py-5 md:py-6">
                <span className="font-display text-3xl transition group-hover:italic md:text-5xl">{c.label}</span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING — best-seller style row */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <p className="text-center text-[12px] tracking-luxe text-accent-foreground">This week in the circle</p>
        <h2 className="mt-6 text-center font-display text-4xl md:text-5xl">Discover what's <em>trending</em> nearby</h2>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.slice(0, 4).map((it, i) => (
            <Link key={it.id} to="/item/$id" params={{ id: it.id }} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                {i % 2 === 0 && <span className="absolute right-3 top-3 z-10 bg-background px-2.5 py-1 text-[10px] tracking-[0.12em]">{i === 0 ? "Most rented" : "Trending"}</span>}
                <img src={it.image} alt={it.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-sm">{it.title}</p>
              <p className="text-xs text-muted-foreground">{it.brand} · <span className="line-through">${it.retail}</span> <span className="text-foreground">${it.dailyRate}/day</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA — quiet, same canvas */}
      <section className="border-t border-border px-6 py-28 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.12] md:text-6xl">Your next look is <em>around the corner</em>.</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/discover" className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3 text-[13px] tracking-[0.1em] text-primary-foreground transition hover:opacity-90">Start discovering <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/closet" className="inline-flex items-center rounded-full border border-foreground/30 px-8 py-3 text-[13px] tracking-[0.1em] transition hover:bg-muted">List your closet</Link>
        </div>
        <p className="mt-24 text-[11px] tracking-luxe text-muted-foreground">© 2026 Closet Circle · Made for neighbors</p>
      </section>
    </div>
  );
}
