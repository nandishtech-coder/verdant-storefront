import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/50">
            <h1 className="font-display text-4xl font-bold text-forest mb-8">Refund Policy</h1>
            <div className="prose prose-forest max-w-none text-muted-foreground space-y-6">
              <p>
                At GreenRoots, we want you to be completely satisfied with your purchase. Since we deal with live plants and perishable goods, our refund and return policy has specific guidelines to ensure fairness and quality.
              </p>
              
              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">Live Plants and Perishables</h2>
              <p>
                Due to the delicate nature of live plants, we generally do not accept returns. However, if your plant arrives damaged or in poor health, please contact us within 24 hours of delivery. Include clear photographs of the plant and packaging so we can assess the situation and offer a replacement or store credit.
              </p>

              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">Hard Goods (Planters, Tools, Accessories)</h2>
              <p>
                We accept returns on unused, non-perishable hard goods within 14 days of delivery. The item must be in its original packaging and in the same condition that you received it. Return shipping costs are the responsibility of the customer unless the item was received defective or incorrect.
              </p>

              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">Refund Process</h2>
              <p>
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within a certain amount of days.
              </p>
              
              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">Cancellations</h2>
              <p>
                Orders can be canceled for a full refund if they have not yet been dispatched. Once an order has left our nursery, it cannot be canceled and will be subject to our standard return policy above.
              </p>
            </div>
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
