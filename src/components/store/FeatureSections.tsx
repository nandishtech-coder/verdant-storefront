import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gifting from "@/assets/gifting.jpg";
import tools from "@/assets/p-tools.jpg";
import plants from "@/assets/p-plants.jpg";
import seeds from "@/assets/p-seeds.jpg";
import mix from "@/assets/p-mix.jpg";
import nutrient from "@/assets/p-nutrient.jpg";
import servicesPeaceLily from "@/assets/services-peace-lily.jpg";
import monstera from "@/assets/plant-monstera.png";
import fiddleLeaf from "@/assets/plant-fiddle.png";
import snakePlant from "@/assets/plant-snake.png";
import pothos from "@/assets/plant-pothos.png";
import blogRakhi from "@/assets/blog-rakhi.png";
import blogCompost from "@/assets/blog-compost.png";
import blogKitchen from "@/assets/blog-kitchen.png";

/* 1. Gifting story — side-by-side layout with overlapping images */
export function GiftsGrowWithTime() {
  return (
    <section aria-labelledby="gifts-grow-heading" className="bg-sand py-16 lg:py-24">
      <div className="mx-auto w-full px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="overflow-hidden rounded-3xl aspect-[4/5] shadow-[var(--shadow-soft)]">
              <img
                src={servicesPeaceLily}
                alt="Balcony garden with peace lily"
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-3xl aspect-[4/5] mt-10 sm:mt-16 shadow-[var(--shadow-soft)]">
              <img
                src={gifting}
                alt="Gifting plants"
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="max-w-xl">
            <h2
              id="gifts-grow-heading"
              className="font-display text-4xl leading-tight font-semibold text-forest lg:text-5xl lg:leading-[1.1]"
            >
              Because the Best Gifts Grow with Time
            </h2>
            <p className="mt-6 text-base leading-relaxed text-forest/80 sm:text-lg">
              Celebrate birthdays, anniversaries and milestones with plants and green gifts that last
              longer than moments. Delight your loved ones with beautifully curated plant hampers and 
              eco-friendly gifts for every occasion.
            </p>
            <Button
              size="lg"
              asChild
              className="mt-10 h-14 w-full rounded-full bg-forest px-8 text-base font-medium text-forest-foreground hover:bg-forest-deep sm:w-auto"
            >
              <a href="#gifting">
                Explore Gifting Range
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

/* 2. Fan Favorites — rotated diamond collage */
const DIAMONDS = [
  { image: monstera, alt: "Beautiful Monstera Deliciosa in a terracotta pot", cls: "col-start-2 row-start-1" },
  {
    image: fiddleLeaf,
    alt: "Tall Fiddle Leaf Fig tree in a white ceramic planter",
    cls: "col-start-1 row-start-2",
  },
  { image: snakePlant, alt: "Snake Plant in a dark geometric planter", cls: "col-start-3 row-start-2" },
  {
    image: pothos,
    alt: "Golden Pothos trailing from a hanging macrame planter",
    cls: "col-start-2 row-start-3",
  },
];

export function FanFavorites() {
  return (
    <section aria-labelledby="fan-favorites-heading" className="bg-sand py-16 lg:py-24">
      <div className="mx-auto w-full px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          
          <div className="mx-auto grid w-full max-w-md grid-cols-3 grid-rows-3 place-items-center gap-2 lg:mx-0 lg:max-w-lg">
            {DIAMONDS.map((d) => (
              <div
                key={d.alt}
                className={`${d.cls} aspect-square w-full rotate-45 overflow-hidden shadow-[var(--shadow-soft)] transition-transform duration-500 hover:scale-105 hover:z-10`}
              >
                <img
                  src={d.image}
                  alt={d.alt}
                  loading="lazy"
                  width={600}
                  height={600}
                  className="size-full -rotate-45 scale-150 object-cover"
                />
              </div>
            ))}
          </div>

          <div className="max-w-xl text-center lg:text-left">
            <h2
              id="fan-favorites-heading"
              className="font-display text-4xl leading-tight font-semibold text-forest lg:text-5xl lg:leading-[1.1]"
            >
              Fan Favorites
            </h2>
            <p className="mt-6 text-base leading-relaxed text-forest/80 sm:text-lg">
              Check out our top plants for the season.
            </p>
            <Button
              size="lg"
              asChild
              className="mt-10 h-14 w-full rounded-full bg-clay px-8 text-base font-medium text-forest-foreground hover:bg-clay/90 sm:w-auto"
            >
              <a href="#products">
                Shop Best Sellers
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

/* 3. Latest Blogs — editorial cards */
const LATEST_POSTS = [
  {
    tag: "BEST PLANTS FOR GIFTING",
    date: "AUG 05, 2026",
    title: "Best Plants to Gift This Raksha Bandhan",
    excerpt:
      "Chocolates get eaten. Cards get put in a drawer. A plant, on the other hand, keeps growing on someone's desk or windo...",
    image: blogRakhi,
  },
  {
    tag: "",
    date: "JUL 25, 2026",
    title: "Home Composting 101: Turn Your Kitchen Scraps into Free Plant Food",
    excerpt:
      "Every day, Indian households throw out vegetable peels, tea leaves, eggshells, and fruit scraps that could be feeding...",
    image: blogCompost,
  },
  {
    tag: "",
    date: "JUL 18, 2026",
    title: "Your First Kitchen Garden: 7 Steps to Get Started This Week",
    excerpt:
      "Fresh coriander whenever a recipe needs it. Tomatoes you know weren't sprayed with anything. A palak harvest that cos...",
    image: blogKitchen,
  },
];

export function LatestBlogs() {
  return (
    <section aria-labelledby="latest-blogs-heading" className="bg-sand px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2
              id="latest-blogs-heading"
              className="font-display text-4xl font-semibold text-forest lg:text-5xl"
            >
              Latest Blogs
            </h2>
            <span className="mt-4 block h-1 w-24 bg-clay" />
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {LATEST_POSTS.map((post) => (
            <article key={post.title} className="group hover-lift bg-card shadow-[var(--shadow-soft)] flex flex-col rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  width={900}
                  height={560}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {post.tag && (
                  <span className="absolute top-6 left-6 bg-clay px-5 py-3 text-xs font-semibold tracking-[0.12em] text-forest-foreground uppercase">
                    {post.tag}
                  </span>
                )}
              </div>
              <div className="p-6 lg:p-8 flex flex-col flex-grow">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {post.date} <span className="text-clay">•</span> MUG URBAN GREEN
                </p>
                <h3 className="mt-4 font-display text-2xl leading-snug font-semibold text-forest">
                  {post.title}
                </h3>
                <p className="mt-4 leading-relaxed text-forest/75 flex-grow">{post.excerpt}</p>
                <a
                  href="#top"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-clay uppercase"
                >
                  READ ARTICLE
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            asChild
            className="h-14 rounded-none bg-clay px-10 text-sm font-semibold tracking-[0.1em] text-white uppercase hover:bg-clay/90"
          >
            <a href="#blogs">
              VIEW ALL ARTICLES
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
