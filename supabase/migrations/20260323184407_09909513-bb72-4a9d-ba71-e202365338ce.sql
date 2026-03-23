-- Drop the authenticated-only select policy and allow anon select too
-- The admin page is protected by a password in the UI
DROP POLICY IF EXISTS "Authenticated can read visits" ON public.page_visits;
CREATE POLICY "Anyone can read visits" ON public.page_visits
  FOR SELECT USING (true);