import { useEffect, useMemo, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { attribution, trafficSignal } from "../../supabase/functions/_shared/analytics-classify.mjs";

const db = supabase as unknown as SupabaseClient;
type Row={id:string;created_at:string;session_id?:string;event_type?:string;page?:string;target?:string;source?:string;medium?:string;campaign?:string;campaign_content?:string;referrer_host?:string;referrer?:string;user_agent?:string;country?:string;region?:string;city?:string;network_org?:string;network_asn?:string;isp?:string;traffic_signal?:string;geo_source?:string;device?:string;browser?:string};
const owner=(s:Session|null)=>String(s?.user.app_metadata?.portfolio_admin)==="true";
const group=(rows:Row[],fn:(r:Row)=>string|undefined)=>Object.entries(rows.reduce<Record<string,number>>((a,r)=>{const k=fn(r)||"Inconnu";a[k]=(a[k]||0)+1;return a;},{})).sort((a,b)=>b[1]-a[1]);
const city=(r:Row)=>[r.city,r.region,r.country].filter(Boolean).join(", ")||"Inconnu";
const panel="card-elegant p-5";
const input="w-full border border-border rounded-lg p-3 bg-background text-foreground";
const btn="bg-primary text-primary-foreground rounded-lg px-4 py-2";
function Breakdown({title,items}:{title:string;items:[string,number][]}){
 return <section className={panel}><h2 className="font-semibold mb-4">{title}</h2>{!items.length&&<p>Aucune donnée</p>}<div className="space-y-2">{items.slice(0,20).map(([k,v])=><div key={k}><div className="flex justify-between gap-2 text-sm"><span className="break-all">{k}</span><b>{v}</b></div><div className="h-1.5 bg-secondary rounded"><div className="h-full bg-primary rounded" style={{width:(100*v/items[0][1])+"%"}}/></div></div>)}</div></section>;
}
async function readRows(table:string,columns:string,from:string|null,until:string){
 const rows:Row[]=[];const size=500;const max=50000;let total=0;
 for(let i=0;i<max;i+=size){
   let q=db.from(table).select(columns,{count:i===0?"exact":undefined}).lt("created_at",until).order("created_at",{ascending:false}).order("id",{ascending:false}).range(i,i+size-1);
   if(from)q=q.gte("created_at",from);
   const {data,error,count}=await q;if(error)throw error;
   if(i===0)total=count??0;
   rows.push(...(data||[]) as unknown as Row[]);
   if(!data || data.length<size)break;
 }
 return {rows,total,truncated:rows.length<total};
}
export default function Admin(){
 const [session,setSession]=useState<Session|null>(null),[ready,setReady]=useState(false),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 const [period,setPeriod]=useState("30"),[mode,setMode]=useState("v2"),[filter,setFilter]=useState("all"),[rows,setRows]=useState<Row[]>([]),[total,setTotal]=useState(0),[truncated,setTruncated]=useState(false),[refresh,setRefresh]=useState(0);
 const [testimonials,setTestimonials]=useState<{id:string;first_name:string;last_name:string;message:string}[]>([]);
 const [source,setSource]=useState("email"),[campaign,setCampaign]=useState("internship_2027"),[content,setContent]=useState("");
 useEffect(()=>{
   let live=true;
   supabase.auth.getSession().then(({data})=>{if(live){setSession(data.session);setReady(true);}});
   const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>{setSession(s);setReady(true);});
   return()=>{live=false;subscription.unsubscribe();};
 },[]);
 const isOwner=owner(session);
 useEffect(()=>{
   if(!isOwner){setRows([]);setTotal(0);setTestimonials([]);return;}
   let live=true;setLoading(true);setError("");setRows([]);setTotal(0);setTruncated(false);
   const until=new Date().toISOString(),from=period==="all"?null:new Date(Date.now()-Number(period)*86400000).toISOString();
   const legacy=mode==="legacy";
   const cols=legacy?"id,created_at,page,user_agent,referrer,country,region,city,isp":"id,created_at,session_id,event_type,page,target,source,medium,campaign,campaign_content,referrer_host,country,region,city,network_org,network_asn,traffic_signal,geo_source,device,browser";
   readRows(legacy?"page_visits":"analytics_events",cols,from,until).then(r=>{if(live){setRows(r.rows);setTotal(r.total);setTruncated(r.truncated);}}).catch(e=>{if(live)setError(e.message||"Impossible de charger les statistiques");}).finally(()=>{if(live)setLoading(false);});
   return()=>{live=false;};
 },[isOwner,period,mode,refresh]);
 useEffect(()=>{if(isOwner){let live=true;supabase.from("testimonials").select("id,first_name,last_name,message").order("created_at",{ascending:false}).then(({data,error:e})=>{if(live){if(e)setError(e.message);else setTestimonials(data||[]);}});return()=>{live=false;};}},[isOwner,refresh]);
 const signIn=async(e:React.FormEvent)=>{e.preventDefault();setError("");setLoading(true);try{const {data,error:e}=await supabase.auth.signInWithPassword({email,password});setPassword("");if(e)throw e;if(!owner(data.session)){await supabase.auth.signOut();setError("Compte non autorisé.");}}catch{setError("Connexion refusée.");}finally{setLoading(false);}};
 const model=useMemo(()=>{
   const legacy=mode==="legacy";
   const events=rows.map(r=>legacy?{...r,...attribution(r.referrer),network_org:r.isp,traffic_signal:trafficSignal(r.user_agent||"",r.isp||"")}:r);
   const pages=legacy?events:events.filter(r=>r.event_type==="page_view");
   const sessions=new Map<string,Row>();
   // oldest observed landing per session in selected window
   for(const r of [...pages].reverse())if(r.session_id&&!sessions.has(r.session_id))sessions.set(r.session_id,r);
   const engaged=new Set(events.filter(r=>r.event_type==="engaged"||r.event_type==="project_open").map(r=>r.session_id));
   const automated=new Set(events.filter(r=>r.traffic_signal==="automation_signal").map(r=>r.session_id));
   const hosting=new Set(pages.filter(r=>r.traffic_signal==="hosting_signal").map(r=>r.session_id));
   const unit=legacy?pages:[...sessions.values()];
   const signal=(r:Row)=>legacy?(r.traffic_signal||"unknown"):automated.has(r.session_id)?"automation_signal":engaged.has(r.session_id)?"engagement_signal":hosting.has(r.session_id)?"hosting_signal":"unknown";
   const label=(s:string)=>({automation_signal:"Automatisation probable",engagement_signal:"Engagement observé",hosting_signal:"Hébergement / à vérifier",unknown:"Indéterminé"}[s]||s);
   const visible=unit.filter(r=>filter==="all"||signal(r)===filter).sort((a,b)=>b.created_at.localeCompare(a.created_at));
   const idSet=new Set(visible.map(r=>r.session_id));
   const scoped=legacy?visible:events.filter(r=>idSet.has(r.session_id));
   return {pages,unit,visible,scoped,signal,label,geoCoverage:visible.length?Math.round(100*visible.filter(r=>r.country).length/visible.length):0,quality:group(unit,r=>label(signal(r)))};
 },[rows,mode,filter]);
 const link=useMemo(()=>{const q=new URLSearchParams({utm_source:source,utm_medium:source==="email"?"email":source==="cv"?"document":source==="github"?"referral":"social",utm_campaign:campaign});if(content)q.set("utm_content",content);return "https://b-diaw.com/?"+q.toString();},[source,campaign,content]);
 if(!ready)return <main className="p-8">Chargement…</main>;
 if(!isOwner)return <main className="min-h-screen flex items-center justify-center p-4"><form className={panel+" w-full max-w-sm space-y-3"} onSubmit={signIn}><h1 className="text-xl font-bold">Administration OHMEGA</h1><label className="block">Email administrateur<input className={input} value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="username" required/></label><label className="block">Mot de passe<input className={input} value={password} onChange={e=>setPassword(e.target.value)} type="password" autoComplete="current-password" required/></label>{error&&<p role="alert">{error}</p>}{session?<button type="button" className={btn} onClick={()=>void supabase.auth.signOut()}>Déconnecter le compte non autorisé</button>:<button className={btn} disabled={loading}>Connexion</button>}</form></main>;
 return <main className="min-h-screen p-4 md:p-8"><div className="max-w-7xl mx-auto space-y-5">
  <header className="flex flex-wrap justify-between gap-3"><div><h1 className="text-2xl font-bold">Analytics portfolio</h1><p className="text-sm text-muted-foreground">Sessions, acquisition et qualité du trafic</p></div><div className="flex gap-3 items-center"><a href="/">Retour au site</a><button className={btn} onClick={()=>void supabase.auth.signOut()}>Déconnexion</button></div></header>
  <div className="flex flex-wrap gap-3 items-end"><label>Période<select className={input} value={period} onChange={e=>setPeriod(e.target.value)}><option value="1">24 h</option><option value="7">7 jours</option><option value="30">30 jours</option><option value="90">90 jours</option><option value="all">Historique complet</option></select></label><label>Collecte<select className={input} value={mode} onChange={e=>{setMode(e.target.value);setFilter("all");}}><option value="v2">V2 — sessions</option><option value="legacy">Historique — chargements</option></select></label><label>Qualité<select className={input} value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">Tout</option><option value="automation_signal">Automatisation probable</option>{mode==="v2"&&<option value="engagement_signal">Engagement observé</option>}<option value="hosting_signal">Hébergement / à vérifier</option><option value="unknown">Indéterminé</option></select></label><button className={btn} onClick={()=>setRefresh(x=>x+1)}>Actualiser</button></div>
  {error&&<p role="alert" className="border border-destructive p-3">{error}</p>}{loading&&<p>Chargement…</p>}{truncated&&<p role="alert">Échantillon limité : {rows.length} lignes sur {total}. Réduire la période.</p>}
  <p className="text-sm text-muted-foreground">{mode==="legacy"?"Historique : aucune session, aucun UTM, aucun engagement ne peut être reconstruit avec certitude.":"Une session est estimée par onglet, après 30 minutes d’inactivité. Source et localisation selon les signaux disponibles. Un réseau cloud ne prouve pas un robot."} Les sources portent sur les entrées observées dans la période.</p>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[[mode==="legacy"?"Chargements filtrés":"Sessions filtrées",model.visible.length],["Événements filtrés",model.scoped.length],["Couverture géographique",model.geoCoverage+" %"],["Lignes chargées",rows.length+" / "+total]].map(([k,v])=><div className={panel} key={k}><p className="text-sm">{k}</p><p className="text-2xl font-bold">{v}</p></div>)}</div>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
   <Breakdown title="Qualité (avant filtre)" items={model.quality}/>
   <Breakdown title="Canaux" items={group(model.visible,r=>r.medium)}/>
   <Breakdown title="Sources" items={group(model.visible,r=>r.source)}/>
   <Breakdown title="Pays" items={group(model.visible,r=>r.country)}/>
   <Breakdown title="Villes / régions" items={group(model.visible,city)}/>
   <Breakdown title="Réseaux / opérateurs" items={group(model.visible,r=>r.network_org)}/>
   <Breakdown title="Campagnes" items={group(model.visible,r=>r.campaign)}/>
   <Breakdown title="Détail de campagne" items={group(model.visible,r=>r.campaign_content)}/>
   <Breakdown title="Pages" items={group(model.scoped.filter(r=>mode==="legacy"||r.event_type==="page_view"),r=>r.page)}/>
   {mode==="v2"&&<><Breakdown title="Projets ouverts" items={group(model.scoped.filter(r=>r.event_type==="project_open"),r=>r.target)}/><Breakdown title="Documents ouverts (clics)" items={group(model.scoped.filter(r=>r.event_type==="document_open"),r=>r.target)}/><Breakdown title="Liens externes (clics)" items={group(model.scoped.filter(r=>r.event_type==="outbound"),r=>r.target)}/></>}
  </div>
  <section className={panel}><h2 className="font-semibold mb-3">Localisations à vérifier — hébergeurs ou signaux de robots</h2><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th>Ville</th><th>Réseau</th><th>ASN</th><th>Signal</th><th>Nombre</th></tr></thead><tbody>{group(model.unit.filter(r=>["hosting_signal","automation_signal"].includes(model.signal(r))),r=>JSON.stringify([city(r),r.network_org||"Inconnu",r.network_asn||"—",model.label(model.signal(r))])).slice(0,30).map(([k,v])=><tr className="border-t" key={k}>{JSON.parse(k).map((x:string,i:number)=><td className="py-2 pr-3" key={i}>{x}</td>)}<td>{v}</td></tr>)}</tbody></table></div></section>
  <section className={panel}><h2 className="font-semibold mb-3">Entrées récentes — localisation approximative</h2><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th>Date UTC</th><th>Ville</th><th>Source</th><th>Campagne</th><th>Réseau / ASN</th><th>Signal</th></tr></thead><tbody>{model.visible.slice(0,100).map(r=><tr className="border-t" key={r.id}><td className="py-2 pr-3 whitespace-nowrap">{new Date(r.created_at).toISOString().slice(0,16).replace("T"," ")}</td><td>{city(r)}</td><td>{r.source}</td><td>{r.campaign||"—"}</td><td>{r.network_org||"—"} {r.network_asn||""}</td><td>{model.label(model.signal(r))}</td></tr>)}</tbody></table></div></section>
  <section className={panel+" space-y-3"}><h2 className="font-semibold">Générateur UTM</h2><label>Source<select className={input} value={source} onChange={e=>setSource(e.target.value)}>{["email","linkedin","twitter","instagram","github","cv","whatsapp"].map(s=><option key={s}>{s}</option>)}</select></label><label>Campagne<input className={input} value={campaign} onChange={e=>setCampaign(e.target.value)} pattern="[a-zA-Z0-9_.-]{1,80}"/></label><label>Organisation (pas de nom individuel)<input className={input} value={content} onChange={e=>setContent(e.target.value)}/></label><p className="break-all text-sm">{link}</p><button className={btn} disabled={!/^[a-z0-9_.-]{1,80}$/i.test(campaign)||(!!content&&!/^[a-z0-9_.-]{1,80}$/i.test(content))} onClick={()=>navigator.clipboard.writeText(link).catch(()=>setError("Copie impossible."))}>Copier</button></section>
  <section className={panel}><h2 className="font-semibold mb-4">Témoignages</h2>{testimonials.map(t=><div key={t.id} className="border-t py-3 flex justify-between gap-3"><div><b>{t.first_name} {t.last_name}</b><p>{t.message}</p></div><button onClick={async()=>{if(!confirm("Supprimer ce témoignage ?"))return;const {error:e}=await supabase.from("testimonials").delete().eq("id",t.id);if(e)setError(e.message);else setTestimonials(x=>x.filter(v=>v.id!==t.id));}}>Supprimer</button></div>)}</section>
 </div></main>;
}
