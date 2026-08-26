import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  Gift,
  Instagram,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Facebook,
  Youtube,
  ShieldCheck,
  Home,
  Truck,
  FlaskConical,
  Clock,
  CalendarDays,
  Search,
  Phone,
  Mail,
  ArrowUp,
  Video,
  X,
  ArrowLeft,
  Building2,
  Flower2,
  Sprout,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { BLOGS, CATEGORY_TABS, PRODUCTS, QUICK_CATEGORIES } from "@/lib/store-data";
import { ProductCard } from "./ProductCard";
import hero from "@/assets/hero-balcony.jpg";
import gifting from "@/assets/gifting.jpg";
import plants from "@/assets/p-plants.jpg";
import ceramic from "@/assets/p-ceramic.jpg";
import servicesPeaceLily from "@/assets/services-peace-lily.jpg";

const SLIDES = [
  {
    image: hero,
    eyebrow: "New season · Monsoon ready",
    title: "GreenRoots Gardening Made Effortless",
    copy: "Seeds, bio-fertilisers and designer planters curated for balconies, terraces and tiny windowsills.",
  },
  {
    image: plants,
    eyebrow: "Bestselling collection",
    title: "Greener Corners, Cleaner Air",
    copy: "Hand-picked indoor plants that thrive in low light and forgive a missed watering or two.",
  },
  {
    image: ceramic,
    eyebrow: "Studio-made in India",
    title: "Planters Worth Showing Off",
    copy: "Small-batch ceramic, clay and metal planters finished by hand, from ₹199.",
  },
];

