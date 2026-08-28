import {
  Star,
  Lock,
  RefreshCcw,
  PhoneCall,
  Mail,
  MapPin,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
  Youtube,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TESTIMONIALS = [
  {
    rating: 5,
    text: "The studio ceramic planters are absolutely phenomenal. They perfectly complement my living room decor. GreenRoots is my go-to for all things plants.",
    author: "Rajesh Nair",
    product: "Ceramic Planters",
    location: "Mysuru",
    avatar: "👨🏽",
  },
  {
    rating: 5,
    text: "Switched to their organic potting mix six months ago. My balcony garden has never looked better. The delivery is always on time and packaging is eco-friendly.",
    author: "Anil Kumar",
    product: "Organic Potting Mix",
    location: "Shivamogga",
    avatar: "👨🏻",
  },
  {
    rating: 5,
    text: "The heirloom seeds germinated so quickly and the yield has been fantastic! So fulfilling to grow my own herbs. Ordering this for life.",
    author: "Priya Shankar",
    product: "Herb Seed Pack",
    location: "Hassan",
    avatar: "👩🏽",
  },
  {
    rating: 5,
    text: "As an interior designer, I am very particular about indoor plants. GreenRoots ticks every box — healthy plants, beautiful pots, delivered fresh. My clients love the results!",
    author: "Sunita Reddy",
    product: "Indoor Plants",
    location: "Hubballi",
    avatar: "👩🏻",
  },
];

export function ReviewsSection() {
  const row = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-sand px-4 py-16 lg:px-8">
      <div className="mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-4xl font-semibold text-forest lg:text-5xl">
              Our Testimonials
            </h2>
            <span className="mt-4 block h-1 w-24 bg-clay" />
          </div>
        </div>

        <div className="overflow-hidden pb-8">
          <div className="group flex w-max marquee-track gap-6 hover:[animation-play-state:paused]">
            {row.map((t, idx) => (
              <div
                key={idx}
                className="hover-lift flex w-[300px] flex-col justify-between rounded-2xl bg-white p-6 shadow-sm sm:w-[350px] shrink-0"
              >
                <div>
                  <div className="flex text-yellow-400">
                    {Array(t.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                  </div>
                  <p className="mt-4 italic text-gray-700">"{t.text}"</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-forest/10 text-xl">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{t.author}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="size-3 text-red-500" />
                        {t.location}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest">
                    {t.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white px-8 py-10 shadow-sm">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4">
              <Star className="size-8 text-yellow-400 fill-yellow-400" />
              <div>
                <h4 className="font-bold text-gray-900">4.9/5 Rating</h4>
                <p className="text-xs text-gray-500">Based on 12,400+ reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Lock className="size-8 text-yellow-500 fill-yellow-500" />
              <div>
                <h4 className="font-bold text-gray-900">Safe Payments</h4>
                <p className="text-xs text-gray-500">UPI, Cards, COD accepted</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RefreshCcw className="size-8 text-blue-500" />
              <div>
                <h4 className="font-bold text-gray-900">Easy Returns</h4>
                <p className="text-xs text-gray-500">100% plant health guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <PhoneCall className="size-8 text-red-500" />
              <div>
                <h4 className="font-bold text-gray-900">24/7 Support</h4>
                <p className="text-xs text-gray-500">We respond in &lt;2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="bg-forest/5 px-4 py-16 lg:px-8">
      <div className="mx-auto w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-medium text-forest">
              <PhoneCall className="size-4" />
              GET IN TOUCH
            </div>
            <h2 className="font-display text-4xl font-bold text-forest lg:text-5xl">
              Let's Bring Nature To Your Balcony
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Whether you want to place a bulk order, partner with us for landscaping, or simply ask about our
              plant care tips — we'd love to hear from you. Our team responds within 2 hours on
              business days.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <Phone className="size-6 text-forest" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">PHONE / WHATSAPP</p>
                  <p className="font-bold text-gray-900">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <Mail className="size-6 text-gray-400" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">EMAIL</p>
                  <p className="font-bold text-gray-900">hello@greenroots.in</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <MapPin className="size-6 text-forest fill-forest/10" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">STORE ADDRESS</p>
                  <p className="font-bold text-gray-900">Shettihalli, Karnataka 563125</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-10">
            <h3 className="font-display text-2xl font-bold text-gray-900">Send an Enquiry</h3>
            <p className="mt-2 text-sm text-gray-500">
              Fill in the details below and we'll get back to you within 2 hours.
            </p>

            <form className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="Your Name" className="bg-gray-50/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="+91 XXXXX XXXXX" className="bg-gray-50/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Email Address</label>
                <Input placeholder="your@email.com" className="bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  I am interested in <span className="text-red-500">*</span>
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-gray-50/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="bulk">Bulk Order / Gifting</option>
                  <option value="landscaping">Landscaping Service</option>
                  <option value="support">Plant Care Support</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Message</label>
                <Textarea
                  placeholder="Tell us what plants or planters you're looking for..."
                  className="min-h-[120px] bg-gray-50/50"
                />
              </div>
              <Button className="w-full bg-forest text-white hover:bg-forest-deep" size="lg">
                <Send className="mr-2 size-4" />
                Send My Enquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MapSection() {
  return (
    <section className="bg-forest/5">
      <div className="mx-auto w-full px-4 pb-8 lg:px-8">
        <h4 className="mb-4 text-sm font-semibold text-gray-500">Follow us on social media</h4>
        <div className="flex gap-4">
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 transition-colors hover:bg-pink-50"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 transition-colors hover:bg-blue-50"
          >
            <Facebook className="size-4" />
          </a>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-green-200 bg-white text-green-500 transition-colors hover:bg-green-50"
          >
            <MessageCircle className="size-4" />
          </a>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 transition-colors hover:bg-red-50"
          >
            <Youtube className="size-4" />
          </a>
        </div>
      </div>
      <div className="h-[500px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15518.90186980077!2d78.01177659625577!3d13.491006889985085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb21c7e1cf91f4d%3A0x5c945022fda265db!2sShettihalli%2C%20Karnataka%20563125!5e0!3m2!1sen!2sin!4v1787760071605!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="bg-[#FAF7F2] pt-16 lg:pt-24 pb-[88px] md:pb-[160px] -mb-[88px] md:-mb-[160px]">
      <div className="mx-auto w-full px-4 lg:px-8">
        <p className="mb-12 text-center text-xs font-bold tracking-[0.2em] text-forest/50 uppercase">
          GreenRoots by the numbers
        </p>
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-forest/10">
          <div className="flex flex-col items-center px-4 text-center">
            <span className="mb-4 text-4xl">🌾</span>
            <h3 className="font-display text-5xl font-bold text-forest">10+</h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Years of Greening</p>
            <p className="mt-1 text-xs text-gray-500">Est. 2014 in Bengaluru</p>
          </div>
          <div className="flex flex-col items-center px-4 text-center">
            <span className="mb-4 text-4xl">🪴</span>
            <h3 className="font-display text-5xl font-bold text-forest">200+</h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Studio Planters</p>
            <p className="mt-1 text-xs text-gray-500">Handcrafted by artisans</p>
          </div>
          <div className="flex flex-col items-center px-4 text-center">
            <span className="mb-4 text-4xl">🌱</span>
            <h3 className="font-display text-5xl font-bold text-forest">140+</h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Plant Varieties</p>
            <p className="mt-1 text-xs text-gray-500">Curated for home spaces</p>
          </div>
          <div className="flex flex-col items-center px-4 text-center">
            <span className="mb-4 text-4xl">🏡</span>
            <h3 className="font-display text-5xl font-bold text-forest">20K+</h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Happy Homes</p>
            <p className="mt-1 text-xs text-gray-500">Across 100+ Pin codes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
