import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/components/store/cart";
import { Reveal } from "@/components/store/Reveal";
import { CartDrawer } from "@/components/store/CartDrawer";
import { Header } from "@/components/store/Header";
import {
  GiftsGrowWithTime,
  FanFavorites,
  LatestBlogs,
} from "@/components/store/FeatureSections";
import {
  InstagramReels,
  OurServices,
  FeaturedProducts,
  ProductRow,
  Footer,
  GiftingBanner,
  Hero,
  MainServices,
  TrustRibbon,
} from "@/components/store/Sections";
import { HorticultureWorkforce } from "@/components/store/HorticultureWorkforce";
import {
  ReviewsSection,
  ContactSection,
  MapSection,
  StatsSection,
} from "@/components/store/ExtraSections";

const title = "GreenRoots — Seeds, Planters & Organic Plant Care";
const description =
  "Shop heirloom seeds, studio ceramic planters, organic potting mix and bio-nutrients for balcony and terrace gardens. Free shipping over ₹1,999.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

let hasInitiallyLoaded = false;

function Index() {
  const [isLoading, setIsLoading] = useState(!hasInitiallyLoaded);

  useEffect(() => {
    if (hasInitiallyLoaded) return;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      hasInitiallyLoaded = true;
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main>
          {isLoading ? (
            <div className="flex h-[80vh] flex-col items-center justify-center gap-10">
              <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute size-32 rounded-full border-[4px] border-forest/20 border-t-forest animate-[spin_2s_linear_infinite]" />
                
                {/* Inner Ring */}
                <div className="absolute size-24 rounded-full border-[4px] border-clay/20 border-b-clay border-l-clay animate-[spin_1.5s_linear_infinite_reverse]" />
                
                {/* Center Logo */}
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-forest text-cream shadow-xl">
                  <Leaf className="size-7 animate-pulse" />
                </div>
              </div>
              <p className="font-display text-2xl font-semibold text-forest tracking-wide animate-pulse mt-8">
                Growing your experience...
              </p>
            </div>
          ) : (
            <>
              <Hero />

              <Reveal variant="up">
                <MainServices />
              </Reveal>
              <Reveal variant="up">
                <HorticultureWorkforce />
              </Reveal>
              <Reveal variant="up">
                <FeaturedProducts />
              </Reveal>
              <Reveal variant="left">
                <ProductRow title="Premium Ceramic Pots" filterTag="Ceramic Planters" />
              </Reveal>
              <Reveal variant="right">
                <ProductRow title="Bio Organic Cleaning Essentials" filterTag="Plant Care" />
              </Reveal>
              <Reveal variant="zoom">
                <GiftingBanner />
              </Reveal>

              <Reveal variant="blur">
                <InstagramReels />
              </Reveal>
              <Reveal variant="up">
                <OurServices />
              </Reveal>
              <Reveal variant="left">
                <GiftsGrowWithTime />
              </Reveal>
              <Reveal variant="zoom">
                <FanFavorites />
              </Reveal>
              <Reveal variant="up">
                <LatestBlogs />
              </Reveal>
              <Reveal variant="up">
                <ReviewsSection />
              </Reveal>
              <Reveal variant="left">
                <ContactSection />
              </Reveal>
              <Reveal variant="blur">
                <MapSection />
              </Reveal>
              <Reveal variant="zoom">
                <StatsSection />
              </Reveal>
            </>
          )}
        </main>

        <Reveal variant="up">
          <Footer />
        </Reveal>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

