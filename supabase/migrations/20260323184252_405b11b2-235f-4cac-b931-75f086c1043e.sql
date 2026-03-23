-- Create page_visits table to track visitor analytics
CREATE TABLE public.page_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL DEFAULT '/',
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking visitors)
CREATE POLICY "Anyone can insert visits" ON public.page_visits
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- No select for anonymous - only authenticated admin reads