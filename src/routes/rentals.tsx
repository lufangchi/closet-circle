import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { getUser, type RentalStatus } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/rentals")({
  head: () => ({ meta: [
    { title: "Rentals — Closet Circle" },
    { name: "description", content: "Track rental requests, pickups, returns and reviews." },
    { property: "og:title", content: "Rentals — Closet Circle" },
    { property: "og:description", content: "Your rental journey from request to review." },
  ] }),
  component: Rentals,
});

export const statusTone: Record<RentalStatus, string> = { Requested: "bg-secondary text-secondary-foreground", Confirmed: "bg-accent text-accent-foreground", "Picked Up": "bg-primary text-primary-foreground", Returned: "bg-muted", Completed: "bg-muted text-muted-foreground", Declined: "bg-destructive/10 text-destructive" };

function Rentals() {
  const { pathname } = useLocation();
  const { rentals, allItems } = useStore();
  if (pathname !== "/rentals") return <Outlet />;
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold">Rentals</h1>
      {rentals.map((r) => { const i = allItems.find((x) => x.id === r.itemId)!; return (
        <Link key={r.id} to="/rentals/$id" params={{ id: r.id }} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition hover:shadow-soft">
          <img src={i.image} alt="" className="h-20 w-16 rounded-xl object-cover" />
          <div className="flex-1"><p className="font-medium">{i.title}</p><p className="text-xs text-muted-foreground">from {getUser(r.ownerId).name} · {r.start} → {r.end}</p></div>
          <span className={"rounded-full px-3 py-1 text-xs " + statusTone[r.status]}>{r.status}</span>
        </Link>); })}
    </div>
  );
}
