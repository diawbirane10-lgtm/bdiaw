export const AUDIENCE_PREFIX="audience/v1/";
export const AUDIENCE_OPTOUT="ohmega_audience_off";
export function audienceAllowed(headers,optout){return optout!=="1"&&headers.get("sec-gpc")!=="1"&&headers.get("dnt")!=="1"&&!/bot\b|crawler|spider|lighthouse|headless|preview|facebookexternalhit/i.test(headers.get("user-agent")||"");}
export function countryCode(headers){const c=(headers.get("x-vercel-ip-country")||"").toUpperCase();return /^[A-Z]{2}$/.test(c)?c:"ZZ";}
export function audiencePath(now,country,id){const hour=Math.floor(now/3600000)*3600000;return AUDIENCE_PREFIX+String(9999999999999-hour).padStart(13,"0")+"-"+country+"-"+id+".json";}
export function parseAudiencePath(path){const m=/^audience\/v1\/(\d{13})-([A-Z]{2})-[0-9a-f-]{36}\.json$/.exec(path);return m?{hour:9999999999999-Number(m[1]),country:m[2]}:null;}
export function audienceLabel(code){if(code==="ZZ")return "Pays inconnu";try{return new Intl.DisplayNames(["fr"],{type:"region"}).of(code)||code;}catch{return code;}}
