import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface VisitPayload {
  page?: string;
  user_agent?: string;
  referrer?: string | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as VisitPayload;

    // Extract client IP from headers (Supabase edge = Deno on Cloudflare-like infra)
    const xff = req.headers.get("x-forwarded-for") ?? "";
    const realIp = req.headers.get("x-real-ip") ?? "";
    const ip = (xff.split(",")[0] || realIp || "").trim();

    // Geolocate via ipapi.co (free, no key, ~1k req/day)
    let geo: Record<string, unknown> = {};
    if (ip && ip !== "127.0.0.1" && !ip.startsWith("::")) {
      try {
        const r = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { "User-Agent": "portfolio-visit-tracker/1.0" },
        });
        if (r.ok) geo = await r.json();
      } catch (_) {
        // ignore geo failures
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase.from("page_visits").insert({
      page: body.page ?? "/",
      user_agent: body.user_agent ?? null,
      referrer: body.referrer ?? null,
      ip: ip || null,
      country: (geo.country_name as string) ?? null,
      country_code: (geo.country_code as string) ?? null,
      region: (geo.region as string) ?? null,
      city: (geo.city as string) ?? null,
      latitude: (geo.latitude as number) ?? null,
      longitude: (geo.longitude as number) ?? null,
      timezone: (geo.timezone as string) ?? null,
      isp: (geo.org as string) ?? null,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
