import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CalendarDays, Phone, Mail, Loader2, Send } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listServices } from "@/lib/services.functions";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { serviceIcon } from "@/lib/service-icons";

const PHONE = "+916360988785";
const PHONE_DISPLAY = "+91 63609 88785";

export const Route = createFileRoute("/service/$id")({
  head: () => ({
    meta: [
      { title: "Service Details — GreenRoots" },
      {
        name: "description",
        content: "Explore GreenRoots gardening services, inclusions, and consultation options.",
      },
      { property: "og:title", content: "Service Details — GreenRoots" },
      {
        property: "og:description",
        content: "Explore GreenRoots gardening services, inclusions, and consultation options.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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

function EnquiryDialog({
  open,
  onOpenChange,
  serviceTitle,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  serviceTitle: string;
}) {
  const submitFn = useServerFn(submitEnquiry);
  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: () => {
      toast.success("Enquiry sent successfully! We'll get back to you shortly.");
      onOpenChange(false);
    },
    onError: (err: Error) => toast.error(err.message || "Failed to submit enquiry."),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-forest">Send an Enquiry</DialogTitle>
          <DialogDescription>
            Tell us about your requirement for {serviceTitle.toLowerCase()} and our team will reach out.
          </DialogDescription>
        </DialogHeader>
        <form
          className="mt-2 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget).entries());
            mutation.mutate({
              data: {
                name: String(data["fullName"] ?? "").trim().slice(0, 100),
                phone: String(data["phone"] ?? "").trim().slice(0, 20),
                email: String(data["email"] ?? "").trim().slice(0, 255),
                interested_in: serviceTitle,
                message: String(data["message"] ?? "").trim().slice(0, 1000),
              },
            });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest" htmlFor="svc-enq-name">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input id="svc-enq-name" name="fullName" required maxLength={100} placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest" htmlFor="svc-enq-phone">
                Phone / WhatsApp <span className="text-destructive">*</span>
              </label>
              <Input id="svc-enq-phone" name="phone" required maxLength={20} placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-forest" htmlFor="svc-enq-email">Email Address</label>
            <Input id="svc-enq-email" name="email" type="email" maxLength={255} placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-forest" htmlFor="svc-enq-msg">
              Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="svc-enq-msg"
              name="message"
              required
              maxLength={1000}
              className="min-h-[110px]"
              placeholder={`I'd like to know more about ${serviceTitle.toLowerCase()}...`}
            />
          </div>
          <Button type="submit" size="lg" disabled={mutation.isPending} className="w-full rounded-xl">
            {mutation.isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Send className="mr-2 size-4" />
            )}
            {mutation.isPending ? "Sending..." : "Send My Enquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ServicePage() {
  const { id } = Route.useParams();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
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
  const paragraphs = (service.about ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const includes = service.includes ?? [];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={service.image_url}
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
            <span className="size-16 shrink-0 place-items-center rounded-2xl bg-white/20 text-white backdrop-blur-md shadow-sm border border-white/10 hidden md:grid">
              <Icon className="size-8" />
            </span>
            <div>
              <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="max-w-2xl text-lg text-white/90 leading-relaxed">
                {service.description}
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
            {paragraphs.length > 0 && (
              <div>
                <h2 className="font-display text-3xl font-semibold text-forest mb-6">About this service</h2>
                {paragraphs.map((p, i) => (
                  <p key={i} className={`text-lg text-muted-foreground leading-relaxed ${i ? "mt-4" : ""}`}>
                    {p}
                  </p>
                ))}
              </div>
            )}

            {includes.length > 0 && (
              <div>
                <h3 className="font-display text-2xl font-semibold text-forest mb-6">What's Included</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div>
            <div className="sticky top-24 rounded-3xl bg-white border border-border/50 p-8 shadow-xl shadow-black/[0.03]">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <CalendarDays className="size-7" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-forest mb-3">
                {service.cta_heading || "Book a Consultation"}
              </h3>
              <p className="text-muted-foreground mb-8">
                {service.cta_note ||
                  `Ready to get started with ${service.title.toLowerCase()}? Get in touch with our experts today.`}
              </p>

              <div className="space-y-4 mb-8">
                <Button asChild size="lg" className="w-full rounded-xl text-base shadow-md group">
                  <a href={`tel:${PHONE}`}>
                    <Phone className="size-4 mr-2 group-hover:animate-pulse" />
                    Call us to book · {PHONE_DISPLAY}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl text-base border-primary/20 hover:bg-primary/5 text-forest"
                  onClick={() => setEnquiryOpen(true)}
                >
                  <Mail className="size-4 mr-2" />
                  Send an Enquiry
                </Button>
              </div>

              <div className="rounded-2xl bg-secondary/50 p-4 text-center">
                <p className="text-sm text-forest font-medium">Have specific requirements?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {service.footnote ||
                    "We offer fully customized solutions tailored to your unique space."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryDialog open={enquiryOpen} onOpenChange={setEnquiryOpen} serviceTitle={service.title} />
    </div>
  );
}
