"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { groupVisits, periodStart, TIME_ZONES } from "../../lib/visit-model.mjs";
import { countryOptions, matchesCountry, UNKNOWN_COUNTRY } from "../../lib/countries.mjs";

const periods = [[1,"Aujourd’hui"],[7,"7 jours"],[30,"30 jours"],[0,"Tout l’historique"]];
const titles = { "/":"Accueil", "/projects/ufls-smartgrid":"UFLS · Smart grid", "/projects/wave-energy-conversion":"Énergie houlomotrice", "/projects/railway-traction-25kv":"Traction ferroviaire", "/projects/digital-twin-liion-battery":"Jumeau numérique · Batterie", "/projects/digital-twin-electric-drive":"Jumeau numérique · Entraînement", "/research/grid-forming-vsm-hvdc-bess":"Recherche · Grid forming" };
const number = value => value == null ? "—" : new Intl.NumberFormat("fr-FR").format(Number(value));
function stamp(value, zone, type) {
  return new Intl.DateTimeFormat("fr-FR", { timeZone: zone, ...(type === "date" ? { day:"2-digit", month:"short", year:"numeric" } : { hour:"2-digit", minute:"2-digit", second:"2-digit", hourCycle:"h23" }) }).format(new Date(value));
}
function Brand() { return <a className="adminBrand" href="/" aria-label="OHMEGA — retour au portfolio"><span aria-hidden="true">Ω</span><span><b>OHMEGA</b><small>Administration privée</small></span></a>; }
function Ranking({ title, items, pageLinks = false }) {
  return <section className="adminPanel rankingPanel"><div className="panelHead"><h2>{title}</h2><span>Pages vues</span></div>{items?.length ? <ol className="rankingList">{items.map((item,i) => <li key={item.key || item.name}><span className="rankNumber">{String(i+1).padStart(2,"0")}</span>{pageLinks && item.name.startsWith("/") ? <a href={item.name} target="_blank" rel="noreferrer">{titles[item.name] || item.name}</a> : <span>{item.name}</span>}<strong>{number(item.pageviews)}</strong></li>)}</ol> : <p className="adminEmpty">Aucune donnée disponible pour cette période.</p>}</section>;
}

