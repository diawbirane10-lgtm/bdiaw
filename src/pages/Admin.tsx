import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Calendar, Monitor, Globe, TrendingUp, Lock, Trash2, MessageSquare, MapPin } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "bdiaw2026"; // Change this to your preferred password

interface Testimonial {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [recentVisits, setRecentVisits] = useState<any[]>([]);
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
    if (sessionStorage.getItem("admin_auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    const fetchStats = async () => {
      setLoading(true);
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      const [totalRes, todayRes, weekRes, monthRes, recentRes] = await Promise.all([
        supabase.from("page_visits").select("id", { count: "exact", head: true }),
        supabase.from("page_visits").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
        supabase.from("page_visits").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
        supabase.from("page_visits").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
        supabase.from("page_visits").select("*").order("created_at", { ascending: false }).limit(20),
      ]);

      setStats({
        total: totalRes.count ?? 0,
        today: todayRes.count ?? 0,
        thisWeek: weekRes.count ?? 0,
        thisMonth: monthRes.count ?? 0,
      });
      setRecentVisits(recentRes.data ?? []);

      // Daily breakdown (last 14 days)
      const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();
      const { data: dailyVisits } = await supabase
        .from("page_visits")
        .select("created_at")
        .gte("created_at", fourteenDaysAgo);

      if (dailyVisits) {
        const counts: Record<string, number> = {};
        dailyVisits.forEach((v) => {
          const day = new Date(v.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
          counts[day] = (counts[day] || 0) + 1;
        });
        setDailyData(
          Object.entries(counts)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date))
        );
      }

      setLoading(false);
    };

    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setTestimonials(data);
    };

    fetchStats();
    fetchTestimonials();
  }, [authenticated]);

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Accéder
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const getBrowserName = (ua: string) => {
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Edg")) return "Edge";
    return "Autre";
  };

  const getDeviceType = (ua: string) => {
    if (/Mobile|Android|iPhone/i.test(ua)) return "📱 Mobile";
    if (/Tablet|iPad/i.test(ua)) return "📱 Tablet";
    return "🖥️ Desktop";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">📊 Dashboard Visiteurs</h1>
            <p className="text-muted-foreground text-sm mt-1">Statistiques de ton portfolio</p>
          </div>
          <a href="/" className="text-sm text-primary hover:underline">← Retour au site</a>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total visites", value: stats.total, icon: Eye, color: "text-primary" },
                { label: "Aujourd'hui", value: stats.today, icon: Calendar, color: "text-green-400" },
                { label: "Cette semaine", value: stats.thisWeek, icon: TrendingUp, color: "text-blue-400" },
                { label: "Ce mois", value: stats.thisMonth, icon: Globe, color: "text-purple-400" },
              ].map((stat) => (
                <div key={stat.label} className="card-elegant p-5">
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Daily Chart (simple bar) */}
            {dailyData.length > 0 && (
              <div className="card-elegant p-6 mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">Visites par jour (14 derniers jours)</h2>
                <div className="flex items-end gap-2 h-32">
                  {dailyData.map((d) => {
                    const maxCount = Math.max(...dailyData.map((x) => x.count));
                    const height = maxCount > 0 ? (d.count / maxCount) * 100 : 0;
                    return (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">{d.count}</span>
                        <div
                          className="w-full bg-primary/80 rounded-t-sm transition-all"
                          style={{ height: `${Math.max(height, 4)}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">{d.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Visits */}
            <div className="card-elegant p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Visites récentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="pb-2 pr-4">Date</th>
                      <th className="pb-2 pr-4">Page</th>
                      <th className="pb-2 pr-4">Appareil</th>
                      <th className="pb-2 pr-4">Navigateur</th>
                      <th className="pb-2">Referrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisits.map((v) => (
                      <tr key={v.id} className="border-b border-border/30">
                        <td className="py-2 pr-4 text-foreground whitespace-nowrap">
                          {new Date(v.created_at).toLocaleString("fr-FR")}
                        </td>
                        <td className="py-2 pr-4 text-foreground">{v.page}</td>
                        <td className="py-2 pr-4 text-foreground">{v.user_agent ? getDeviceType(v.user_agent) : "-"}</td>
                        <td className="py-2 pr-4 text-foreground">{v.user_agent ? getBrowserName(v.user_agent) : "-"}</td>
                        <td className="py-2 text-muted-foreground truncate max-w-[200px]">{v.referrer || "Direct"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Testimonials Management */}
            <div className="card-elegant p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Témoignages ({testimonials.length})</h2>
              </div>
              {testimonials.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucun témoignage pour le moment.</p>
              ) : (
                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <div key={t.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {t.first_name} {t.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.title}</p>
                        <p className="text-sm text-foreground mt-2 italic">"{t.message}"</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(t.created_at).toLocaleString("fr-FR")}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTestimonial(t.id)}
                        className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
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
