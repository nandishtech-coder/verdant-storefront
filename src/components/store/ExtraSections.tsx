import { useEffect, useState, useRef } from "react";
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
  Phone,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
                  <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Phone / Whatsapp</p>
                  <a href="tel:+916360988785" className="font-bold text-gray-900 hover:text-primary transition-colors">+91 63609 88785</a>
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
              <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <Clock className="size-6 text-forest" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">WORKING HOURS</p>
                  <p className="font-bold text-gray-900">Mon–Sat: 6AM – 6PM</p>
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
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="Your Name" className="bg-gray-50/50 border-gray-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/40 focus:border-primary transition-all duration-300" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="+91 XXXXX XXXXX" className="bg-gray-50/50 border-gray-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/40 focus:border-primary transition-all duration-300" />
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">Email Address</label>
                <Input placeholder="your@email.com" className="bg-gray-50/50 border-gray-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/40 focus:border-primary transition-all duration-300" />
              </div>
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  I am interested in <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bulk" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 focus:text-primary transition-colors">Bulk Order / Gifting</SelectItem>
                    <SelectItem value="landscaping" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 focus:text-primary transition-colors">Landscaping Service</SelectItem>
                    <SelectItem value="support" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 focus:text-primary transition-colors">Plant Care Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">Message</label>
                <Textarea
                  placeholder="Tell us what plants or planters you're looking for..."
                  className="min-h-[120px] bg-gray-50/50 border-gray-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/40 focus:border-primary transition-all duration-300"
                />
              </div>
              <Button 
                className="w-full bg-forest text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)] border-none hover:bg-gradient-to-r hover:from-cyan-500 hover:via-green-500 hover:to-yellow-500 hover:animate-gradient active:bg-gradient-to-r active:from-cyan-500 active:via-green-500 active:to-yellow-500 active:animate-gradient" 
                size="lg"
              >
                <Send className="mr-2 size-4" />
                <span>Send My Enquiry</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function MapSection() {
  return (
    <section className="bg-forest/5">
      <div className="mx-auto w-full px-4 pb-8 lg:px-8">
        <h4 className="mb-4 text-sm font-semibold text-gray-500">Follow us on social media</h4>
        <div className="flex gap-4">
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-pink-500/20"
            aria-label="Instagram"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
            aria-label="Facebook"
          >
            <Facebook className="size-4" />
          </a>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-green-200 bg-white text-green-500 transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20"
            aria-label="WhatsApp"
          >
            <WhatsappIcon className="size-4" />
          </a>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20"
            aria-label="YouTube"
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

function AnimatedCounter({ end, suffix = "", duration = 1 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
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
            <h3 className="font-display text-5xl font-bold text-[#858635]"><AnimatedCounter end={38} suffix="+" /></h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Years of Farming</p>
            <p className="mt-1 text-xs text-gray-500">Est. 1985 in Karnataka</p>
          </div>
          <div className="flex flex-col items-center px-4 text-center">
            <span className="mb-4 text-4xl">👨‍🌾</span>
            <h3 className="font-display text-5xl font-bold text-[#858635]"><AnimatedCounter end={500} suffix="+" /></h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Partner Farmers</p>
            <p className="mt-1 text-xs text-gray-500">Across 12 districts</p>
          </div>
          <div className="flex flex-col items-center px-4 text-center">
            <span className="mb-4 text-4xl">🥦</span>
            <h3 className="font-display text-5xl font-bold text-[#858635]"><AnimatedCounter end={120} suffix="+" /></h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Fresh Products</p>
            <p className="mt-1 text-xs text-gray-500">Rotates every season</p>
          </div>
          <div className="flex flex-col items-center px-4 text-center">
            <span className="mb-4 text-4xl">🏠</span>
            <h3 className="font-display text-5xl font-bold text-[#858635]"><AnimatedCounter end={50} suffix="K+" /></h3>
            <p className="mt-2 text-sm font-bold text-gray-900">Happy Customers</p>
            <p className="mt-1 text-xs text-gray-500">Across 8 cities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
