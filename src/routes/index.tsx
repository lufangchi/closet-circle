import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/landing-hero-sky.jpg";
import bottom from "@/assets/landing-bottom-circle.jpg";
import stepBrowse from "@/assets/step-browse.jpg";
import stepMessage from "@/assets/step-message.jpg";
import stepWear from "@/assets/step-wear.jpg";
import stepFriends from "@/assets/step-friends.jpg";
import tileDiscover from "@/assets/tile-discover.jpg";
import tileCommunity from "@/assets/tile-community.jpg";
import tileCloset from "@/assets/tile-closet.jpg";
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
  { t: "Discover", d: "Browse neighbors' closets or let AI style a full look for your plans — then preview it on you.", img: tileDiscover, to: "/discover" },
  { t: "Meet your community", d: "Real outfits from real neighbors. Save looks and follow women who share your taste.", img: tileCommunity, to: "/community" },
  { t: "Manage your closet", d: "List what you rarely wear, set your price and dates, and earn from every rental.", img: tileCloset, to: "/closet" },
];
const cats = [
  { label: "Wedding Guest", img: items[1]!.image },
  { label: "Evening & Gala", img: items[0]!.image },
  { label: "Handbags", img: items[2]!.image },
  { label: "Shoes", img: items[4]!.image },
  { label: "Tailoring", img: items[3]!.image },
];
const steps = [
  { t: "Browse, AI Discover & AI Try-On", d: "Search by occasion, size and budget, get an AI-styled look, and preview pieces on yourself.", img: stepBrowse },
  { t: "Message the owner", d: "Ask about fit, agree on dates, and pick a public spot to meet nearby.", img: stepMessage },
  { t: "Get the clothes & put them on", d: "Pick up, snap condition photos together, and wear it out — return it the same way.", img: stepWear },
  { t: "Talk with people who share your taste", d: "Post your look, save others', and find your Closet Soulmates.", img: stepFriends },
];

function Steps() {
  const [on, setOn] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-24 md:pt-32">
      <p className="text-[12px] tracking-luxe text-accent-foreground">How it works</p>
      <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[1.1] md:text-6xl">One closet is never enough. <em>A whole neighborhood's is.</em></h2>
      <div className="mt-16 grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <ol className="space-y-8">{steps.map((st, i) => (
          <li key={st.t}>
            <button onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)} className={`block border-l-2 pl-5 text-left transition ${on === i ? "border-foreground" : "border-transparent opacity-45 hover:opacity-80"}`}>
              <span className="block text-xs font-medium tracking-[0.1em]">0.0{i + 1}</span>
              <span className="mt-1 block font-display text-3xl md:text-4xl">{st.t}</span>
              {on === i && <span className="mt-2 block max-w-md text-sm text-muted-foreground">{st.d}</span>}
            </button>
          </li>))}</ol>
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-soft">
          <img key={on} src={steps[on]!.img} alt={steps[on]!.t} loading="lazy" className="aspect-square w-full object-cover animate-fade-up" />
        </div>
      </div>
      <Link to="/signup" className="mt-12 inline-block border-b border-foreground pb-0.5 text-[13px] tracking-[0.1em]">Join the circle</Link>
    </section>
  );
}

function Landing() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO — full-bleed photo, floating nav, value prop */}
      <section className="relative">
        <img src={hero} alt="Two friends laughing in blush and sage silk" className="h-[92vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-ink/20" />
        <nav className="absolute inset-x-4 top-4 flex items-center justify-between rounded-full bg-background/90 px-6 py-3 backdrop-blur md:inset-x-8 md:px-8">
          <div className="hidden items-center gap-7 md:flex">
            {[["Discover", "/discover"], ["AI Stylist", "/stylist"], ["Community", "/community"]].map(([l, to]) => (
              <Link key={l} to={to as "/discover"} className="text-[13px] tracking-[0.08em] text-foreground/70 transition hover:text-foreground">{l}</Link>
            ))}
          </div>
          <Link to="/" className="font-display text-xl tracking-wide md:absolute md:left-1/2 md:-translate-x-1/2">Closet <em>Circle</em></Link>
          <div className="flex items-center gap-6">
            <Link to="/auth" className="hidden text-[13px] tracking-[0.08em] text-foreground/70 transition hover:text-foreground md:block">Sign in</Link>
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

      <Steps />

      {/* FOUR SUB-SECTIONS — connected photo mosaic */}
      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between pb-8">
            <h2 className="font-display text-4xl md:text-5xl">Inside the <em>circle</em></h2>
            <Link to="/discover" className="flex items-center gap-1 text-[13px] tracking-[0.1em] underline-offset-4 hover:underline">Browse all <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {collections.map((c) => (
              <Link key={c.t} to={c.to as "/discover"} className="group relative block h-[420px] overflow-hidden md:h-[520px]">
                <img src={c.img} alt={c.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-transparent" />
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

      {/* TRUST — Fit Guarantee + Damage Protection */}
      <section id="trust" className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid border-y border-border md:grid-cols-2 md:divide-x md:divide-border">
          <div className="space-y-4 py-12 md:pr-12">
            <h3 className="font-display text-4xl md:text-5xl">Fit <em>Guarantee</em></h3>
            <p className="max-w-md text-muted-foreground">Preview the look on you and check how the garment's measurements compare with yours before you rent.</p>
            <p className="max-w-md text-sm text-muted-foreground">Any fit issue — too small, too big, too long or simply not right — gets a refund or a free exchange, with your deposit returned in full.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] tracking-[0.1em]">
              <Link to="/fit-check" className="underline-offset-4 hover:underline">See how Fit Check works →</Link>
              <Link to="/terms" hash="fit-guarantee" className="text-muted-foreground underline-offset-4 hover:underline">Eligibility & terms</Link>
            </div>
          </div>
          <div className="space-y-4 border-t border-border py-12 md:border-t-0 md:pl-12">
            <h3 className="font-display text-4xl md:text-5xl">Damage <em>Protection</em></h3>
            <p className="max-w-md text-muted-foreground">See the deposit and damage terms before you request. Document the item's condition at pickup and return.</p>
            <ul className="max-w-md space-y-1 text-sm text-muted-foreground">
              <li>· Refundable deposit shown on every listing</li>
              <li>· Normal wear and listed flaws are never charged</li>
              <li>· Repairs charged at cost, capped at the deposit</li>
              <li>· Not covered: damage above the deposit; loss or non-return is handled up to the deposit</li>
            </ul>
            <Link to="/terms" hash="damage" className="inline-block text-[13px] tracking-[0.1em] underline-offset-4 hover:underline">Rental terms →</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES — serif index list with side image */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-28 md:grid-cols-2 md:gap-16">
        <div className="relative hidden overflow-hidden md:block">
          <img src={stepWear} alt="Wedding guest looks" loading="lazy" className="h-full min-h-[560px] w-full object-cover" />
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

      {/* JOIN — full-bleed photo with centered call to action */}
      <section className="relative">
        <img src={bottom} alt="Three friends in a circle laughing under a blue sky" loading="lazy" className="h-[90vh] w-full object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ink-foreground">
          <p className="text-[13px] tracking-[0.1em]">Join the circle</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">Be part of a closet where <em>women share with women</em></h2>
          <Link to="/signup" className="mt-10 inline-flex items-center gap-3 rounded-full bg-background px-8 py-3.5 text-[13px] tracking-[0.1em] text-foreground transition hover:opacity-90">Create your free account <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <p className="py-10 text-center text-[11px] tracking-luxe text-muted-foreground">© 2026 Closet Circle · Made for neighbors</p>
    </div>
  );
}
