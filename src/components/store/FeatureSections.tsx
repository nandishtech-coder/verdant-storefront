import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gifting from "@/assets/gifting.jpg";
import tools from "@/assets/p-tools.jpg";
import plants from "@/assets/p-plants.jpg";
import seeds from "@/assets/p-seeds.jpg";
import mix from "@/assets/p-mix.jpg";
import nutrient from "@/assets/p-nutrient.jpg";

/* 1. Gifting story — tall image with an overlapping cream panel */
export function GiftsGrowWithTime() {
  return (
    <section aria-labelledby="gifts-grow-heading" className="bg-sand">
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9]">
        <img
          src={gifting}
          alt="Peace lily in a white planter tied with a gold ribbon and gift tag"
          loading="lazy"
          width={1200}
          height={1500}
          className="size-full object-cover"
        />
      </div>
      <div className="relative -mt-10 rounded-tr-[3rem] bg-sand px-6 pt-10 pb-14 sm:-mt-16 sm:rounded-tr-[5rem] sm:px-10 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-3xl">
          <h2
            id="gifts-grow-heading"
            className="font-display text-3xl leading-tight font-semibold text-forest lg:text-5xl"
          >
            Because the Best Gifts Grow with Time
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-forest/80 lg:text-lg">
            Celebrate birthdays, anniversaries and milestones with plants and green gifts that last
            longer than moments.
          </p>
          <Button
            size="lg"
            asChild
            className="mt-8 h-14 w-full rounded-none bg-forest px-8 text-base font-semibold text-forest-foreground hover:bg-forest-deep sm:w-auto"
          >
            <a href="#gifting">Explore Gifting Range</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* 2. Fan Favorites — rotated diamond collage */
const DIAMONDS = [
  { image: tools, alt: "Gardening tools laid out on soil", cls: "col-start-2 row-start-1" },
  {
    image: plants,
    alt: "Watering can with plant care essentials",
    cls: "col-start-1 row-start-2",
  },
  { image: mix, alt: "Trays of fresh microgreens", cls: "col-start-3 row-start-2" },
  {
    image: seeds,
    alt: "Gardeners standing in a flowering kitchen garden",
    cls: "col-start-2 row-start-3",
  },
];

export function FanFavorites() {
  return (
    <section aria-labelledby="fan-favorites-heading" className="bg-sand px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto grid w-full max-w-lg grid-cols-3 grid-rows-3 place-items-center gap-1">
          {DIAMONDS.map((d) => (
            <div
              key={d.alt}
              className={`${d.cls} aspect-square w-full rotate-45 overflow-hidden shadow-[var(--shadow-soft)]`}
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

        <h2
          id="fan-favorites-heading"
          className="mt-12 text-center font-display text-4xl font-semibold text-forest lg:text-5xl"
        >
          Fan Favorites
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-lg text-forest/75">
          Check out our top plants for the season.
        </p>
        <Button
          size="lg"
          asChild
          className="mt-8 h-14 w-full rounded-none bg-clay px-8 text-base font-semibold text-forest-foreground hover:bg-clay/90"
        >
          <a href="#products">Shop Best Sellers</a>
        </Button>
      </div>
    </section>
  );
}

/* 3. Latest Blogs — editorial cards */
const LATEST_POSTS = [
  {
    tag: "Best Plants for Gifting",
    date: "Aug 05, 2026",
    title: "Best Plants to Gift This Raksha Bandhan",
    excerpt:
      "Chocolates get eaten. Cards get put in a drawer. A plant, on the other hand, keeps growing on someone's desk or windowsill…",
    image: plants,
  },
  {
    tag: "Composting at Home",
    date: "Jul 28, 2026",
    title: "Kitchen Scraps to Liquid Gold in 30 Days",
    excerpt:
      "A balcony-sized compost bin, five minutes a week and the right carbon-to-nitrogen balance is all it takes to feed your pots for free…",
    image: mix,
  },
  {
    tag: "Seasonal Care",
    date: "Jul 14, 2026",
    title: "Monsoon Plant Care: Preventing Root Rot",
    excerpt:
      "Heavy rain means soggy soil, and soggy soil is where most balcony plants quietly give up. Here is the drainage checklist we swear by…",
    image: nutrient,
  },
];

export function LatestBlogs() {
  return (
    <section aria-labelledby="latest-blogs-heading" className="bg-sand px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <h2
          id="latest-blogs-heading"
          className="font-display text-4xl font-semibold text-forest lg:text-5xl"
        >
          Latest Blogs
        </h2>
        <span className="mt-4 block h-1 w-24 bg-clay" />

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {LATEST_POSTS.map((post) => (
            <article key={post.title} className="group bg-card shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  width={900}
                  height={560}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-6 left-6 bg-clay px-5 py-3 text-xs font-semibold tracking-[0.12em] text-forest-foreground uppercase">
                  {post.tag}
                </span>
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {post.date} <span className="text-clay">•</span> GreenRoots
                </p>
                <h3 className="mt-4 font-display text-2xl leading-snug font-semibold text-forest">
                  {post.title}
                </h3>
                <p className="mt-4 leading-relaxed text-forest/75">{post.excerpt}</p>
                <a
                  href="#top"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-clay uppercase"
                >
                  Read article
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
