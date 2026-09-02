import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Inbox, Leaf, Loader2, LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { claimAdminRole, getAdminOverview, setEnquiryStatus } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";

const title = "Admin Dashboard — GreenRoots";
const description = "Review and manage GreenRoots customer enquiries.";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate({ from: Route.fullPath });
  const queryClient = useQueryClient();
  const fetchOverview = useServerFn(getAdminOverview);
  const claimRole = useServerFn(claimAdminRole);
  const updateStatus = useServerFn(setEnquiryStatus);
  const overview = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOverview(),
  });

  const claim = useMutation({
    mutationFn: () => claimRole(),
    onSuccess: async (result) => {
      if (!result.granted) {
        toast.error("An administrator already exists.");
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      toast.success("Administrator access activated.");
    },
    onError: () => toast.error("Could not activate administrator access."),
  });

  const status = useMutation({
    mutationFn: (data: { id: string; status: string }) => updateStatus({ data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      toast.success("Enquiry updated.");
    },
    onError: () => toast.error("Could not update the enquiry."),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  };

  if (overview.isPending) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary">
        <Loader2 className="size-7 animate-spin text-forest" aria-label="Loading dashboard" />
      </main>
    );
  }

  if (overview.isError) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl font-semibold text-forest">Dashboard unavailable</h1>
          <p className="mt-3 text-muted-foreground">Please refresh the page or sign in again.</p>
          <Button className="mt-6" onClick={() => overview.refetch()}>Try again</Button>
        </div>
      </main>
    );
  }

  if (!overview.data.isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary px-4">
        <section className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
          <ShieldCheck className="mx-auto size-10 text-forest" />
          <h1 className="mt-5 font-display text-3xl font-semibold text-forest">Administrator access</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This account does not have administrator permissions. If this is the first account, you
            can activate it now.
          </p>
          <Button className="mt-7 w-full" disabled={claim.isPending} onClick={() => claim.mutate()}>
            {claim.isPending ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            Activate admin access
          </Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={signOut}>Sign out</Button>
        </section>
      </main>
    );
  }

  const enquiries = overview.data.enquiries;

  return (
    <main className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-forest text-forest-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-forest-foreground/10">
              <Leaf className="size-5" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold">GreenRoots</p>
              <p className="text-xs text-forest-foreground/70">Admin dashboard</p>
            </div>
          </div>
          <Button variant="ghost" className="text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground" onClick={signOut}>
            <LogOut />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-leaf">Customer care</p>
            <h1 className="mt-1 font-display text-4xl font-semibold text-forest">Enquiries</h1>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-right shadow-[var(--shadow-soft)]">
            <p className="text-2xl font-semibold text-forest">{enquiries.length}</p>
            <p className="text-xs text-muted-foreground">Total received</p>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <section className="mt-8 rounded-xl border border-border bg-card px-6 py-16 text-center shadow-[var(--shadow-soft)]">
            <Inbox className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-forest">No enquiries yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">New customer messages will appear here.</p>
          </section>
        ) : (
          <div className="mt-8 grid gap-4">
            {enquiries.map((enquiry: any) => (
              <article key={enquiry.id} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-display text-xl font-semibold text-forest">{enquiry.name}</h2>
                      <a className="break-all text-sm text-leaf hover:underline" href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(enquiry.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground">{enquiry.message}</p>
                  </div>
                  <Select
                    value={enquiry.status}
                    disabled={status.isPending}
                    onValueChange={(value) => status.mutate({ id: enquiry.id, status: value })}
                  >
                    <SelectTrigger className="w-full sm:w-40" aria-label={`Status for ${enquiry.name}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}