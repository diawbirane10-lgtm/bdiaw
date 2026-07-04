import { useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const WEB3FORMS_ACCESS_KEY = "cf30c7e3-045f-4a8d-8332-85edfc769305";

const ContactForm = () => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(t("contact.form.error"));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio — nouveau message de ${form.name}`,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t("contact.form.success"));
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(t("contact.form.error"));
      }
    } catch {
      toast.error(t("contact.form.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-elegant mb-6 max-w-2xl mx-auto">
      <p className="text-sm font-body font-bold text-foreground mb-5 uppercase tracking-wider">
        {t("contact.form.heading")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <Input
          placeholder={t("contact.form.namePlaceholder")}
          aria-label={t("contact.form.name")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={150}
          className="bg-secondary/50 border-border/50 focus:border-primary"
        />
        <Input
          type="email"
          placeholder={t("contact.form.emailPlaceholder")}
          aria-label={t("contact.form.email")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          maxLength={200}
          className="bg-secondary/50 border-border/50 focus:border-primary"
        />
      </div>
      <Textarea
        placeholder={t("contact.form.messagePlaceholder")}
        aria-label={t("contact.form.message")}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        maxLength={2000}
        rows={4}
        className="mb-4 bg-secondary/50 border-border/50 focus:border-primary"
      />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <Button type="submit" disabled={submitting} className="btn-shine gap-2 font-bold uppercase tracking-wider w-full sm:w-auto">
        <Send size={16} />
        {submitting ? t("contact.form.sending") : t("contact.form.submit")}
      </Button>
    </form>
  );
};

export default ContactForm;