export function Hero() {
  return (
    <section id="top" className="bg-cream px-4 pt-6 pb-2 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Carousel opts={{ loop: true }} className="overflow-hidden rounded-3xl">
          <CarouselContent className="ml-0">
            {SLIDES.map((s, i) => (
              <CarouselItem key={s.title} className="pl-0">
                <div className="relative min-h-[440px] overflow-hidden rounded-3xl lg:min-h-[560px]">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    width={1600}
                    height={1008}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/10" />
                  <div className="relative flex min-h-[440px] max-w-2xl flex-col justify-center gap-5 p-8 lg:min-h-[560px] lg:p-16">
                    <Badge
                      variant="secondary"
                      className="w-fit rounded-full bg-cream/15 text-cream backdrop-blur"
                    >
                      <Leaf className="size-3.5" />
                      {s.eyebrow}
                    </Badge>
                    <h1 className="font-display text-4xl leading-[1.05] font-semibold text-cream lg:text-6xl">
                      {s.title}
                    </h1>
                    <p className="max-w-lg text-base text-cream/80 lg:text-lg">{s.copy}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" className="rounded-xl" asChild>
                        <a href="#products">
                          Shop Best Sellers
                          <ArrowRight className="size-4" />
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="rounded-xl border-cream/60 bg-transparent text-cream hover:bg-cream hover:text-forest"
                      >
                        <a href="#gifting">Explore Kits</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 hidden size-10 border-none bg-cream/90 text-forest lg:flex" />
          <CarouselNext className="right-4 hidden size-10 border-none bg-cream/90 text-forest lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}

export function QuickNav() {
  return (
    <section className="px-4 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex snap-x gap-6 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6">
          {QUICK_CATEGORIES.map((c) => (
            <a
              key={c.label}
              href="#products"
              className="group flex shrink-0 snap-start flex-col items-center gap-3 text-center"
            >
              <span className="relative size-24 overflow-hidden rounded-full border-2 border-border p-1 transition-colors group-hover:border-primary lg:size-28">
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  width={200}
                  height={200}
                  className="size-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="text-sm font-medium text-forest">
                <span aria-hidden className="mr-1">
                  {c.emoji}
                </span>
                {c.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROMOS = [
  {
    badge: "Value pack",
    title: "Seed Packs",
    highlight: "4 for ₹499",
    copy: "Mix & match vegetables, herbs and blooms.",
    tone: "bg-forest text-cream",
  },
  {
    badge: "Limited time",
    title: "Plant Care",
    highlight: "Flat 15% OFF",
    copy: "Biostimulants, neem sprays & potting mixes.",
    tone: "bg-secondary text-forest",
  },
  {
    badge: "Studio made",
    title: "Designer Planters",
    highlight: "From ₹199",
    copy: "Ceramic, clay, FRP and hanging planters.",
    tone: "bg-sand text-forest",
  },
  {
    badge: "Gifting",
    title: "Green Hampers",
    highlight: "Under ₹999",
    copy: "Ready-to-gift kits with a handwritten note.",
    tone: "bg-primary text-primary-foreground",
  },
];

export function Promos() {
  return (
    <section className="px-4 pb-10 lg:px-8 lg:pb-16">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROMOS.map((p) => (
          <a
            key={p.title}
            href="#products"
            className={cn(
              "group flex flex-col gap-2 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1",
              p.tone,
            )}
          >
            <span className="w-fit rounded-full border border-current/25 px-2.5 py-1 text-[11px] tracking-wide uppercase opacity-80">
              {p.badge}
            </span>
            <h3 className="mt-2 text-sm font-medium opacity-80">{p.title}</h3>
            <p className="font-display text-2xl font-semibold">{p.highlight}</p>
            <p className="text-sm opacity-75">{p.copy}</p>
            <span className="mt-2 flex items-center gap-1 text-sm font-medium">
              Shop now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const [tab, setTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");

  const fullText = "Search for products...";

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

  const list = PRODUCTS.filter((p) => {
    const matchesTab = tab === "All" || p.tags.includes(tab);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="products" className="bg-card px-4 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              Featured this week
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest lg:text-4xl">
              Everything your balcony needs
            </h2>
          </div>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-xl bg-background/50 pl-12 text-forest focus:bg-background transition-colors"
              placeholder={placeholderText}
            />
          </div>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex-wrap justify-start h-auto rounded-xl bg-secondary p-1">
              {CATEGORY_TABS.map((t) => (
                <TabsTrigger key={t} value={t} className="rounded-lg text-xs sm:text-sm">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {list.length > 0 ? (
            list.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function GiftingBanner() {
  return (
    <section id="gifting" className="px-4 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-forest lg:grid-cols-2">
        <div className="relative min-h-72 lg:min-h-[460px]">
          <img
            src={gifting}
            alt="Plant gift hamper with ceramic planter and seed packets"
            loading="lazy"
            width={1200}
            height={912}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 lg:p-14">
          <Badge variant="secondary" className="w-fit rounded-full bg-cream/15 text-cream">
            <Gift className="size-3.5" />
            Corporate & festive gifting
          </Badge>
          <h2 className="font-display text-3xl font-semibold text-cream lg:text-4xl">
            Gifts That Keep Growing
          </h2>
          <p className="max-w-md text-cream/75">
            Curated hampers pairing studio planters with heirloom seeds, organic feed and a simple
            grow guide — packed plastic-free and delivered pan-India with your custom note.
          </p>
          <ul className="grid gap-2 text-sm text-cream/80 sm:grid-cols-2">
            {[
              "Bulk pricing from 25 units",
              "Custom branding & notes",
              "Plastic-free packing",
              "Live plant guarantee",
            ].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Leaf className="size-4 text-cream/60" />
                {i}
              </li>
            ))}
          </ul>
          <Button size="lg" className="w-fit rounded-xl" asChild>
            <a href="#products">
              Explore Gifting Sets
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  {
    icon: ShieldCheck,
    title: "100% Organic & Non-Toxic",
    copy: "Safe around pets, kids and kitchen herbs.",
  },
  {
    icon: Home,
    title: "Built for Balconies",
    copy: "Curated for terrace and small-space growers.",
  },
  { icon: Truck, title: "Express Pan-India Delivery", copy: "Next-day dispatch in metros." },
  {
    icon: FlaskConical,
    title: "50+ Years of Agri Science",
    copy: "Formulations backed by field research.",
  },
];

export function TrustRibbon() {
  return (
    <section className="bg-secondary px-4 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-[var(--shadow-soft)]">
              <t.icon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-forest">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Blogs() {
  return (
    <section className="px-4 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              Gardening guides
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest lg:text-4xl">
              Grow smarter, season by season
            </h2>
          </div>
          <Button variant="outline" className="rounded-xl">
            View all guides
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOGS.map((b) => (
            <article
              key={b.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  width={900}
                  height={560}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {b.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {b.read}
                  </span>
                </div>
                <h3 className="font-display text-lg leading-snug font-semibold text-forest">
                  {b.title}
                </h3>
                <a
                  href="#top"
                  className="mt-auto flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Read Article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelVideo({
  src,
  poster,
  onClick,
  isPlaying,
}: {
  src: string;
  poster: string;
  onClick: () => void;
  isPlaying: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full cursor-pointer group" onClick={onClick}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2 pointer-events-none">
        <Video className="size-4 text-white" />
      </div>

      {/* Overlay UI - Only fully visible when playing (center) */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 md:p-6 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-3">
          <div className="size-8 md:size-10 rounded-full bg-primary/40 backdrop-blur border border-white/40 grid place-items-center">
            <Leaf className="size-4 md:size-5 text-white" />
          </div>
          <span className="text-white font-medium text-xs md:text-sm shadow-black drop-shadow-md">
            greenroots_india
          </span>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-2 md:mb-3 text-white">
            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
              <Heart className="size-5 md:size-6" />
              <span className="text-xs md:text-sm font-medium">104</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
              <MessageCircle className="size-5 md:size-6" />
              <span className="text-xs md:text-sm font-medium">0</span>
            </div>
          </div>
          <p className="text-white text-xs md:text-sm drop-shadow-md line-clamp-2">
            Bring nature home! 🌿 Elevate your space with these beauties. #UrbanGardening
          </p>
        </div>
      </div>
    </div>
  );
}

export function InstagramReels() {
  const REELS = [
    {
      src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1490682143684-14369e18dce8?q=80&w=600&auto=format&fit=crop",
    },
    {
      src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
      poster:
        "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=600&auto=format&fit=crop",
    },
    {
      src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1416879598555-2591eeb00d81?q=80&w=600&auto=format&fit=crop",
    },
    {
      src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
      poster:
        "https://images.unsplash.com/photo-1463320898484-cdefe81a04ad?q=80&w=600&auto=format&fit=crop",
    },
    {
      src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=600&auto=format&fit=crop",
    },
    {
      src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
      poster:
        "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop",
    },
    {
      src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1524397057410-1e775ed476f3?q=80&w=600&auto=format&fit=crop",
    },
    {
      src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
      poster:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop",
    },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % REELS.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + REELS.length) % REELS.length);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const positions = [
    { left: "15%", scale: 0.75, zIndex: 10, opacity: 0.5, brightness: "brightness-50" },
    { left: "30%", scale: 0.85, zIndex: 20, opacity: 0.8, brightness: "brightness-75" },
    {
      left: "50%",
      scale: 1,
      zIndex: 30,
      opacity: 1,
      brightness: "brightness-100 shadow-[0_8px_30px_rgb(0,0,0,0.15)]",
    },
    { left: "70%", scale: 0.85, zIndex: 20, opacity: 0.8, brightness: "brightness-75" },
    { left: "85%", scale: 0.75, zIndex: 10, opacity: 0.5, brightness: "brightness-50" },
  ];

  return (
    <section className="bg-[#FAF7F2] py-20 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-semibold text-forest">Follow us on Instagram</h2>
        <p className="text-muted-foreground mt-4">
          Join our community for daily inspiration and a closer look at our creations
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 h-[450px] md:h-[600px] flex items-center justify-center my-10">
        {/* Navigation Arrows */}
        <button
          className="absolute left-4 md:left-8 z-50 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg hover:bg-white/90 transition-colors border-0"
          onClick={handlePrev}
        >
          <ArrowLeft className="size-6" />
        </button>
        <button
          className="absolute right-4 md:right-12 z-50 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg hover:bg-white/90 transition-colors border-0"
          onClick={handleNext}
        >
          <ArrowRight className="size-6" />
        </button>

        {/* Fixed Cards */}
        {[-2, -1, 0, 1, 2].map((offset, i) => {
          const pos = positions[i]!;
          const isCenter = offset === 0;

          let videoIndex = (currentIndex + offset) % REELS.length;
          if (videoIndex < 0) videoIndex += REELS.length;

          const item = REELS[videoIndex]!;

          return (
            <div
              key={offset}
              className={`absolute top-1/2 transition-all duration-300 ease-in-out ${pos.brightness} rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[9/16] w-[200px] sm:w-[240px] md:w-[320px] bg-black group`}
              style={{
                left: pos.left,
                transform: `translate(-50%, -50%) scale(${pos.scale})`,
                zIndex: pos.zIndex,
                opacity: pos.opacity,
              }}
            >
              <ReelVideo
                src={item.src}
                poster={item.poster}
                isPlaying={isCenter && openIndex === null}
                onClick={() => {
                  if (isCenter) setOpenIndex(videoIndex);
                  else setCurrentIndex(videoIndex);
                }}
              />
            </div>
          );
        })}

        {/* Tapped reel plays here, with this same section still visible behind */}
        {openIndex !== null && (
          <div
            className="absolute inset-0 z-[60] flex items-center justify-center bg-forest/60 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <div
              className="relative aspect-[9/16] h-[85%] max-w-[92vw] overflow-hidden rounded-3xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ReelVideo
                src={REELS[openIndex]!.src}
                poster={REELS[openIndex]!.poster}
                isPlaying
                onClick={() => {}}
              />
              <button
                aria-label="Close reel"
                className="absolute top-3 left-3 z-10 grid size-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                onClick={() => setOpenIndex(null)}
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Button className="rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-black/90 font-medium">
          Visit Instagram
        </Button>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Trees,
    title: "Lawn Care",
    copy: "Seasonal upkeep & restoration",
  },
  {
    icon: Sprout,
    title: "Kitchen Gardening",
    copy: "Fresh herbs & vegetables at home",
  },
  {
    icon: Building2,
    title: "Balcony Gardening",
    copy: "Green spaces made for city living",
  },
  {
    icon: Flower2,
    title: "Vertical Gardening",
    copy: "Living walls for compact spaces",
  },
];

export function OurServices() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (n: number) => {
    const idx = (n + SERVICES.length) % SERVICES.length;
    setActive(idx);
    const el = trackRef.current?.children[idx] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <section aria-labelledby="services-heading" className="bg-forest text-forest-foreground">
      <div className="overflow-hidden leading-[0] text-background">
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          className="block h-10 w-full md:h-16"
          aria-hidden="true"
        >
          <path
            d="M0 12C90-18 144 86 220 36S338-4 408 45s145 37 224-8 155-53 239-4 136 39 202 2 92-13 127 3V0H0Z"
            className="fill-current"
          />
        </svg>
      </div>

      <div className="px-4 pt-2 pb-12 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-3xl">
          <h2
            id="services-heading"
            className="text-center font-display text-3xl font-semibold lg:text-4xl"
          >
            Our Services
          </h2>

          <div className="relative mt-10">
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="flex w-full shrink-0 snap-center flex-col items-center px-6 text-center"
                >
                  <span className="grid size-24 place-items-center border-b border-forest-foreground/40">
                    <service.icon strokeWidth={1.3} className="size-16" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-forest-foreground/70">
                    {service.copy}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="flex items-center gap-2">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => goTo(i)}
                    aria-label={`Show ${s.title}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === active
                        ? "w-6 bg-forest-foreground"
                        : "w-2 bg-forest-foreground/40 hover:bg-forest-foreground/70",
                    )}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/8] lg:aspect-[16/7]">
        <img
          src={servicesPeaceLily}
          alt="Sunlit peace lily in a lush balcony garden"
          loading="lazy"
          width={1400}
          height={900}
          className="size-full object-cover"
        />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 md:mt-20">
      <div className="w-full overflow-hidden leading-[0] text-forest">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block w-full h-[40px] md:h-[80px]"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            className="fill-current"
          />
        </svg>
      </div>
      <div className="bg-forest px-4 pb-8 text-cream lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Info */}
          <div className="flex flex-col lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-cream/10 text-cream">
                <Leaf className="size-6" />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold leading-none">GreenRoots</span>
                <span className="mt-1 text-[10px] tracking-[0.2em] text-cream/70 uppercase">
                  Farm Fresh • Since 2023
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-cream/80">
              Bringing the freshest, 100% certified organic plants directly from our nurseries in
              Karnataka to your family's home — with love, integrity, and zero compromise on
              quality.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, MessageCircle, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-full bg-cream/5 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["NPCP Certified", "FSSAI Licensed", "ISO 22000"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-primary/50 text-primary px-3 py-1 text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-display text-lg font-semibold">Company</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-cream/80">
              {["About Us", "Contact Us", "Our Services"].map((link) => (
                <li key={link}>
                  <a href="#top" className="transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="font-display text-lg font-semibold">Products</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-cream/80">
              {[
                "Fresh Seeds",
                "Indoor Plants",
                "Ceramic Planters",
                "Organic Manures",
                "Garden Tools",
                "Green Gifts",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#top"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <ArrowRight className="size-3.5" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="font-display text-lg font-semibold">Contact Us</h3>
            <ul className="mt-6 space-y-4 text-sm text-cream/80">
              <li>
                <a
                  href="tel:+919481107324"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <Phone className="size-4 shrink-0" />
                  +91 94811 07324
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@greenroots.com"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0" />
                  contact@greenroots.com
                </a>
              </li>
              <li>
                <a
                  href="#top"
                  className="flex items-center gap-3 transition-colors hover:text-[#FF0000]"
                >
                  <Youtube className="size-4 shrink-0" />
                  Watch Our Nursery Stories
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span>Jalahalli, Karnataka 563125</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="size-4 shrink-0 mt-0.5" />
                <span>Mon–Sat: 6AM – 6PM</span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="size-4 shrink-0 mt-0.5" />
                <span>Free delivery above ₹500</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-cream/10 pt-8 flex flex-col gap-4 text-xs text-cream/60 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p>
              © 2026 <span className="text-primary font-medium">GreenRoots</span>. All rights
              reserved. Made with <span className="text-[#FF0000]">❤️</span> in Karnataka, India.
            </p>
            <p>
              Developed By <span className="text-primary font-medium">Nandish-Tech</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div className="flex gap-4">
              <a href="#top" className="transition-colors hover:text-cream">
                Privacy Policy
              </a>
              <a href="#top" className="transition-colors hover:text-cream">
                Terms of Service
              </a>
              <a href="#top" className="transition-colors hover:text-cream">
                Refund Policy
              </a>
            </div>

            <a
              href="#top"
              className="grid size-10 place-items-center rounded-full bg-cream/5 transition-colors hover:bg-primary text-cream"
              aria-label="Scroll to top"
            >
              <ArrowUp className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
