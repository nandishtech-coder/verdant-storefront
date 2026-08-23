import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useCart } from "./cart";
import { FREE_SHIPPING_THRESHOLD, inr } from "@/lib/store-data";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, savings, setQty, remove, count } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 bg-cream p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-xl text-forest">
            Your Basket ({count})
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Freshly potted and ready to ship across India.
          </SheetDescription>
        </SheetHeader>

        <div className="border-b border-border bg-secondary/60 px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-forest">
            <Truck className="size-4 text-primary" />
            {remaining > 0 ? (
              <span>
                You're <strong>{inr(remaining)}</strong> away from free shipping
              </span>
            ) : (
              <span>
                <strong>Free shipping unlocked</strong> — nice one!
              </span>
            )}
          </div>
          <Progress value={pct} className="mt-3 h-2" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag className="size-6 text-primary" />
              </div>
              <p className="font-display text-lg text-forest">Your basket is empty</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Add a few seed packs or a designer planter to get growing.
              </p>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Continue shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((l) => (
                <li
                  key={l.key}
                  className="flex gap-4 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]"
                >
                  <img
                    src={l.image}
                    alt={l.title}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="size-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-forest">{l.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{l.variant}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(l.key, l.qty - 1)}
                          className="grid size-7 place-items-center rounded-full text-forest transition-colors hover:bg-secondary"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{l.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(l.key, l.qty + 1)}
                          className="grid size-7 place-items-center rounded-full text-forest transition-colors hover:bg-secondary"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-forest">
                          {inr(l.price * l.qty)}
                        </span>
                        <button
                          aria-label={`Remove ${l.title}`}
                          onClick={() => remove(l.key)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border bg-card px-6 py-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-base font-semibold text-forest">{inr(subtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">You save</span>
                <span className="font-medium text-primary">{inr(savings)}</span>
              </div>
            )}
            <Separator className="my-4" />
            <Button size="lg" className="w-full rounded-xl">
              Checkout securely
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Taxes calculated at checkout · UPI, Cards & NetBanking
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
