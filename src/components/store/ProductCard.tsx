import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { inr, type Product } from "@/lib/store-data";
import { useCart } from "./cart";

export function ProductCard({ product }: { product: Product }) {
  const { add, setQty, setOpen, lines, wishlist, toggleWishlist } = useCart();
  const [variant, setVariant] = useState(product.variants[0] ?? "Default");
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const wished = wishlist.includes(product.id);

  const cartLine = lines.find((l) => l.key === `${product.id}::${variant}`);
  const qty = cartLine ? cartLine.qty : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Link to="/product/$id" params={{ id: product.id }} className="block size-full">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={900}
            height={900}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        {product.badge && (
          <Badge className="absolute top-3 left-3 rounded-full">{product.badge}</Badge>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-card/90 text-forest backdrop-blur transition-colors hover:bg-card"
        >
          <Heart className={cn("size-4", wished && "fill-clay text-clay")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-clay text-clay" />
          <span className="font-medium text-forest">{product.rating}</span>
          <span>({product.reviews.toLocaleString("en-IN")})</span>
        </div>

        <h3 className="line-clamp-2 text-sm leading-snug font-medium text-forest hover:underline">
          <Link to="/product/$id" params={{ id: product.id }}>
            {product.title}
          </Link>
        </h3>

        <div>
          <p className="mb-1.5 text-[11px] tracking-wide text-muted-foreground uppercase">
            {product.variantLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs transition-colors",
                  variant === v
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-forest",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold text-forest">
                {inr(product.price)}
              </span>
              <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
            </div>
            <span className="text-xs font-medium text-primary">{off}% off</span>
          </div>
          {qty > 0 ? (
            <div className="flex flex-col gap-2 items-end">
              <div className="flex h-9 items-center rounded-xl border border-border bg-card">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-none rounded-l-xl text-muted-foreground hover:text-forest"
                  onClick={() => setQty(`${product.id}::${variant}`, qty - 1)}
                >
                  <Minus className="size-3.5" />
                </Button>
                <span className="flex min-w-[2rem] items-center justify-center text-sm font-semibold text-forest">
                  {qty}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-none rounded-r-xl text-muted-foreground hover:text-forest"
                  onClick={() => add(product, variant, false)}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
              <Button
                size="sm"
                className="h-7 w-full rounded-lg text-[10px] tracking-wide uppercase"
                onClick={() => setOpen(true)}
              >
                Go to Cart
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="rounded-xl h-9"
              onClick={() => add(product, variant, false)}
              aria-label={`Add ${product.title} to cart`}
            >
              <Plus className="size-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
