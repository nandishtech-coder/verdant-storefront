import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/50">
            <h1 className="font-display text-4xl font-bold text-forest mb-8">Terms of Service</h1>
            <div className="prose prose-forest max-w-none text-muted-foreground space-y-6">
              <p>
                Welcome to GreenRoots! These terms and conditions outline the rules and regulations for the use of GreenRoots's Website, located at greenroots.com.
              </p>
              
              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">Acceptance of Terms</h2>
              <p>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use GreenRoots if you do not agree to take all of the terms and conditions stated on this page.
              </p>

              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">Cookies</h2>
              <p>
                We employ the use of cookies. By accessing GreenRoots, you agreed to use cookies in agreement with the GreenRoots's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
              </p>

              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">License</h2>
              <p>
                Unless otherwise stated, GreenRoots and/or its licensors own the intellectual property rights for all material on GreenRoots. All intellectual property rights are reserved. You may access this from GreenRoots for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              
              <h2 className="text-2xl font-semibold text-forest mt-8 mb-4">User Comments</h2>
              <p>
                Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website. GreenRoots does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of GreenRoots, its agents, and/or affiliates.
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
