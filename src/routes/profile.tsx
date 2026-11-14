import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { FitProfileForm } from "@/components/fit-profile-form";
import { btn } from "@/components/ui-kit";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
    { title: "Profile — Closet Circle" },
    { name: "description", content: "Your account and private Fit Profile." },
    { property: "og:title", content: "Profile — Closet Circle" },
    { property: "og:description", content: "Manage your account and private measurements." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Profile,
});

function Profile() {
  const s = useStore();
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-5xl">Profile</h1>
        {s.account ? <p className="text-muted-foreground">{s.account.name} · {s.account.email}</p>
          : <p className="text-muted-foreground">No account yet. <Link to="/signup" className="underline">Create one</Link> to save your Fit Profile.</p>}
      </div>
      <section className="rounded-3xl border border-border bg-card p-6">
        <h2 className="mb-1 text-3xl">Fit Profile</h2>
        <p className="mb-5 text-sm text-muted-foreground">{s.fitProfile ? "Update your measurements anytime." : "Add your measurements to unlock personalized Fit Check on item pages."}</p>
        <FitProfileForm key={JSON.stringify(s.fitProfile)} value={s.fitProfile} onSave={(f) => { s.setFitProfile(f); toast.success("Fit Profile saved"); }} />
      </section>
      {!s.account && <Link to="/signup" className={btn}>Create account</Link>}
    </div>
  );
}
