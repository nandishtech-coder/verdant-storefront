import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/50">
            <h1 className="font-display text-4xl font-bold text-forest mb-8">Privacy Policy</h1>
            <div className="prose prose-forest max-w-none text-muted-foreground space-y-6">
              <p>
                At GreenRoots, accessible from greenroots.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GreenRoots and how we use it.
              </p>
              
              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">Information We Collect</h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p>
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
              <p>
                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
              </p>

              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
