import { 
  Building2, 
  GraduationCap, 
  Award, 
  BadgeCheck, 
  CheckCircle2, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Leaf,
  Users,
  Sprout,
  Droplets,
  Scissors,
  Bug,
  Shovel
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRAINING_TOPICS = [
  { text: "Garden setup and maintenance", icon: Shovel },
  { text: "Terrace, rooftop and kitchen gardening", icon: Building2 },
  { text: "Soil and growing-media management", icon: Sprout },
  { text: "Plant selection and identification", icon: Leaf },
  { text: "Nursery and seedling management", icon: Sprout },
  { text: "Plant nutrition and fertilization", icon: Droplets },
  { text: "Irrigation and water management", icon: Droplets },
  { text: "Pruning and plant care", icon: Scissors },
  { text: "Repotting and transplantation", icon: Shovel },
  { text: "Organic pest and disease management", icon: Bug },
  { text: "Composting", icon: Leaf },
  { text: "Lawn and landscape maintenance", icon: Scissors },
  { text: "Gardening tools and equipment", icon: Shovel },
  { text: "Workplace safety and professional conduct", icon: ShieldCheck },
];

const DEPLOYMENT_AREAS = [
  "IT & Corporate Campuses",
  "Apartments & Gated Communities",
  "Schools & Educational Institutions",
  "Hotels & Resorts",
  "Hospitals & Institutions",
  "Commercial Properties",
];

const AUDIT_POINTS = [
  "Garden and plant health",
  "Maintenance quality",
  "Attendance and work discipline",
  "Safety practices",
  "Professional conduct",
  "Service standards",
  "Client satisfaction",
];

const WORKFORCE_FLOW = [
  "Recruitment",
  "2-Month Training",
  "Assessment",
  "Certification",
  "Uniform & ID",
  "Deployment",
  "Supervision",
  "Quality Audits",
  "Continuous Development"
];

const VALUES = [
  {
    title: "Reliable Workforce",
    desc: "Professionally trained personnel ready for deployment.",
  },
  {
    title: "Consistent Quality",
    desc: "Defined work standards with regular Green Roots audits.",
  },
  {
    title: "Expert Support",
    desc: "Access to Green Roots horticulture knowledge and technical guidance.",
  },
  {
    title: "Workforce Management",
    desc: "Green Roots manages training, deployment and ongoing professional development.",
  },
  {
    title: "Scalable Solutions",
    desc: "From a single Garden Care Professional to complete horticulture teams for large campuses and communities.",
  }
];

export function HorticultureWorkforce() {
  return (
    <section id="horticulture-workforce" className="bg-[#fcfbf9] py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Badge variant="secondary" className="mb-6 bg-forest/10 text-forest hover:bg-forest/20 text-sm px-4 py-1.5">
            <Users className="size-4 mr-2" />
            Enterprise Solutions
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-8 leading-tight tracking-tight">
            Professional Horticulture Workforce.<br className="hidden md:block"/> Managed by Green Roots.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We provide trained, certified and professionally managed Garden Care Professionals for IT companies, corporate campuses, apartments, schools, hospitals, hotels, institutions and commercial properties.
          </p>
          <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-medium">
            We go beyond conventional gardening manpower by combining professional training, employee welfare, quality audits and expert horticulture consultancy under one integrated service.
          </p>
        </div>

        {/* Training Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-stretch mb-24">
          <div className="space-y-8 lg:pt-12">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-forest text-cream mb-4 shadow-lg shadow-forest/20">
              <GraduationCap className="size-8" />
            </div>
            <h3 id="our-professional-training" className="font-display text-3xl font-bold text-forest">Our Professional Training</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every Green Roots trainee undergoes a structured 2-month practical training programme covering the complete range of gardening and horticulture activities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3 pt-6">
              {TRAINING_TOPICS.map((topic, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-forest/10 shadow-sm hover:shadow-md hover:border-forest/30 transition-all group">
                  <div className="size-8 rounded-xl bg-forest/5 flex items-center justify-center shrink-0 group-hover:bg-forest group-hover:text-cream transition-colors text-forest">
                    <topic.icon className="size-4" />
                  </div>
                  <span className="text-sm font-semibold text-forest leading-tight">{topic.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-forest/5 to-transparent rounded-3xl transform rotate-3 scale-105" />
            <div className="relative lg:h-full flex flex-col bg-white p-8 sm:p-12 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border/50">
              <div className="flex items-center gap-5 mb-8">
                <div className="size-14 rounded-full bg-forest/10 flex items-center justify-center text-forest shrink-0">
                  <Award className="size-7" />
                </div>
                <div>
                  <h4 id="training-certification" className="font-display text-xl font-bold text-forest">Training & Certification</h4>
                  <p className="text-sm text-muted-foreground mt-1">Practical and knowledge-based assessment.</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                After completing the 2-month training programme, every trainee undergoes rigorous assessment. Successful candidates receive a Green Roots Training Certificate and are eligible for professional deployment.
              </p>
              
              <div className="border-t border-border/60 pt-8">
                <h4 className="font-display text-lg font-bold text-forest mb-4 flex items-center gap-2">
                  <BadgeCheck className="size-5 text-forest" />
                  Professional Uniform & Identity
                </h4>
                <p className="text-sm text-muted-foreground mb-4">Every deployed professional represents the Green Roots standard through:</p>
                <div className="flex flex-wrap gap-2">
                  {['Uniform', 'ID Card', 'Safety Equipment', 'Professional Conduct', 'Defined Work Standards'].map(badge => (
                    <span key={badge} className="px-3 py-1 bg-secondary text-forest text-xs font-medium rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Deployment & Audits */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-forest text-cream p-10 sm:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Building2 className="size-32" />
            </div>
            <div className="relative z-10">
              <h3 id="professional-deployment" className="font-display text-3xl font-bold mb-6">Professional Deployment</h3>
              <p className="text-cream/80 text-lg mb-8">We provide trained horticulture professionals for a variety of premium locations:</p>
              <ul className="space-y-4">
                {DEPLOYMENT_AREAS.map(area => (
                  <li key={area} className="flex items-center gap-3 text-lg font-medium">
                    <CheckCircle2 className="size-6 text-green-400 shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-10 sm:p-12 rounded-3xl shadow-sm border border-border/50">
            <h3 id="quality-audits" className="font-display text-3xl font-bold text-forest mb-6 flex items-center gap-4">
              <span className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <CheckCircle2 className="size-6" />
              </span>
              Quality Audits & Supervision
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our service doesn't end with deployment. Green Roots conducts regular quality audits and performance reviews to ensure consistent standards at every client location.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {AUDIT_POINTS.map(point => (
                <div key={point} className="flex items-start gap-2">
                  <div className="size-1.5 rounded-full bg-forest mt-2 shrink-0" />
                  <span className="text-forest font-medium">{point}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-orange-800 text-sm font-medium">
                Where required, we provide corrective training and expert horticulture guidance to maintain our high standards.
              </p>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold text-forest mb-4">A Complete Workforce Solution</h3>
            <p className="text-lg text-muted-foreground">With Green Roots, clients receive more than gardening manpower.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {WORKFORCE_FLOW.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-border/50 shadow-sm rounded-full text-sm sm:text-base font-semibold text-forest">
                  {step}
                </div>
                {index < WORKFORCE_FLOW.length - 1 && (
                  <ArrowRight className="size-4 sm:size-5 text-muted-foreground ml-3 md:ml-4 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-24">
          <h3 className="font-display text-3xl font-bold text-forest text-center mb-12">Our Value to Clients</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="size-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-6 group-hover:scale-110 group-hover:bg-forest group-hover:text-cream transition-all">
                  <HeartHandshake className="size-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-forest mb-3">{val.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Promise */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex size-20 rounded-full bg-forest text-cream items-center justify-center mb-8 shadow-2xl shadow-forest/30">
            <ShieldCheck className="size-10" />
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-bold text-forest mb-6 leading-tight">
            We don't just provide gardeners.<br/>
            <span className="text-forest/70">We build skilled horticulture professionals.</span>
          </h3>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with Green Roots for Professional Horticulture Workforce & Garden Management to deliver greener, healthier spaces.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-xl">
                Partner With Us Today
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 bg-[#fcfbf9]">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">Partner With Green Roots</DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Tell us about your workforce requirements and we'll get back to you with a customized solution.
                </p>
              </DialogHeader>
              <form className="mt-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Company Name <span className="text-red-500">*</span></label>
                    <Input placeholder="Your Company" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Contact Person <span className="text-red-500">*</span></label>
                    <Input placeholder="Full Name" className="bg-white" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Phone / WhatsApp <span className="text-red-500">*</span></label>
                    <Input placeholder="+91 XXXXX XXXXX" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Email Address <span className="text-red-500">*</span></label>
                    <Input placeholder="your@email.com" className="bg-white" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Location Type <span className="text-red-500">*</span></label>
                    <Select>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPLOYMENT_AREAS.map(area => (
                          <SelectItem key={area} value={area.toLowerCase().replace(/\s+/g, '-')}>{area}</SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Gardeners Required</label>
                    <Input type="number" placeholder="e.g. 5" className="bg-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900">Additional Details</label>
                  <Textarea placeholder="Tell us more about your specific requirements..." className="bg-white min-h-[100px]" />
                </div>
                <Button className="w-full h-12 text-base font-semibold bg-forest text-white hover:bg-forest/90 mt-2">
                  Submit Partnership Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

      </div>
    </section>
  );
}
