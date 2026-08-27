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
  Blogs,
  InstagramReels,
  OurServices,
  FeaturedProducts,
  ProductRow,
  Footer,
  GiftingBanner,
  Hero,
  Promos,
  QuickNav,
  TrustRibbon,
} from "@/components/store/Sections";
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

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main>
          <Hero />
          <Reveal variant="up">
            <QuickNav />
          </Reveal>
          <Reveal variant="zoom">
            <Promos />
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
          <Reveal variant="up">
            <Blogs />
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
        </main>

        <Reveal variant="up">
          <Footer />
        </Reveal>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

