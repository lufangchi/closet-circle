import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/landing-hero-sky.jpg";
import bottom from "@/assets/landing-bottom-circle.jpg";
import stepBrowse from "@/assets/step-browse.jpg";
import stepMessage from "@/assets/step-message.jpg";
import stepWear from "@/assets/step-wear.jpg";
import occasion from "@/assets/occasion-wedding.jpg";
import stepFriends from "@/assets/step-friends.jpg";
import tileDiscover from "@/assets/tile-discover.jpg";
import tileCommunity from "@/assets/tile-community.jpg";
import tileCloset from "@/assets/tile-closet.jpg";
import { items } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "SisUse — Your sisterhood’s shared wardrobe" },
    { name: "description", content: "Rent dresses, shoes and bags from stylish neighbors, get AI outfit picks for any occasion, and meet your Closet Soulmates." },
    { property: "og:title", content: "SisUse — Your sisterhood’s shared wardrobe" },
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
  { label: "Clothing" }, { label: "Bags" }, { label: "Jewelry" }, { label: "Shoes" }, { label: "Accessories" },
];
const steps = [
  { t: "Browse, AI Discover & AI Try-On", d: "Search by occasion, size and budget, get an AI-styled look, and preview pieces on yourself.", img: stepBrowse },
  { t: "Message the owner", d: "Ask about fit, agree on dates, and pick a public spot to meet nearby.", img: stepMessage },
  { t: "Get the clothes & put them on", d: "Pick up, snap condition photos together, and wear it out — return it the same way.", img: stepWear },
  { t: "Talk with people who share your taste", d: "Post your look, save others', and find your Closet Soulmates.", img: stepFriends },
];

function Steps() {
  const [on, setOn] = useState(0);
  useEffect(() => { const t = setInterval(() => setOn((v) => (v + 1) % steps.length), 4500); return () => clearInterval(t); }, []);
  const n = steps.length;
  return (
    <section className="px-6 pb-16 pt-24 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-[13px] tracking-[0.08em] text-accent-foreground">How it works</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">A closet built for women, <em>by women</em></h2>
        </div>
        <p className="self-end text-lg leading-relaxed text-muted-foreground md:text-xl">SisUse connects women in the same neighborhood to borrow, lend and style each other's pieces. Find a look, meet the woman who owns it, wear it out, and keep the conversation going with people who share your taste.</p>
      </div>
      <div className="relative mx-auto mt-20 h-[300px] max-w-5xl md:h-[360px]">
        {steps.map((st, i) => {
          let d = i - on; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
          const abs = Math.abs(d);
          return (
            <button key={st.t} onClick={() => setOn(i)} aria-label={st.t}
              style={{ transform: `translateX(calc(-50% + ${d * 72}%)) rotate(${d * 9}deg) translateY(${abs * 28}px) scale(${1 - abs * 0.12})`, zIndex: 10 - abs, opacity: abs > 1 ? 0.35 : 1, filter: abs > 1 ? "blur(3px)" : "none" }}
              className="absolute left-1/2 top-0 aspect-square w-[210px] overflow-hidden rounded-[1.75rem] border-4 border-background shadow-soft transition-all duration-700 md:w-[290px]">
              <img src={st.img} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-10 max-w-xl text-center">
        <p className="text-sm font-medium tracking-[0.1em]">0.0{on + 1}</p>
        <h3 key={on} className="mt-2 animate-fade-up font-display text-3xl leading-tight md:text-4xl">{steps[on]!.t}</h3>
        <p className="mt-3 text-muted-foreground">{steps[on]!.d}</p>
        <div className="mt-6 flex justify-center gap-2">{steps.map((st, i) => (
          <button key={st.t} onClick={() => setOn(i)} aria-label={`Step ${i + 1}`} className={`h-2 rounded-full transition-all ${on === i ? "w-6 bg-primary" : "w-2 bg-border"}`} />
        ))}</div>
      </div>
    </section>
  );
}

function Bridge({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center pb-14 text-center">
      <span className="h-14 w-px bg-border" />
      <p className="mt-5 max-w-md font-display text-2xl italic text-muted-foreground">{text}</p>
    </div>
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
          <Link to="/" className="font-display text-xl tracking-wide md:absolute md:left-1/2 md:-translate-x-1/2">Sis<em>Use</em></Link>
          <div className="flex items-center gap-6">
            <Link to="/auth" className="hidden text-[13px] tracking-[0.08em] text-foreground/70 transition hover:text-foreground md:block">Sign in</Link>
            <Link to="/discover" className="rounded-full bg-primary px-5 py-2 text-[13px] tracking-[0.08em] text-primary-foreground transition hover:opacity-90">Open app</Link>
          </div>
        </nav>
        <div className="absolute inset-x-6 bottom-10 md:inset-x-12 md:bottom-14">
          <h1 className="max-w-5xl font-display text-5xl leading-[1.04] text-ink-foreground md:text-8xl">Your sisterhood’s <em>shared wardrobe</em>.</h1>
          <p className="mt-5 max-w-xl text-base text-ink-foreground/90 md:text-lg">Rent and lend clothing, bags, jewelry, and accessories. Discover new looks and connect with women who share your style.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/discover" className="inline-flex items-center gap-3 rounded-full bg-background px-7 py-3 text-[13px] tracking-[0.1em] text-foreground transition hover:opacity-90">Explore the Wardrobe <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/closet" className="inline-flex items-center gap-3 rounded-full border border-ink-foreground/50 px-7 py-3 text-[13px] tracking-[0.1em] text-ink-foreground transition hover:bg-ink-foreground/10">Share Your Pieces</Link>
            <Link to="/stylist" className="text-[13px] tracking-[0.1em] text-ink-foreground underline-offset-4 hover:underline">Find Your Next Look →</Link>
          </div>
        </div>
      </section>

      <Steps />
      <Bridge text="Three ways to be part of it." />

      {/* FOUR SUB-SECTIONS — connected photo mosaic */}
      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between pb-8">
            <h2 className="font-display text-4xl md:text-5xl">Inside <em>SisUse</em></h2>
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

      <Bridge text="A wardrobe is more than clothes." />

      {/* CATEGORIES — serif index list with side image */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 md:grid-cols-2 md:gap-16">
        <div className="relative hidden overflow-hidden md:block">
          <img src={occasion} alt="Wedding guest in a blush gown" loading="lazy" className="h-full min-h-[560px] w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[12px] tracking-luxe text-accent-foreground">Everything for the full look</p>
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

      <Bridge text="Here's what neighbors are wearing this week." />

      {/* TRENDING — best-seller style row */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
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

      <Bridge text="Your closet is waiting for its circle." />

      {/* JOIN — full-bleed photo with centered call to action */}
      <section className="relative">
        <img src={bottom} alt="Three friends in a circle laughing under a blue sky" loading="lazy" className="h-[90vh] w-full object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ink-foreground">
          <p className="text-[13px] tracking-[0.1em]">Join SisUse</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">Be part of a wardrobe where <em>women share with women</em></h2>
          <Link to="/signup" className="mt-10 inline-flex items-center gap-3 rounded-full bg-background px-8 py-3.5 text-[13px] tracking-[0.1em] text-foreground transition hover:opacity-90">Create your free account <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <p className="py-10 text-center text-[11px] tracking-luxe text-muted-foreground">© 2026 SisUse · Your sisterhood’s shared wardrobe</p>
    </div>
  );
}
