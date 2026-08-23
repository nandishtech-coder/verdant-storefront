import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/components/store/cart";
import { CartDrawer } from "@/components/store/CartDrawer";
import { Header } from "@/components/store/Header";
import {
  Blogs,
  InstagramReels,
  FeaturedProducts,
  Footer,
  GiftingBanner,
  Hero,
  Promos,
  QuickNav,
  TrustRibbon,
} from "@/components/store/Sections";

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
          <QuickNav />
          <Promos />
          <FeaturedProducts />
          <GiftingBanner />
          <TrustRibbon />
          <Blogs />
          <InstagramReels />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
