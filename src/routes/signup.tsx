import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { FitProfileForm } from "@/components/fit-profile-form";
import { btn, input } from "@/components/ui-kit";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [
    { title: "Join Closet Circle" },
    { name: "description", content: "Create your Closet Circle account and set up a private Fit Profile." },
    { property: "og:title", content: "Join Closet Circle" },
    { property: "og:description", content: "Rent from neighbors with fit you can trust." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Signup,
});

const schema = z.object({ name: z.string().trim().min(1, "Add your name").max(60), email: z.string().trim().email("Enter a valid email").max(255) });

function Signup() {
  const s = useStore();
  const nav = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [f, setF] = useState({ name: s.account?.name ?? "", email: s.account?.email ?? "" });
  const [err, setErr] = useState("");
  const next = () => { const r = schema.safeParse(f); if (!r.success) return setErr(r.error.issues[0]!.message); s.setAccount(r.data); setErr(""); setStep(2); };
  return (
    <div className="mx-auto max-w-xl space-y-8 py-6">
      <div className="text-center">
        <p className="tracking-luxe text-xs text-muted-foreground">Step {step} of 2</p>
        <h1 className="mt-2 text-5xl">{step === 1 ? "Join the circle" : <>Your <em>Fit Profile</em></>}</h1>
        <p className="mt-2 text-muted-foreground">{step === 1 ? "A few details to start renting from neighbors." : "Four measurements help us estimate how each garment will fit you."}</p>
      </div>
      {step === 1 ? (
        <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
          <input className={input} placeholder="First name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className={input} type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button onClick={next} className={btn + " w-full"}>Continue</button>
          <p className="text-center text-xs text-muted-foreground">Prototype: accounts are saved in this browser only.</p>
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-card p-6">
          <FitProfileForm value={s.fitProfile} saveLabel="Save and finish"
            onSave={(fp) => { s.setFitProfile(fp); toast.success("Account ready — Fit Profile saved"); nav({ to: "/discover" }); }}
            onSkip={() => { toast("Account ready. Add measurements anytime in Profile."); nav({ to: "/discover" }); }} />
        </div>
      )}
    </div>
  );
}
