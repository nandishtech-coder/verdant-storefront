import { useState } from "react";
import {
  ChevronDown,
  Heart,
  Leaf,
  Menu,
  Search,
  ShoppingBag,
  User,
  Zap,
  Truck,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAV, PRODUCTS } from "@/lib/store-data";
import { useCart } from "./cart";

const PERKS = [
  { icon: Truck, text: "Free shipping on orders over ₹1,999" },
  { icon: Zap, text: "Next Day Delivery available in metro areas" },
  { icon: Sprout, text: "Live plants shipped in root-safe packaging" },
  { icon: Leaf, text: "100% organic, non-toxic & pet safe" },
];

function AnnouncementBar() {
  const row = [...PERKS, ...PERKS];
  return (
    <div className="overflow-hidden bg-forest-deep py-2.5 text-forest-foreground">
      <div className="flex w-max marquee-track">
        {row.map((p, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 px-8 text-xs tracking-wide sm:text-sm"
          >
            <p.icon className="size-4 opacity-90" />
            {p.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const results = q.trim()
    ? PRODUCTS.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-cream">
        <DialogHeader>
          <DialogTitle className="font-display text-forest">Search the nursery</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try 'tulsi seeds', 'ceramic pot', 'vermicompost'"
            className="h-12 rounded-xl pl-9"
          />
        </div>
        {q.trim() === "" ? (
          <div className="flex flex-wrap gap-2">
            {["Seed packs", "Potting mix", "Ceramic planters", "Neem spray", "Gifting"].map((t) => (
              <button
                key={t}
                onClick={() => setQ(t)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-forest transition-colors hover:bg-secondary"
              >
                {t}
              </button>
            ))}
          </div>
        ) : (
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {results.length === 0 && (
              <li className="px-2 py-6 text-center text-sm text-muted-foreground">
                No matches — try a broader term.
              </li>
            )}
            {results.map((p) => (
              <li key={p.id}>
                <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-secondary">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={44}
                    height={44}
                    className="size-11 rounded-lg object-cover"
                  />
                  <span className="line-clamp-1 text-sm text-forest">{p.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Header() {
  const { count, setOpen, wishlist } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
          {/* Mobile nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-cream">
              <SheetHeader>
                <SheetTitle className="font-display text-forest">Shop by category</SheetTitle>
              </SheetHeader>
              <Accordion type="single" collapsible className="px-4">
                {NAV.map((n) => (
                  <AccordionItem key={n.label} value={n.label}>
                    <AccordionTrigger className="text-forest">{n.label}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {n.items.map((i) => (
                          <li key={i}>
                            <a href="#products" className="text-sm text-muted-foreground">
                              {i}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SheetContent>
          </Sheet>

          <a href="#top" className="flex items-center">
            <span className="grid size-28 shrink-0 overflow-hidden place-items-center rounded-xl shadow-[var(--shadow-soft)] bg-transparent">
              <img
                src="/logo.png"
                alt="GreenRoots"
                className="size-full object-cover scale-[1.75]"
              />
            </span>
          </a>

          <nav className="mx-auto hidden items-center lg:flex">
            {NAV.map((n) => (
              <div key={n.label} className="group relative">
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-secondary">
                  {n.label}
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute top-full left-0 w-56 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {n.items.map((i) => (
                    <a
                      key={i}
                      href="#products"
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-forest"
                    >
                      {i}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-clay text-[10px] font-semibold text-forest-foreground">
                  {wishlist.length}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account"
              className="hidden sm:inline-flex"
            >
              <User className="size-5" />
            </Button>
            <Button
              onClick={() => setOpen(true)}
              className="relative ml-1 rounded-xl"
              aria-label="Open cart"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="grid min-w-5 place-items-center rounded-full bg-forest px-1.5 text-xs font-semibold text-forest-foreground">
                {count}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
