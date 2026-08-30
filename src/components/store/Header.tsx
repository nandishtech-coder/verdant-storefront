import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const fullText = "Search for seeds, plants, planters & more...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setPlaceholderText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length + 10) {
        currentIndex = 0;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = searchQuery.trim()
    ? PRODUCTS.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="bg-cream/95 backdrop-blur-md pb-3 lg:pb-0">
        <div className="mx-auto flex w-full flex-wrap items-center gap-y-3 gap-x-2 sm:gap-x-4 px-3 sm:px-4 py-3 lg:px-8">
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
                        {n.items.map((i, idx) => {
                          const href = (n as any).hrefs ? (n as any).hrefs[idx] : "#products";
                          const isInternalRoute = href.startsWith("/");
                          return (
                            <li key={i}>
                              {isInternalRoute ? (
                                <Link to={href} className="text-sm text-muted-foreground block w-full">
                                  {i}
                                </Link>
                              ) : (
                                <a href={href} className="text-sm text-muted-foreground">
                                  {i}
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SheetContent>
          </Sheet>

          <a href="#top" className="flex items-center gap-2">
            <span className="logo-glow grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-card lg:size-16">
              <img
                src="/logo.png"
                alt="GreenRoots"
                className="size-full scale-[1.02] object-cover"
              />
            </span>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-xl font-bold tracking-[0.1em] text-forest uppercase lg:text-2xl drop-shadow-sm" style={{ color: '#2C5A2E' }}>
                GREENROOTS
              </span>
              <span className="text-[0.6rem] font-bold tracking-widest text-forest uppercase mt-[-2px]" style={{ color: '#2C5A2E' }}>
                Learn. Grow. Harvest.
              </span>
            </div>
          </a>

          {/* Spacer for mobile so icons push right */}
          <div className="flex-1 lg:hidden" />

          {/* Big search bar */}
          <div ref={searchRef} className="relative order-last w-full lg:order-none lg:w-auto lg:flex-1 z-50">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary pointer-events-none" />
            <Input
              type="search"
              placeholder={placeholderText}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="h-12 w-full rounded-2xl border-border bg-card pl-12 pr-4 shadow-[var(--shadow-soft)] transition-all hover:border-primary focus-visible:ring-1 focus-visible:ring-primary lg:h-14 lg:text-base"
            />
            {showResults && searchQuery.trim() !== "" && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-2xl border border-border bg-cream p-2 shadow-lg max-h-80 overflow-hidden">
                <ul className="max-h-72 overflow-y-auto space-y-1 pr-1">
                  {results.length === 0 ? (
                    <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                      No matches — try a broader term.
                    </li>
                  ) : (
                    results.map((p) => (
                      <li key={p.id}>
                        <Link 
                          to="/product/$id"
                          params={{ id: p.id }}
                          onClick={() => setShowResults(false)}
                          className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-secondary"
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            width={44}
                            height={44}
                            className="size-11 rounded-lg object-cover"
                          />
                          <span className="line-clamp-1 text-sm text-forest font-medium">{p.title}</span>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          <nav className="hidden items-center xl:flex">
            {NAV.map((n) => (
              <div key={n.label} className="group relative">
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-secondary">
                  {n.label}
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute top-full left-0 w-56 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {n.items.map((i, idx) => {
                    const href = (n as any).hrefs ? (n as any).hrefs[idx] : "#products";
                    const isInternalRoute = href.startsWith("/");
                    const className = "block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-forest";
                    return isInternalRoute ? (
                      <Link key={i} to={href} className={className}>
                        {i}
                      </Link>
                    ) : (
                      <a key={i} href={href} className={className}>
                        {i}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1 lg:ml-auto">
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative size-9 sm:size-10">
              <Heart className="size-4 sm:size-5" />
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
              className="relative size-9 sm:size-10"
            >
              <User className="size-4 sm:size-5" />
            </Button>
            <Button
              onClick={() => setOpen(true)}
              className="relative ml-0.5 sm:ml-1 rounded-xl h-9 sm:h-10 px-2.5 sm:px-4"
              aria-label="Open cart"
            >
              <ShoppingBag className="size-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-1.5 -right-1.5 sm:static sm:-top-auto sm:-right-auto grid min-w-4 sm:min-w-5 place-items-center rounded-full bg-forest px-1 text-[10px] sm:text-xs font-semibold text-forest-foreground border-2 border-cream sm:border-none">
                {count}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
