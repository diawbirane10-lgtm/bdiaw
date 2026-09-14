import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Eye,
  Calendar,
  Monitor,
  Globe,
  TrendingUp,
  Lock,
  Trash2,
  MessageSquare,
  MapPin,
  Users,
  ExternalLink,
  Clock3,
  Smartphone,
  Laptop,
  Route,
} from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "bdiaw2026";

type Visit = {
  id: string;
  created_at: string;
  page?: string | null;
  user_agent?: string | null;
  referrer?: string | null;
  ip?: string | null;
  country?: string | null;
  country_code?: string | null;
  region?: string | null;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string | null;
  isp?: string | null;
};

interface Testimonial {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  message: string;
  created_at: string;
}

const getBrowserName = (ua = "") => {
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  return "Autre";
};

const getDeviceType = (ua = "") => {
  if (/Tablet|iPad/i.test(ua)) return "Tablette";
  if (/Mobile|Android|iPhone/i.test(ua)) return "Mobile";
  return "Desktop";
};

const hostFromReferrer = (referrer?: string | null) => {
  if (!referrer) return "Direct";
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
};

const countBy = (visits: Visit[], getKey: (visit: Visit) => string | null | undefined) => {
  const counts: Record<string, number> = {};
  visits.forEach((visit) => {
    const key = getKey(visit);
    if (!key) return;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
};

const Breakdown = ({ title, rows, icon: Icon }: { title: string; rows: [string, number][]; icon: any }) => {
  const max = rows[0]?.[1] || 1;
  return (
    <div className="card-elegant p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Pas encore de données.</p>
      ) : (
        <div className="space-y-3">
          {rows.slice(0, 10).map(([label, count]) => (
            <div key={label}>
              <div className="flex items-center justify-between gap-3 text-sm mb-1">
                <span className="text-foreground truncate" title={label}>{label}</span>
                <span className="font-semibold text-primary">{count}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary/75 rounded-full" style={{ width: `${Math.max(4, (count / max) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, today: 0, thisWeek: 0, thisMonth: 0 });
  const [visits, setVisits] = useState<Visit[]>([]);
  const [dailyData, setDailyData] = useState<{ date: string; count: number }[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    const fetchStats = async () => {
      setLoading(true);
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();

      const [totalRes, todayRes, weekRes, monthRes, visitsRes, dailyRes] = await Promise.all([
        supabase.from("page_visits").select("id", { count: "exact", head: true }),
        supabase.from("page_visits").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
        supabase.from("page_visits").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
        supabase.from("page_visits").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
        supabase.from("page_visits").select("*").order("created_at", { ascending: false }).limit(2000),
        supabase.from("page_visits").select("created_at").gte("created_at", fourteenDaysAgo),
      ]);

      setStats({
        total: totalRes.count ?? 0,
        today: todayRes.count ?? 0,
        thisWeek: weekRes.count ?? 0,
        thisMonth: monthRes.count ?? 0,
      });
      setVisits((visitsRes.data ?? []) as Visit[]);

      const counts: Record<string, number> = {};
      (dailyRes.data ?? []).forEach((v: any) => {
        const key = new Date(v.created_at).toISOString().slice(0, 10);
        counts[key] = (counts[key] || 0) + 1;
      });
      setDailyData(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)).map(([date, count]) => ({ date, count })));
      setLoading(false);
    };

    const fetchTestimonials = async () => {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (data) setTestimonials(data);
    };

    fetchStats();
    fetchTestimonials();
  }, [authenticated]);

  const analytics = useMemo(() => {
    const countries = countBy(visits, (v) => v.country);
    const regions = countBy(visits, (v) => [v.region, v.country].filter(Boolean).join(", ") || null);
    const cities = countBy(visits, (v) => [v.city, v.region, v.country].filter(Boolean).join(", ") || null);
    const pages = countBy(visits, (v) => v.page || "/");
    const browsers = countBy(visits, (v) => getBrowserName(v.user_agent || ""));
    const devices = countBy(visits, (v) => getDeviceType(v.user_agent || ""));
    const referrers = countBy(visits, (v) => hostFromReferrer(v.referrer));
    const timezones = countBy(visits, (v) => v.timezone);
    const isps = countBy(visits, (v) => v.isp);
    const uniqueIps = new Set(visits.map((v) => v.ip).filter(Boolean)).size;
    const uniqueCities = new Set(visits.map((v) => [v.city, v.region, v.country].filter(Boolean).join("|")).filter(Boolean)).size;
    const geoCoverage = visits.length ? Math.round((visits.filter((v) => v.country || v.city).length / visits.length) * 100) : 0;
    return { countries, regions, cities, pages, browsers, devices, referrers, timezones, isps, uniqueIps, uniqueCities, geoCoverage };
  }, [visits]);

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error("Erreur lors de la suppression");
    else {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success("Témoignage supprimé");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="card-elegant p-8 text-center">
            <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h1 className="text-xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mb-6">Accès réservé au propriétaire</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Accéder</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const recentVisits = visits.slice(0, 50);
  const maxDaily = Math.max(1, ...dailyData.map((d) => d.count));

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics portfolio</h1>
            <p className="text-muted-foreground text-sm mt-1">Vue détaillée des visites, origines, appareils et géographie approximative.</p>
          </div>
          <a href="/" className="text-sm text-primary hover:underline whitespace-nowrap">← Retour au site</a>
        </div>

        {loading ? <p className="text-muted-foreground">Chargement...</p> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 mb-8">
              {[
                { label: "Total visites", value: stats.total, icon: Eye },
                { label: "Aujourd'hui", value: stats.today, icon: Calendar },
                { label: "7 jours", value: stats.thisWeek, icon: TrendingUp },
                { label: "Ce mois", value: stats.thisMonth, icon: Globe },
                { label: "Visiteurs uniques*", value: analytics.uniqueIps, icon: Users },
                { label: "Villes distinctes", value: analytics.uniqueCities, icon: MapPin },
                { label: "Couverture géo", value: `${analytics.geoCoverage}%`, icon: Route },
                { label: "Échantillon analysé", value: visits.length, icon: Monitor },
              ].map((stat) => (
                <div key={stat.label} className="card-elegant p-4 min-w-0">
                  <stat.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground truncate">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mb-8">*Estimation à partir des IP distinctes dans les {visits.length} dernières visites chargées. Une IP n'est pas une personne : VPN, réseaux d'entreprise et IP partagées peuvent fausser ce chiffre.</p>

            {dailyData.length > 0 && (
              <div className="card-elegant p-6 mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <Clock3 className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Activité — 14 derniers jours</h2>
                </div>
                <div className="flex items-end gap-2 h-40">
                  {dailyData.map((d) => (
                    <div key={d.date} className="flex-1 min-w-0 flex flex-col items-center gap-1 h-full justify-end">
                      <span className="text-[11px] text-muted-foreground">{d.count}</span>
                      <div className="w-full bg-primary/80 rounded-t-sm" style={{ height: `${Math.max(4, (d.count / maxDaily) * 100)}%` }} />
                      <span className="text-[9px] text-muted-foreground whitespace-nowrap">{d.date.slice(5)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              <Breakdown title="Pays" rows={analytics.countries} icon={Globe} />
              <Breakdown title="Régions" rows={analytics.regions} icon={MapPin} />
              <Breakdown title="Villes" rows={analytics.cities} icon={MapPin} />
              <Breakdown title="Pages les plus vues" rows={analytics.pages} icon={Eye} />
              <Breakdown title="Sources de trafic" rows={analytics.referrers} icon={ExternalLink} />
              <Breakdown title="Navigateurs" rows={analytics.browsers} icon={Monitor} />
              <Breakdown title="Appareils" rows={analytics.devices} icon={Smartphone} />
              <Breakdown title="Fuseaux horaires" rows={analytics.timezones} icon={Clock3} />
              <Breakdown title="Réseaux / FAI" rows={analytics.isps} icon={Laptop} />
            </div>

            <div className="card-elegant p-6 mb-8">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-semibold text-foreground">50 visites les plus récentes</h2>
                <span className="text-xs text-muted-foreground">Localisation IP approximative</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="pb-2 pr-4">Date</th>
                      <th className="pb-2 pr-4">Localisation</th>
                      <th className="pb-2 pr-4">Page</th>
                      <th className="pb-2 pr-4">Appareil</th>
                      <th className="pb-2 pr-4">Navigateur</th>
                      <th className="pb-2 pr-4">Fuseau</th>
                      <th className="pb-2 pr-4">FAI</th>
                      <th className="pb-2">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisits.map((v) => {
                      const loc = [v.city, v.region, v.country].filter(Boolean).join(", ");
                      const coords = typeof v.latitude === "number" && typeof v.longitude === "number"
                        ? `https://www.openstreetmap.org/?mlat=${v.latitude}&mlon=${v.longitude}#map=10/${v.latitude}/${v.longitude}`
                        : null;
                      return (
                        <tr key={v.id} className="border-b border-border/30 align-top">
                          <td className="py-3 pr-4 text-foreground whitespace-nowrap">{new Date(v.created_at).toLocaleString("fr-FR")}</td>
                          <td className="py-3 pr-4 text-foreground min-w-[220px]">
                            {loc ? coords ? (
                              <a href={coords} target="_blank" rel="noreferrer" className="hover:text-primary inline-flex items-start gap-1">
                                <MapPin className="w-3 h-3 mt-1 shrink-0" /> {loc}
                              </a>
                            ) : loc : <span className="text-muted-foreground">—</span>}
                          </td>
                          <td className="py-3 pr-4 text-foreground">{v.page || "/"}</td>
                          <td className="py-3 pr-4 text-foreground">{getDeviceType(v.user_agent || "")}</td>
                          <td className="py-3 pr-4 text-foreground">{getBrowserName(v.user_agent || "")}</td>
                          <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{v.timezone || "—"}</td>
                          <td className="py-3 pr-4 text-muted-foreground min-w-[160px]">{v.isp || "—"}</td>
                          <td className="py-3 text-muted-foreground max-w-[180px] truncate" title={v.referrer || "Direct"}>{hostFromReferrer(v.referrer)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-elegant p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Témoignages ({testimonials.length})</h2>
              </div>
              {testimonials.length === 0 ? <p className="text-muted-foreground text-sm">Aucun témoignage pour le moment.</p> : (
                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <div key={t.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{t.first_name} {t.last_name}</p>
                        <p className="text-xs text-muted-foreground">{t.title}</p>
                        <p className="text-sm text-foreground mt-2 italic">“{t.message}”</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(t.created_at).toLocaleString("fr-FR")}</p>
                      </div>
                      <button onClick={() => deleteTestimonial(t.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors shrink-0" title="Supprimer"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
