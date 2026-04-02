import { Quote, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  message: string;
  created_at: string;
}

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", title: "", message: "" });

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim() || !form.title.trim() || !form.message.trim()) {
      toast.error(t("testimonials.form.error"));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      title: form.title.trim(),
      message: form.message.trim(),
    });
    if (error) {
      toast.error(t("testimonials.form.error"));
    } else {
      toast.success(t("testimonials.form.success"));
      setForm({ first_name: "", last_name: "", title: "", message: "" });
      fetchTestimonials();
    }
    setSubmitting(false);
  };

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label">{t("testimonials.label")}</span>
          <h2 className="section-title">{t("testimonials.title")}</h2>
          <div className="section-divider" />
        </div>

        {/* Testimonial form */}
        <form onSubmit={handleSubmit} className="card-elegant mb-10 max-w-2xl mx-auto">
          <p className="text-sm font-body font-bold text-foreground mb-5 uppercase tracking-wider">
            {t("testimonials.form.heading")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Input
              placeholder={t("testimonials.form.firstName")}
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              maxLength={100}
              className="bg-secondary/50 border-border/50 focus:border-primary"
            />
            <Input
              placeholder={t("testimonials.form.lastName")}
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              maxLength={100}
              className="bg-secondary/50 border-border/50 focus:border-primary"
            />
          </div>
          <Input
            placeholder={t("testimonials.form.title")}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            maxLength={200}
            className="mb-3 bg-secondary/50 border-border/50 focus:border-primary"
          />
          <Textarea
            placeholder={t("testimonials.form.message")}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            maxLength={1000}
            className="mb-3 bg-secondary/50 border-border/50 focus:border-primary"
          />
          <Button type="submit" disabled={submitting} className="gap-2 font-bold uppercase tracking-wider">
            <Send size={16} />
            {t("testimonials.form.submit")}
          </Button>
        </form>

        {/* Testimonials grid */}
        {loading ? (
          <p className="text-center text-muted-foreground text-sm">{t("testimonials.loading")}</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm">{t("testimonials.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="card-elegant flex flex-col gap-4 relative hover-lift">
                <Quote className="w-5 h-5 text-primary/20 absolute top-5 right-5" />
                <p className="text-sm font-body text-muted-foreground leading-relaxed italic">
                  "{item.message}"
                </p>
                <div className="mt-auto pt-4 border-t border-border/50">
                  <p className="text-sm font-body font-bold text-foreground">
                    {item.first_name} {item.last_name}
                  </p>
                  <p className="text-xs font-body text-primary font-semibold">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
