import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CalendarDays, Phone, Mail, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";
import { Button } from "@/components/ui/button";
import { listServices } from "@/lib/services.functions";
import { serviceIcon } from "@/lib/service-icons";

export const Route = createFileRoute("/service/$id")({
  component: ServicePageWrapper,
});

function ServicePageWrapper() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main>
          <ServicePage />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

function ServicePage() {
  const { id } = Route.useParams();
  const fetchServices = useServerFn(listServices);
  const { data: services = [], isPending } = useQuery({
    queryKey: ["services", "public"],
    queryFn: () => fetchServices(),
  });
  const service = services.find((s) => s.slug === id);

  if (isPending) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-7 animate-spin text-primary" aria-label="Loading service" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-forest mb-6">Service not found</h2>
        <Button asChild className="rounded-full">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  const Icon = serviceIcon(service.icon);


  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-16 lg:px-8 max-w-7xl mx-auto">
          <Link
            to="/"
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          
          <div className="flex items-end gap-6">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/20 text-white backdrop-blur-md shadow-sm border border-white/10 hidden md:grid">
              <service.icon className="size-8" />
            </span>
            <div>
              <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="max-w-2xl text-lg text-white/90 leading-relaxed">
                {service.copy}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details & Booking Section */}
      <section className="px-4 py-16 lg:px-8 lg:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-display text-3xl font-semibold text-forest mb-6">About this service</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our {service.title.toLowerCase()} service is designed to bring the beauty and benefits of nature directly to you. We handle everything from the initial planning and design to the final execution, ensuring that your green space thrives. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                Whether you have a sprawling backyard or a compact balcony, our experts will work closely with you to understand your specific needs, environmental conditions, and aesthetic preferences.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-2xl font-semibold text-forest mb-6">What's Included</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Initial site consultation and assessment",
                  "Customized planning and design proposals",
                  "Selection of suitable plants and materials",
                  "Professional installation and setup",
                  "Soil preparation and organic enhancements",
                  "Basic maintenance training and guidelines"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Booking Card */}
          <div>
            <div className="sticky top-24 rounded-3xl bg-white border border-border/50 p-8 shadow-xl shadow-black/[0.03]">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <CalendarDays className="size-7" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-forest mb-3">
                Book a Consultation
              </h3>
              <p className="text-muted-foreground mb-8">
                Ready to get started with {service.title.toLowerCase()}? Get in touch with our experts today.
              </p>
              
              <div className="space-y-4 mb-8">
                <Button size="lg" className="w-full rounded-xl text-base shadow-md group">
                  <Phone className="size-4 mr-2 group-hover:animate-pulse" />
                  Call us to book
                </Button>
                <Button size="lg" variant="outline" className="w-full rounded-xl text-base border-primary/20 hover:bg-primary/5 text-forest">
                  <Mail className="size-4 mr-2" />
                  Email Inquiry
                </Button>
              </div>
              
              <div className="rounded-2xl bg-secondary/50 p-4 text-center">
                <p className="text-sm text-forest font-medium">Have specific requirements?</p>
                <p className="text-xs text-muted-foreground mt-1">We offer fully customized solutions tailored to your unique space.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
