-- 1. Create the reels table
CREATE TABLE reels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  src text NOT NULL,
  poster text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;

-- 3. Grant table permissions
GRANT SELECT ON public.reels TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reels TO authenticated;
GRANT ALL ON public.reels TO service_role;

-- 4. Create RLS Policies
CREATE POLICY "Public reels are viewable by everyone." ON reels FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can do everything on reels" ON reels FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 5. Insert dummy initial data
INSERT INTO reels (title, src, poster, sort_order) VALUES
('Flower reel 1', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1490682143684-14369e18dce8?q=80&w=600&auto=format&fit=crop', 1),
('Friday reel 1', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=600&auto=format&fit=crop', 2),
('Flower reel 2', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1416879598555-2591eeb00d81?q=80&w=600&auto=format&fit=crop', 3),
('Friday reel 2', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1463320898484-cdefe81a04ad?q=80&w=600&auto=format&fit=crop', 4),
('Flower reel 3', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=600&auto=format&fit=crop', 5),
('Friday reel 3', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop', 6),
('Flower reel 4', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?q=80&w=600&auto=format&fit=crop', 7),
('Friday reel 4', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop', 8);



CREATE TABLE public.blogs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  excerpt text not null,
  tag text,
  published_date text not null,
  image_url text not null,
  is_active boolean default true not null,
  sort_order integer default 0 not null
);

-- Enable RLS and setup policies
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.blogs FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admin all access" ON public.blogs FOR ALL USING (
  public.has_role(auth.uid(), 'admin')
);



INSERT INTO public.blogs (title, excerpt, tag, published_date, image_url, sort_order) VALUES
('Best Plants to Gift This Raksha Bandhan', 'Chocolates get eaten. Cards get put in a drawer. A plant, on the other hand, keeps growing on someone''s desk or window...', 'BEST PLANTS FOR GIFTING', 'AUG 05, 2026', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop', 1),
('Home Composting 101: Turn Your Kitchen Scraps into Free Plant Food', 'Every day, Indian households throw out vegetable peels, tea leaves, eggshells, and fruit scraps that could be feeding...', '', 'JUL 25, 2026', 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=800&auto=format&fit=crop', 2),
('Your First Kitchen Garden: 7 Steps to Get Started This Week', 'Fresh coriander whenever a recipe needs it. Tomatoes you know weren''t sprayed with anything. A palak harvest that costs...', '', 'JUL 18, 2026', 'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?q=80&w=800&auto=format&fit=crop', 3);


ALTER TABLE public.blogs ADD COLUMN content text DEFAULT '' NOT NULL;
ALTER TABLE public.blogs ADD COLUMN slug text UNIQUE;

-- We'll try to generate a slug for any existing rows, though you may need to update them manually later
UPDATE public.blogs SET slug = replace(lower(title), ' ', '-');

ALTER TABLE public.blogs ALTER COLUMN slug SET NOT NULL;


CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  product_bought text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS and allow public inserts
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read" ON public.feedback FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.feedback (name, location, product_bought, rating, message)
VALUES 
  ('Rajesh Nair', 'Mysuru', 'Ceramic Planters', 5, 'The studio ceramic planters are absolutely phenomenal. They perfectly complement my living room decor. GreenRoots is my go-to for all things plants.'),
  ('Anil Kumar', 'Shivamogga', 'Organic Potting Mix', 5, 'Switched to their organic potting mix six months ago. My balcony garden has never looked better. The delivery is always on time and packaging is eco-friendly.'),
  ('Priya Shankar', 'Hassan', 'Herb Seed Pack', 5, 'The heirloom seeds germinated so quickly and the yield has been fantastic! So fulfilling to grow my own herbs. Ordering this for life.'),
  ('Sunita Reddy', 'Hubballi', 'Indoor Plants', 5, 'As an interior designer, I am very particular about indoor plants. GreenRoots ticks every box — healthy plants, beautiful pots, delivered fresh. My clients love the results!');


-- Drop the restrictive admin-only read policy
DROP POLICY IF EXISTS "Allow admin read" ON public.feedback;

-- Create a new policy that allows anyone (including the public storefront) to read the testimonials
CREATE POLICY "Allow public read" ON public.feedback FOR SELECT USING (true);

ALTER TABLE public.enquiries 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS interested_in text;

-- Allow anyone to submit an enquiry
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.enquiries FOR INSERT WITH CHECK (true);


CREATE TABLE public.latest_updates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  text text NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.latest_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to latest_updates"
  ON public.latest_updates FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to latest_updates"
  ON public.latest_updates FOR ALL USING (auth.role() = 'authenticated');
