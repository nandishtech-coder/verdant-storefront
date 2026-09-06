import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Inbox, Leaf, Loader2, LogOut, ShieldCheck, LayoutDashboard, FolderTree, Package, PlaySquare, FileText, Users, Menu, Gift } from "lucide-react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CustomLoader } from "@/components/ui/custom-loader";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { WorkforceManager } from "@/components/admin/WorkforceManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { ReelsManager } from "@/components/admin/ReelsManager";
import { BlogsManager } from "@/components/admin/BlogsManager";
import { UpdatesManager } from "@/components/admin/UpdatesManager";
import { GreenGiftsManager } from "@/components/admin/GreenGiftsManager";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
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

  const [enquiryTab, setEnquiryTab] = useState("all");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <CustomLoader text="Loading dashboard..." />
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
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm p-0 bg-cream">
                <SheetHeader className="bg-forest px-5 py-5 text-left text-forest-foreground">
                  <SheetTitle className="text-forest-foreground font-display flex items-center gap-2">
                    <Leaf className="size-5" /> GreenRoots Admin
                  </SheetTitle>
                </SheetHeader>
                <div className="p-3 flex flex-col gap-1">
                  <Button variant={adminTab === "dashboard" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("dashboard"); setIsMobileMenuOpen(false); }}>
                    <LayoutDashboard className="mr-2 size-4" /> Dashboard
                  </Button>
                  <Button variant={adminTab === "services" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("services"); setIsMobileMenuOpen(false); }}>
                    <Leaf className="mr-2 size-4" /> Our Services
                  </Button>
                  <Button variant={adminTab === "workforce" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("workforce"); setIsMobileMenuOpen(false); }}>
                    <Users className="mr-2 size-4" /> Professional Workforce
                  </Button>
                  <Button variant={adminTab === "categories" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("categories"); setIsMobileMenuOpen(false); }}>
                    <FolderTree className="mr-2 size-4" /> Categories
                  </Button>
                  <Button variant={adminTab === "products" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("products"); setIsMobileMenuOpen(false); }}>
                    <Package className="mr-2 size-4" /> Products
                  </Button>
                  <Button variant={adminTab === "reels" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("reels"); setIsMobileMenuOpen(false); }}>
                    <PlaySquare className="mr-2 size-4" /> Reels
                  </Button>
                  <Button variant={adminTab === "blogs" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("blogs"); setIsMobileMenuOpen(false); }}>
                    <FileText className="mr-2 size-4" /> Blogs
                  </Button>
                  <Button variant={adminTab === "updates" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("updates"); setIsMobileMenuOpen(false); }}>
                    <Inbox className="mr-2 size-4" /> Updates
                  </Button>
                  <Button variant={adminTab === "green-gifts" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("green-gifts"); setIsMobileMenuOpen(false); }}>
                    <Gift className="mr-2 size-4" /> Green Gifts Updates
                  </Button>
                  <Button variant={adminTab === "enquiries" ? "secondary" : "ghost"} className="justify-start text-forest" onClick={() => { setAdminTab("enquiries"); setIsMobileMenuOpen(false); }}>
                    <Inbox className="mr-2 size-4" /> Enquiries
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <span className="hidden md:grid size-10 place-items-center rounded-lg bg-forest-foreground/10">
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

      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10 sm:px-6 lg:px-8">
        <Tabs value={adminTab} onValueChange={setAdminTab}>
          <TabsList className="hidden md:inline-flex flex-wrap h-auto">
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="size-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="services">
              <Leaf className="size-4" /> Our Services
            </TabsTrigger>
            <TabsTrigger value="workforce">
              <Users className="size-4" /> Professional Workforce
            </TabsTrigger>
            <TabsTrigger value="categories">
              <FolderTree className="size-4" /> Categories
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className="size-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="reels">
              <PlaySquare className="size-4" /> Reels
            </TabsTrigger>
            <TabsTrigger value="blogs">
              <FileText className="size-4" /> Blogs
            </TabsTrigger>
            <TabsTrigger value="updates">
              <Inbox className="size-4" /> Updates
            </TabsTrigger>
            <TabsTrigger value="green-gifts">
              <Gift className="size-4 mr-2" /> Green Gifts
            </TabsTrigger>
            <TabsTrigger value="enquiries">
              <Inbox className="size-4" /> Enquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            {overview.data.analytics && (
              <AnalyticsDashboard data={overview.data.analytics} enquiries={overview.data.enquiries} adminEmail={overview.data.adminEmail} />
            )}
          </TabsContent>

          <TabsContent value="services" className="mt-8">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="workforce" className="mt-8">
            <WorkforceManager />
          </TabsContent>

          <TabsContent value="green-gifts" className="mt-8">
            <GreenGiftsManager />
          </TabsContent>

          <TabsContent value="enquiries" className="mt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-leaf">Customer care</p>
                <h1 className="mt-1 font-display text-4xl font-semibold text-forest">Enquiries</h1>
              </div>
              <div className="grid grid-cols-2 sm:flex gap-3 text-right w-full sm:w-auto">
                <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
                  <p className="text-2xl font-semibold text-forest">{enquiries.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
                  <p className="text-2xl font-semibold text-forest">
                    {enquiries.filter((e: any) => e.status === 'new').length}
                  </p>
                  <p className="text-xs text-muted-foreground">New</p>
                </div>
                <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
                  <p className="text-2xl font-semibold text-forest">
                    {enquiries.filter((e: any) => e.status === 'in_progress').length}
                  </p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
                  <p className="text-2xl font-semibold text-forest">
                    {enquiries.filter((e: any) => e.status === 'resolved').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" value={enquiryTab} onValueChange={setEnquiryTab} className="mt-8">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              
              {["all", "new", "in_progress", "resolved"].map((tab) => {
                const filteredEnquiries = enquiries.filter((e: any) => tab === "all" || e.status === tab);
                return (
                  <TabsContent key={tab} value={tab}>
                    {filteredEnquiries.length === 0 ? (
                      <section className="mt-8 rounded-xl border border-border bg-card px-6 py-16 text-center shadow-[var(--shadow-soft)]">
                        <Inbox className="mx-auto size-10 text-muted-foreground" />
                        <h2 className="mt-4 font-display text-2xl font-semibold text-forest">No enquiries yet</h2>
                        <p className="mt-2 text-sm text-muted-foreground">New customer messages will appear here.</p>
                      </section>
                    ) : (
                      <div className="grid gap-4">
                        {filteredEnquiries.map((enquiry: any) => (
                          <article key={enquiry.id} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                  <h2 className="font-display text-xl font-semibold text-forest">{enquiry.name}</h2>
                                  {enquiry.email && <a className="break-all text-sm text-leaf hover:underline" href={`mailto:${enquiry.email}`}>{enquiry.email}</a>}
                                  {enquiry.phone && <a className="break-all text-sm text-leaf hover:underline" href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                                  <span>{new Date(enquiry.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                                  {enquiry.interested_in && (
                                    <>
                                      <span>•</span>
                                      <span className="font-medium text-forest capitalize">{enquiry.interested_in.replace(/-/g, ' ')}</span>
                                    </>
                                  )}
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
                  </TabsContent>
                );
              })}
            </Tabs>
          </TabsContent>


          <TabsContent value="categories">
            <div className="mt-8">
              <CategoriesManager />
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="mt-8">
              <ProductsManager />
            </div>
          </TabsContent>

          <TabsContent value="reels">
            <div className="mt-8">
              <ReelsManager />
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <div className="mt-8">
              <BlogsManager />
            </div>
          </TabsContent>

          <TabsContent value="updates">
            <div className="mt-8">
              <UpdatesManager />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}