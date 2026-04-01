CREATE POLICY "Anyone can delete testimonials" ON public.testimonials
  FOR DELETE TO anon, authenticated USING (true);