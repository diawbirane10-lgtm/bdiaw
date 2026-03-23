-- Allow authenticated users to read visits (for admin dashboard)
CREATE POLICY "Authenticated can read visits" ON public.page_visits
  FOR SELECT TO authenticated USING (true);