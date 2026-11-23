export const cleanTag = v => typeof v === 'string' && /^[a-z0-9_.-]{1,80}$/i.test(v) ? v.toLowerCase() : null;
export const referrerHost = v => {
  try { const u = new URL(v); return ['http:','https:'].includes(u.protocol) ? u.hostname.toLowerCase().replace(/^www\./,'') : null; } catch { return null; }
};
const match = (h,d) => h === d || h.endsWith('.'+d);
export function attribution(ref, tags = {}) {
  const host = referrerHost(ref);
  const source = cleanTag(tags.utm_source), medium = cleanTag(tags.utm_medium);
  const campaign = cleanTag(tags.utm_campaign), content = cleanTag(tags.utm_content);
  if (source) return {source,medium:medium || 'tagged',campaign,campaign_content:content,referrer_host:host};
  let s='Unknown', m='direct_or_unknown';
  const h=host || '';
  if (match(h,'b-diaw.com')) {s='Internal';m='internal';}
  else if (match(h,'mail.google.com') || ['outlook.com','outlook.office.com','outlook.live.com'].some(d=>match(h,d))) {s='Email';m='email';}
  else if (['chatgpt.com','chat.openai.com','perplexity.ai','gemini.google.com','claude.ai'].some(d=>match(h,d))) {s=h;m='ai_referral';}
  else if (/^(?:[a-z0-9-]+\.)?google\.(?:com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(h)) {s='Google';m='search_referral';}
  else if (['bing.com','duckduckgo.com','search.yahoo.com','search.brave.com','ecosia.org'].some(d=>match(h,d))) {s=h;m='search_referral';}
  else if (['linkedin.com','lnkd.in','x.com','twitter.com','t.co','instagram.com','facebook.com','reddit.com','whatsapp.com','t.me'].some(d=>match(h,d))) {s=h;m='social_referral';}
  else if(h){s=h;m='referral';}
  return {source:s,medium:m,campaign,campaign_content:content,referrer_host:host};
}
export function trafficSignal(ua='',org='') {
  if (/bot\b|crawler|spider|headlesschrome|curl\/|python-requests|wget\/|preview|slurp|facebookexternalhit|linkedinbot/i.test(ua)) return 'automation_signal';
  if (/microsoft|azure|amazon data services|amazon technologies|amazon\.com|google cloud|google llc|digitalocean|ovh|hetzner|cloudflare|oracle cloud|akamai|linode|datacamp/i.test(org)) return 'hosting_signal';
  return 'unknown';
}