export default function AdminDashboard() {
  const [auth,setAuth] = useState(null);
  const [password,setPassword] = useState("");
  const [loggingIn,setLoggingIn] = useState(false);
  const [loginError,setLoginError] = useState("");
  const [days,setDays] = useState(7);
  const [zone,setZone] = useState("Africa/Casablanca");
  const [records,setRecords] = useState([]);
  const [cursor,setCursor] = useState(null);
  const [historyLoading,setHistoryLoading] = useState(true);
  const [moreLoading,setMoreLoading] = useState(false);
  const [historyError,setHistoryError] = useState("");
  const [historyReady,setHistoryReady] = useState(false);
  const [partial,setPartial] = useState(false);
  const [updatedAt,setUpdatedAt] = useState(null);
  const [summary,setSummary] = useState(null);
  const [audience,setAudience]=useState(null);
  const [audienceError,setAudienceError]=useState("");
  const [summaryError,setSummaryError] = useState("");
  const [summaryLoading,setSummaryLoading] = useState(true);
  const [downloadSummary,setDownloadSummary] = useState(null);
  const [downloadError,setDownloadError] = useState("");
  const [search,setSearch] = useState("");
  const [country,setCountry] = useState("");
  const generation = useRef(0);
  const moreInFlight = useRef(false);
  const refreshInFlight = useRef(false);
  const loadedMore = useRef(false);
  const historySnapshot = useRef({records:[],cursor:null,partial:false});
  useEffect(() => { historySnapshot.current={records,cursor,partial}; }, [records,cursor,partial]);

  const refresh = useCallback(async ({preserve=false}={}) => {
    if (preserve && (refreshInFlight.current || moreInFlight.current)) return;
    const current = ++generation.current;
    refreshInFlight.current=true;
    setHistoryLoading(true); setSummaryLoading(true); setHistoryError(""); setSummaryError(""); setAudienceError(""); setDownloadError("");
    if (!preserve) {
      setHistoryReady(false); setRecords([]); setCursor(null); setPartial(false); setUpdatedAt(null);
      setSummary(null); setAudience(null); setDownloadSummary(null);
      setMoreLoading(false); moreInFlight.current=false; loadedMore.current=false;
    }
    const params = `days=${days}&tz=${encodeURIComponent(zone)}`;
    await Promise.allSettled([
      (async()=>{try{const response=await fetch(`/api/admin/audience?${params}`,{cache:"no-store"});const result=await response.json();if(current!==generation.current)return;if(response.status===401){setAuth(false);return;}if(!response.ok||!result.ok)throw new Error("Compteur d’audience indisponible.");setAudience(result);}catch(error){if(current===generation.current)setAudienceError(error.message);}})(),
      (async () => {
        try {
          const response=await fetch(`/api/admin/downloads?${params}`,{cache:"no-store"});
          const result=await response.json();
          if(current!==generation.current)return;
          if(response.status===401){setAuth(false);return;}
          if(!response.ok||!result.ok)throw new Error("Les compteurs PDF sont temporairement indisponibles.");
          setDownloadSummary(result);
        }catch(error){if(current===generation.current)setDownloadError(error.message);}
      })(),
      (async () => {
        try {
          const response = await fetch(`/api/admin/visits?${params}&country=${encodeURIComponent(country)}`, { cache:"no-store" });
          const result = await response.json();
          if (current !== generation.current) return;
          if (response.status === 401) { setAuth(false); return; }
          setAuth(true);
          if (!response.ok || !result.ok) throw new Error(result.error || "Le journal ne peut pas être chargé.");
          const previous=historySnapshot.current;
          const latest=result.events;
          const since=periodStart(days,zone);
          const previousIds=new Set(previous.records.map(row=>row.id));
          // Keep a contiguous loaded history only when the refreshed head overlaps it.
          // If >one page arrived, reset the cursor to the refreshed head instead of skipping the gap.
          if (preserve && loadedMore.current && latest.some(row=>previousIds.has(row.id))) {
            setRecords([...new Map([...previous.records.filter(row=>Date.parse(row.occurredAt)>=since),...latest].map(row=>[row.id,row])).values()]);
            setCursor(previous.cursor); setPartial(previous.partial||result.partial);
          } else {
            setRecords(latest); setCursor(result.nextCursor); setPartial(result.partial);
            loadedMore.current=false;
          }
          setUpdatedAt(result.generatedAt); setHistoryReady(true);
        } catch(error) { if (current === generation.current) setHistoryError(error.message || "Connexion indisponible."); }
        finally { if (current === generation.current) setHistoryLoading(false); }
      })(),
      (async () => {
        try {
          const response = await fetch(`/api/admin/analytics?days=${days || 30}&tz=${encodeURIComponent(zone)}`, { cache:"no-store" });
          const result = await response.json();
          if (current !== generation.current) return;
          if (response.status === 401) { setAuth(false); return; }
          setAuth(true);
          if (!response.ok || !result.ok) throw new Error("Le bilan global est temporairement indisponible.");
          setSummary(result);
        } catch(error) { if (current === generation.current) setSummaryError(error.message); }
        finally { if (current === generation.current) setSummaryLoading(false); }
      })(),
    ]);
    if(current===generation.current)refreshInFlight.current=false;
  }, [days,zone,country]);

  useEffect(() => { refresh(); return () => { generation.current++; refreshInFlight.current=false; }; }, [refresh]);

  useEffect(() => {
    if(auth!==true)return;
    const sync=()=>{if(document.visibilityState==="visible")refresh({preserve:true});};
    const timer=window.setInterval(sync,60000);
    window.addEventListener("focus",sync);
    document.addEventListener("visibilitychange",sync);
    return()=>{window.clearInterval(timer);window.removeEventListener("focus",sync);document.removeEventListener("visibilitychange",sync);};
  }, [auth,refresh]);

  async function loadMore() {
    if (!cursor || moreInFlight.current || refreshInFlight.current) return;
    moreInFlight.current=true; setMoreLoading(true); setHistoryError("");
    const current=generation.current;
    try {
      const response=await fetch(`/api/admin/visits?days=${days}&tz=${encodeURIComponent(zone)}&cursor=${encodeURIComponent(cursor)}&country=${encodeURIComponent(country)}`,{cache:"no-store"});
      const result=await response.json();
      if(current!==generation.current)return;
      if(response.status===401){setAuth(false);return;}
      if(!response.ok||!result.ok)throw new Error(result.error||"Impossible de charger la suite.");
      setRecords(previous=>[...new Map([...previous,...result.events].map(row=>[row.id,row])).values()]);
      setCursor(result.nextCursor); setPartial(previous=>previous||result.partial); loadedMore.current=true;
    }catch(error){if(current===generation.current)setHistoryError(error.message);}
    finally{if(current===generation.current){setMoreLoading(false);moreInFlight.current=false;}}
  }

  async function login(event) {
    event.preventDefault(); setLoggingIn(true); setLoginError("");
    try {
      const response=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
      if(!response.ok)throw new Error(response.status===401?"Mot de passe incorrect.":response.status===429?"Trop de tentatives. Réessayez plus tard.":"Connexion indisponible. Réessayez.");
      setPassword(""); setAuth(true); await refresh();
    }catch(error){setLoginError(error.message);}
    finally{setLoggingIn(false);}
  }
  async function logout() {
    try {
      const response=await fetch("/api/admin/logout",{method:"POST"});
      if(!response.ok)throw new Error();
      generation.current++; refreshInFlight.current=false; moreInFlight.current=false; loadedMore.current=false; setAuth(false); setRecords([]); setSummary(null); setAudience(null); setDownloadSummary(null);
    } catch { setHistoryError("La déconnexion a échoué. Réessayez."); }
  }

  const visits=useMemo(()=>groupVisits(records),[records]);
  const countries=useMemo(()=>countryOptions(records,country),[records,country]);
  const visible=useMemo(()=>{
    const term=search.trim().toLocaleLowerCase("fr");
    return visits.filter(visit=>matchesCountry(visit,country)&&(!term||[visit.country,visit.city,visit.region,visit.source,visit.channel,visit.campaign,visit.campaignContent,visit.referrer,...visit.pages,...visit.downloads.map(x=>x.file)].filter(Boolean).join(" ").toLocaleLowerCase("fr").includes(term)));
  },[visits,search,country]);
  const total=summary?.totals?.[days===1?"today":days===7?"week":"month"];

  if(auth===false)return <main className="adminShell adminLogin"><section className="loginCard"><Brand/><p className="adminEyebrow">ESPACE PROPRIÉTAIRE</p><h1>Bienvenue,<br/>Birane.</h1><p>Connectez-vous pour consulter les visites de votre portfolio.</p><form onSubmit={login}><label htmlFor="admin-password">Mot de passe</label><input id="admin-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/>{loginError&&<p className="adminNotice adminError" role="alert">{loginError}</p>}<button className="adminButton primaryButton" disabled={loggingIn||!password}>{loggingIn?"Connexion…":"Ouvrir le tableau de bord →"}</button></form><a className="adminBack" href="/">← Retour au portfolio</a></section></main>;
  if(auth===null)return <main className="adminShell"><Brand/><p className="adminNotice" role="status">Connexion à votre espace…</p>{historyError&&<><p className="adminNotice adminError" role="alert">{historyError}</p><button className="adminButton" onClick={refresh}>Réessayer</button></>}</main>;

  return <main className="adminShell">
    <header className="adminTop"><Brand/><nav aria-label="Administration"><a className="adminButton" href="/" target="_blank" rel="noreferrer">Voir le site ↗</a><button className="adminButton" onClick={logout}>Se déconnecter</button></nav></header>
    <section className="adminIntro"><div><p className="adminEyebrow">ADMINISTRATION DU PORTFOLIO</p><h1>Historique des visites.</h1><p>Un historique des visites, avec le lieu, l’heure et les pages consultées. Synchronisation automatique toutes les 60 secondes lorsque cet onglet est visible.</p></div><button className="adminButton refreshButton" onClick={()=>refresh({preserve:true})} disabled={historyLoading||summaryLoading||moreLoading}>↻ {historyLoading?"Actualisation…":"Actualiser"}</button></section>
    <section className="adminControls" aria-label="Période et heure"><div className="periodSwitch" role="group" aria-label="Période">{periods.map(([n,label])=><button key={n} aria-pressed={days===n} onClick={()=>{setDays(n);setCountry("");}}>{label}</button>)}</div><label className="zoneControl">Heures affichées en<select value={zone} onChange={e=>setZone(e.target.value)}>{TIME_ZONES.map(value=><option key={value} value={value}>{value.replace("Africa/","").replace("America/","").replace("Europe/","").replaceAll("_"," ")}</option>)}</select></label></section>
    <section className="adminMetrics" aria-label="Résumé"><div><span>Sessions consenties chargées</span><strong>{number(historyReady?visits.length:null)}</strong><small>Sessions de navigation chargées</small></div><div><span>Visiteurs distincts (consentement)</span><strong>{number(total?.visitors)}</strong><small>Vercel · {days===0?"30 derniers jours":"période sélectionnée"}</small></div><div><span>Pages vues (consentement)</span><strong>{number(total?.pageviews)}</strong><small>Vercel · {days===0?"30 derniers jours":"période sélectionnée"}</small></div></section>
    <section className="adminPanel" aria-labelledby="audience-title"><div className="panelHead"><div><p className="adminEyebrow">AUDIENCE SANS TRACEUR INDIVIDUEL</p><h2 id="audience-title">Pages vues par pays</h2><p>Indépendant des cookies optionnels. Ce sont des pages vues, pas des visiteurs uniques ; les oppositions à la mesure et certains robots sont exclus.</p></div><strong className="historyCount">{audience?`${audience.complete?"":"≥ "}${number(audience.total)} pages vues`:"—"}</strong></div>{audienceError?<p className="adminNotice">{audienceError}</p>:audience?<Ranking title="Pays d’origine approximatif" items={audience.countries}/>:<p className="adminEmpty">Chargement du compteur…</p>}<p className="downloadExplanation">Les compteurs commencent à l’activation de cette fonctionnalité ; aucune donnée passée n’est reconstruite.</p></section>
    <section className="adminPanel historyPanel" aria-labelledby="history-title">
      <div className="panelHead"><div><p className="adminEyebrow">HISTORIQUE INDIVIDUEL</p><h2 id="history-title">Les dernières visites</h2><p>Une ligne par session ayant accepté les statistiques optionnelles. Ouvrez une visite pour voir les pages et les rapports demandés.</p></div><span className="historyCount">{historyReady?number(visible.length):"—"} {visible.length===1?"visite":"visites"}</span></div>
      <div className="historyFilters"><label>Rechercher dans les visites chargées<input type="search" placeholder="Pays, ville, source, campagne ou page…" value={search} onChange={e=>setSearch(e.target.value)}/></label><label>Pays<select value={country} onChange={e=>setCountry(e.target.value)}><option value="">Tous les pays du monde</option>{countries.map(({code,name})=><option key={code} value={code}>{name}</option>)}<option value={UNKNOWN_COUNTRY}>Pays non renseigné</option></select></label></div>
      <p className="historyPrecision">Localisation approximative du réseau : elle peut correspondre à un VPN ou à l’opérateur. Une ville absente reste « Non disponible ».</p>
      {historyLoading&&<p className="adminNotice" role="status">Chargement du journal…</p>}
      {historyError&&<p className="adminNotice adminError" role="alert">{historyError}</p>}
      {partial&&<p className="adminNotice" role="status">Certaines entrées ne sont pas encore disponibles. Actualisez pour réessayer.</p>}
      {historyReady&&!historyLoading&&visible.length===0&&<div className="adminEmpty historyEmpty"><span aria-hidden="true">↗</span><h3>{country||search.trim()||visits.length?"Aucune visite ne correspond à ce filtre.":"Votre historique commence ici."}</h3><p>{country||search.trim()||visits.length?"Aucune entrée correspondante dans l’historique chargé. Essayez une autre période ou chargez la suite si elle est disponible.":"Les nouvelles visites apparaîtront avec leur date et leur localisation disponible. Les anciennes statistiques ne permettent pas de reconstituer ce journal."}</p></div>}
      {visible.length>0&&<><div className="visitColumns" aria-hidden="true"><span>Dernier passage</span><span>Localisation</span><span>Pages consultées</span><span>Provenance</span></div><ol className="visitList">{visible.map(visit=><li key={visit.sessionId}><details className="visitRow"><summary><span className="visitTime"><time dateTime={visit.lastSeen}><b>{stamp(visit.lastSeen,zone,"time")}</b><span>{stamp(visit.lastSeen,zone,"date")}</span></time></span><span className="visitLocation"><b>{visit.country||"Pays non disponible"}</b><span>{visit.city||"Ville non disponible"}{visit.region?` · ${visit.region}`:""}</span></span><span className="visitPages"><b>{visit.pages.length} {visit.pages.length===1?"page":"pages"}{visit.downloads.length?` · ${visit.downloads.length} PDF`:""}</b><span>{titles[visit.pages[0]]||visit.downloads[0]?.file||visit.pages[0]}</span></span><span className="visitSource"><b>{visit.source&&visit.source!=="Unknown"?visit.source:visit.referrer||"Direct / inconnu"}</b>{visit.channel&&<span>{visit.channel}{visit.campaign?` · ${visit.campaign}`:""}{visit.campaignContent?` · ${visit.campaignContent}`:""}</span>}<span>{visit.device} · {visit.browser}</span>{visit.automated&&<small className="automationBadge">Automatisation probable</small>}<i aria-hidden="true">⌄</i></span></summary><div className="visitDetail"><div><h3>Parcours de cette visite</h3><p>Horaires en {zone}. Session terminée après 30 minutes d’inactivité.</p></div><ol>{[...visit.events].reverse().map(event=><li key={event.id}><time dateTime={event.occurredAt}>{stamp(event.occurredAt,zone,"date")} · {stamp(event.occurredAt,zone,"time")}</time><span><a href={event.kind==="download"?`/api/reports/${event.reportId}`:event.page} target="_blank" rel="noreferrer">{event.kind==="download"?event.file:titles[event.page]||event.page} ↗</a>{event.kind==="download"&&<small className="downloadEventLabel">PDF demandé · sauvegarde et lecture non vérifiables</small>}</span></li>)}</ol></div></details></li>)}</ol></>}
      <div className="historyFoot"><p>Les visites antérieures à l’activation du journal ne sont pas reconstituées. Les parcours se complètent lorsque vous chargez la suite.</p>{cursor&&<button className="adminButton" onClick={loadMore} disabled={moreLoading||historyLoading||summaryLoading}>{moreLoading?"Chargement…":"Charger les visites précédentes ↓"}</button>}</div>
    </section>
    <section className="adminPanel downloadPanel" aria-labelledby="downloads-title"><div className="panelHead"><div><p className="adminEyebrow">RAPPORTS & PDF</p><h2 id="downloads-title">Téléchargements de rapports</h2><p>Demandes de PDF servies par le site · {periods.find(([n])=>n===days)?.[1].toLowerCase()}.</p></div><span className="historyCount">{downloadSummary?`${downloadSummary.complete?"":"Au moins "}${number(downloadSummary.total)} PDF`:"—"}</span></div><p className="downloadExplanation">Les nouvelles demandes ne sont comptées qu’avec consentement aux statistiques. Le compteur confirme la demande de fichier, pas sa sauvegarde ni sa lecture. Les demandes automatiques peuvent être incluses. Les accès directs aux anciennes URL GitHub ne sont pas mesurés.</p>{downloadError?<p className="adminNotice adminError" role="alert">{downloadError}</p>:downloadSummary?<><ul className="downloadRanking">{downloadSummary.reports.map(report=><li key={report.id}><span><b>{report.title}</b><small>{report.file}</small></span><strong>{downloadSummary.complete?"":"≥ "}{number(report.count)}</strong></li>)}</ul>{!downloadSummary.complete&&<p className="adminNotice">Le volume dépasse la fenêtre de calcul. Ces compteurs sont des minimums.</p>}</>:<p className="adminEmpty">Chargement des compteurs PDF…</p>}</section>
    <section className="summarySection" aria-labelledby="summary-title"><div className="sectionHeading"><p className="adminEyebrow">VUE D’ENSEMBLE</p><h2 id="summary-title">Ce qui attire les visiteurs</h2><p>Bilan global Vercel · {days===0?"30 derniers jours":periods.find(([n])=>n===days)?.[1].toLowerCase()}. Les comptes du bilan et du journal peuvent différer. Ce bilan Vercel et le journal individuel restent soumis au consentement. Le compteur de pages vues par pays ci-dessus est indépendant des cookies optionnels.</p></div>{summaryError&&<p className="adminNotice" role="status">{summaryError} Le journal reste indépendant.</p>}{summaryLoading?<p className="adminNotice" role="status">Chargement du bilan global…</p>:<div className="adminGrid"><Ranking title="Pages les plus consultées" items={summary?.pages} pageLinks/><Ranking title="Sites et moteurs d’origine" items={summary?.referrers}/></div>}</section>
    <footer className="adminFoot"><span>OHMEGA · Birane DIAW</span><span>{updatedAt?`Journal actualisé le ${stamp(updatedAt,zone,"date")} à ${stamp(updatedAt,zone,"time")}`:""} · {zone}</span></footer>
  </main>;
}
