import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { privacySignal, setChoice, useAnalyticsChoice } from "@/lib/analyticsConsent";

const copy = {
 en:{title:"Your privacy choices",body:"With your permission, this portfolio uses optional analytics storage to measure visits, approximate country and city, traffic sources and project interactions. Your IP may be sent to ipapi.co for approximate location; the new analytics database does not store the raw IP. No advertising cookies are used by this analytics feature.",necessary:"Essential storage remembers your choice and supports administrator sign-in. You can change your choice anytime.",accept:"Accept analytics",decline:"Decline analytics",settings:"Privacy / cookies",close:"Close",signal:"Your browser privacy preference is respected. Analytics remains disabled.",details:"Analytics preferences",contact:"Privacy questions: use the portfolio contact form."},
 fr:{title:"Vos choix de confidentialité",body:"Avec votre accord, ce portfolio utilise un stockage statistique facultatif pour mesurer les visites, le pays et la ville approximatifs, les sources de trafic et les interactions avec les projets. Votre IP peut être transmise à ipapi.co pour la localisation approximative ; la nouvelle base statistique ne conserve pas l’IP brute. Cette fonctionnalité n’utilise pas de cookies publicitaires.",necessary:"Le stockage essentiel mémorise votre choix et permet la connexion administrateur. Vous pouvez modifier votre choix à tout moment.",accept:"Accepter les statistiques",decline:"Refuser les statistiques",settings:"Confidentialité / cookies",close:"Fermer",signal:"Votre préférence de confidentialité du navigateur est respectée. Les statistiques restent désactivées.",details:"Préférences statistiques",contact:"Questions de confidentialité : utilisez le formulaire de contact du portfolio."},
 ar:{title:"خيارات الخصوصية",body:"بموافقتك، يستخدم الموقع تخزينًا اختياريًا لقياس الزيارات والموقع التقريبي ومصادر الزيارات والتفاعل مع المشاريع. قد يُرسل عنوان IP إلى ipapi.co لتحديد الموقع التقريبي، ولا تحفظ قاعدة الإحصاءات الجديدة عنوان IP الخام. لا تستخدم هذه الميزة ملفات تعريف ارتباط إعلانية.",necessary:"يحفظ التخزين الضروري اختيارك ويدعم تسجيل دخول المسؤول. يمكنك تغيير اختيارك في أي وقت.",accept:"قبول الإحصاءات",decline:"رفض الإحصاءات",settings:"الخصوصية / ملفات الارتباط",close:"إغلاق",signal:"نحترم تفضيلات الخصوصية في متصفحك. الإحصاءات معطلة.",details:"تفضيلات الإحصاءات",contact:"لأسئلة الخصوصية، استخدم نموذج الاتصال بالموقع."},
 es:{title:"Tus opciones de privacidad",body:"Con tu permiso, este portfolio utiliza almacenamiento analítico opcional para medir visitas, ubicación aproximada, fuentes de tráfico e interacciones con proyectos. Tu IP puede enviarse a ipapi.co para determinar la ubicación aproximada; la nueva base analítica no almacena la IP sin procesar. Esta función no usa cookies publicitarias.",necessary:"El almacenamiento esencial recuerda tu elección y permite el acceso administrativo. Puedes cambiar tu elección en cualquier momento.",accept:"Aceptar estadísticas",decline:"Rechazar estadísticas",settings:"Privacidad / cookies",close:"Cerrar",signal:"Se respeta tu preferencia de privacidad del navegador. Las estadísticas están desactivadas.",details:"Preferencias de estadísticas",contact:"Consultas de privacidad: utiliza el formulario de contacto del portfolio."}
};

export default function CookieConsent(){
  const {lang}=useLanguage();
  const {pathname}=useLocation();
  const choice=useAnalyticsChoice();
  const [open,setOpen]=useState(false);
  const t=copy[lang as keyof typeof copy] || copy.en;
  if(pathname==="/admin" || pathname.startsWith("/admin/"))return null;
  const banner=choice==="unset"||open;
  const decide=(v:"accepted"|"declined")=>{setChoice(v);setOpen(false);};
  return <>
    {!banner&&<button type="button" onClick={()=>setOpen(true)} className="fixed bottom-3 left-3 z-40 rounded border border-border bg-background px-3 py-2 min-h-11 text-xs text-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary">{t.settings}</button>}
    {banner&&<section aria-label={t.details} className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-background p-4 shadow-lg md:p-5 max-h-[80vh] overflow-auto">
      <h2 className="text-base font-semibold text-foreground">{t.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{t.body}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.necessary} {t.contact}</p>
      {privacySignal()&&<p className="mt-2 text-sm">{t.signal}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" disabled={privacySignal()} onClick={()=>decide("accepted")} className="flex-1 min-h-11 rounded border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">{t.accept}</button>
        <button type="button" onClick={()=>decide("declined")} className="flex-1 min-h-11 rounded border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary">{t.decline}</button>
        {choice!=="unset"&&<button type="button" onClick={()=>setOpen(false)} className="min-h-11 px-3 py-2 text-sm underline">{t.close}</button>}
      </div>
    </section>}
  </>;
}
