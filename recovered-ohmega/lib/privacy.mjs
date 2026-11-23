export const CONSENT_COOKIE = "ohmega_consent_v1";
export const CONSENT_AGE = 180 * 86400;
export function permitted(value, headers) {
  return value === "accepted" && headers.get("sec-gpc") !== "1" && headers.get("dnt") !== "1";
}
export function sameOrigin(request) {
  try { return request.headers.get("origin") === new URL(request.url).origin && request.headers.get("sec-fetch-site") !== "cross-site"; }
  catch { return false; }
}
export function classifySource(host, tags = {}) {
  const tag = v => typeof v === "string" && /^[a-z0-9_.-]{1,64}$/i.test(v) ? v.toLowerCase() : null;
  const source=tag(tags?.utm_source), medium=tag(tags?.utm_medium), campaign=tag(tags?.utm_campaign), content=tag(tags?.utm_content);
  const h=(host||"").toLowerCase().replace(/^www\./,"");
  const is=d=>h===d||h.endsWith("."+d);
  let name="Unknown", channel="direct_or_unknown";
  if(source){name=source;channel=medium||"tagged";}
  else if(is("b-diaw.com")){name="Internal";channel="internal";}
  else if(["mail.google.com","outlook.com","outlook.office.com","outlook.live.com"].some(is)){name="Email";channel="email";}
  else if(["chatgpt.com","chat.openai.com","gemini.google.com","perplexity.ai","claude.ai"].some(is)){name=h;channel="ai";}
  else if(/^(?:[a-z0-9-]+\.)?google\.(?:com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(h)||["bing.com","duckduckgo.com","search.yahoo.com","search.brave.com","ecosia.org"].some(is)){name=h;channel="search_referral";}
  else if(["linkedin.com","lnkd.in","t.co","x.com","twitter.com","instagram.com","facebook.com","reddit.com","whatsapp.com","t.me"].some(is)){name=h;channel="social_referral";}
  else if(h){name=h;channel="referral";}
  return {source:name,channel,campaign,campaignContent:content};
}
