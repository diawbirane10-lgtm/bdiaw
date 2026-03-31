import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus("sending");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        first_name: formData.firstName.trim().slice(0, 100),
        last_name: formData.lastName.trim().slice(0, 100),
        email: formData.email.trim().slice(0, 255),
        message: formData.message.trim().slice(0, 2000),
      });

      if (error) throw error;

      setStatus("sent");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-display font-semibold text-foreground mb-1">
        {t("contact.form.heading")}
      </h3>
      <p className="text-sm text-muted-foreground font-body mb-6">
        {t("contact.form.subheading")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-body font-medium text-muted-foreground mb-1.5">
              {t("contact.form.firstName")} *
            </label>
            <input
              id="firstName"
              type="text"
              required
              maxLength={100}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              placeholder={t("contact.form.firstNamePh")}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-body font-medium text-muted-foreground mb-1.5">
              {t("contact.form.lastName")}
            </label>
            <input
              id="lastName"
              type="text"
              maxLength={100}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              placeholder={t("contact.form.lastNamePh")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-body font-medium text-muted-foreground mb-1.5">
            {t("contact.form.email")} *
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={255}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder={t("contact.form.emailPh")}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-body font-medium text-muted-foreground mb-1.5">
            {t("contact.form.message")} *
          </label>
          <textarea
            id="message"
            required
            maxLength={2000}
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
            placeholder={t("contact.form.messagePh")}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === "sent" && <CheckCircle className="w-4 h-4" />}
          {status === "idle" && <Send className="w-4 h-4" />}
          {status === "error" && <Send className="w-4 h-4" />}
          {status === "sending"
            ? t("contact.form.sending")
            : status === "sent"
              ? t("contact.form.sent")
              : status === "error"
                ? t("contact.form.error")
                : t("contact.form.submit")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
