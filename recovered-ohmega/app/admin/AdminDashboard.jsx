"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { groupVisits, TIME_ZONES } from "../../lib/visit-model.mjs";

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
  const [summaryError,setSummaryError] = useState("");
  const [summaryLoading,setSummaryLoading] = useState(true);
  const [downloadSummary,setDownloadSummary] = useState(null);
  const [downloadError,setDownloadError] = useState("");
  const [search,setSearch] = useState("");
  const [country,setCountry] = useState("");
  const generation = useRef(0);
  const moreInFlight = useRef(false);

  const refresh = useCallback(async () => {
    const current = ++generation.current;
    setHistoryLoading(true); setSummaryLoading(true); setHistoryError(""); setSummaryError(""); setHistoryReady(false);
    setRecords([]); setCursor(null); setSummary(null); setDownloadSummary(null); setDownloadError(""); setMoreLoading(false); moreInFlight.current=false;
    const params = `days=${days}&tz=${encodeURIComponent(zone)}`;
    await Promise.allSettled([
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
          const response = await fetch(`/api/admin/visits?${params}`, { cache:"no-store" });
          const result = await response.json();
          if (current !== generation.current) return;
          if (response.status === 401) { setAuth(false); return; }
          setAuth(true);
          if (!response.ok || !result.ok) throw new Error(result.error || "Le journal ne peut pas être chargé.");
          setRecords(result.events); setCursor(result.nextCursor); setPartial(result.partial); setUpdatedAt(result.generatedAt); setHistoryReady(true);
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
  }, [days,zone]);

  useEffect(() => { refresh(); return () => { generation.current++; }; }, [refresh]);

  async function loadMore() {
    if (!cursor || moreInFlight.current) return;
    moreInFlight.current=true; setMoreLoading(true); setHistoryError("");
    const current=generation.current;
    try {
      const response=await fetch(`/api/admin/visits?days=${days}&tz=${encodeURIComponent(zone)}&cursor=${encodeURIComponent(cursor)}`,{cache:"no-store"});
      const result=await response.json();
      if(current!==generation.current)return;
      if(response.status===401){setAuth(false);return;}
      if(!response.ok||!result.ok)throw new Error(result.error||"Impossible de charger la suite.");
      setRecords(previous=>[...new Map([...previous,...result.events].map(row=>[row.id,row])).values()]);
      setCursor(result.nextCursor); setPartial(previous=>previous||result.partial);
    }catch(error){if(current===generation.current)setHistoryError(error.message);}
    finally{if(current===generation.current){setMoreLoading(false);moreInFlight.current=false;}}
  }

  async function login(event) {
    event.preventDefault(); setLoggingIn(true); setLoginError("");
    try {
      const response=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
      if(!response.ok)throw new Error(response.status===401?"Mot de passe incorrect.":"Connexion indisponible. Réessayez.");
      setPassword(""); setAuth(true); await refresh();
    }catch(error){setLoginError(error.message);}
    finally{setLoggingIn(false);}
  }
  async function logout() {
    try {
      const response=await fetch("/api/admin/logout",{method:"POST"});
      if(!response.ok)throw new Error();
      generation.current++; setAuth(false); setRecords([]); setSummary(null); setDownloadSummary(null);
    } catch { setHistoryError("La déconnexion a échoué. Réessayez."); }
  }

  const visits=useMemo(()=>groupVisits(records),[records]);
  const countries=useMemo(()=>[...new Set(visits.map(v=>v.country).filter(Boolean))].sort(),[visits]);
  const visible=useMemo(()=>{
    const term=search.trim().toLocaleLowerCase("fr");
    return visits.filter(visit=>(!country||visit.country===country)&&(!term||[visit.country,visit.city,visit.region,...visit.pages,...visit.downloads.map(x=>x.file)].filter(Boolean).join(" ").toLocaleLowerCase("fr").includes(term)));
  },[visits,search,country]);
  const total=summary?.totals?.[days===1?"today":days===7?"week":"month"];

  if(auth===false)return <main className="adminShell adminLogin"><section className="loginCard"><Brand/><p className="adminEyebrow">ESPACE PROPRIÉTAIRE</p><h1>Bienvenue,<br/>Birane.</h1><p>Connectez-vous pour consulter les visites de votre portfolio.</p><form onSubmit={login}><label htmlFor="admin-password">Mot de passe</label><input id="admin-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/>{loginError&&<p className="adminNotice adminError" role="alert">{loginError}</p>}<button className="adminButton primaryButton" disabled={loggingIn||!password}>{loggingIn?"Connexion…":"Ouvrir le tableau de bord →"}</button></form><a className="adminBack" href="/">← Retour au portfolio</a></section></main>;
  if(auth===null)return <main className="adminShell"><Brand/><p className="adminNotice" role="status">Connexion à votre espace…</p>{historyError&&<><p className="adminNotice adminError" role="alert">{historyError}</p><button className="adminButton" onClick={refresh}>Réessayer</button></>}</main>;

  return <main className="adminShell">
    <header className="adminTop"><Brand/><nav aria-label="Administration"><a className="adminButton" href="/" target="_blank" rel="noreferrer">Voir le site ↗</a><button className="adminButton" onClick={logout}>Se déconnecter</button></nav></header>
    <section className="adminIntro"><div><p className="adminEyebrow">ADMINISTRATION DU PORTFOLIO</p><h1>Historique des visites.</h1><p>Un historique des visites, avec le lieu, l’heure et les pages consultées.</p></div><button className="adminButton refreshButton" onClick={refresh} disabled={historyLoading}>↻ {historyLoading?"Actualisation…":"Actualiser"}</button></section>
    <section className="adminControls" aria-label="Période et heure"><div className="periodSwitch" role="group" aria-label="Période">{periods.map(([n,label])=><button key={n} aria-pressed={days===n} onClick={()=>{setDays(n);setCountry("");}}>{label}</button>)}</div><label className="zoneControl">Heures affichées en<select value={zone} onChange={e=>setZone(e.target.value)}>{TIME_ZONES.map(value=><option key={value} value={value}>{value.replace("Africa/","").replace("America/","").replace("Europe/","").replaceAll("_"," ")}</option>)}</select></label></section>
    <section className="adminMetrics" aria-label="Résumé"><div><span>Visites dans la liste</span><strong>{number(historyReady?visits.length:null)}</strong><small>Sessions de navigation chargées</small></div><div><span>Visiteurs distincts</span><strong>{number(total?.visitors)}</strong><small>Vercel · {days===0?"30 derniers jours":"période sélectionnée"}</small></div><div><span>Pages vues</span><strong>{number(total?.pageviews)}</strong><small>Vercel · {days===0?"30 derniers jours":"période sélectionnée"}</small></div></section>
    <section className="adminPanel historyPanel" aria-labelledby="history-title">
      <div className="panelHead"><div><p className="adminEyebrow">HISTORIQUE INDIVIDUEL</p><h2 id="history-title">Les dernières visites</h2><p>Une ligne par session. Ouvrez une visite pour voir les pages et les rapports demandés.</p></div><span className="historyCount">{historyReady?number(visible.length):"—"} {visible.length===1?"visite":"visites"}</span></div>
      <div className="historyFilters"><label>Rechercher dans les visites chargées<input type="search" placeholder="Pays, ville ou page…" value={search} onChange={e=>setSearch(e.target.value)}/></label><label>Pays<select value={country} onChange={e=>setCountry(e.target.value)}><option value="">Tous les pays chargés</option>{countries.map(name=><option key={name}>{name}</option>)}</select></label></div>
      <p className="historyPrecision">Localisation approximative du réseau : elle peut correspondre à un VPN ou à l’opérateur. Une ville absente reste « Non disponible ».</p>
      {historyLoading&&<p className="adminNotice" role="status">Chargement du journal…</p>}
      {historyError&&<p className="adminNotice adminError" role="alert">{historyError}</p>}
      {partial&&<p className="adminNotice" role="status">Certaines entrées ne sont pas encore disponibles. Actualisez pour réessayer.</p>}
      {historyReady&&!historyLoading&&visible.length===0&&<div className="adminEmpty historyEmpty"><span aria-hidden="true">↗</span><h3>{visits.length?"Aucune visite ne correspond à ce filtre.":"Votre historique commence ici."}</h3><p>{visits.length?"Essayez un autre pays, une autre recherche ou chargez la suite.":"Les nouvelles visites apparaîtront avec leur date et leur localisation disponible. Les anciennes statistiques ne permettent pas de reconstituer ce journal."}</p></div>}
      {visible.length>0&&<><div className="visitColumns" aria-hidden="true"><span>Dernier passage</span><span>Localisation</span><span>Pages consultées</span><span>Provenance</span></div><ol className="visitList">{visible.map(visit=><li key={visit.sessionId}><details className="visitRow"><summary><span className="visitTime"><time dateTime={visit.lastSeen}><b>{stamp(visit.lastSeen,zone,"time")}</b><span>{stamp(visit.lastSeen,zone,"date")}</span></time></span><span className="visitLocation"><b>{visit.country||"Pays non disponible"}</b><span>{visit.city||"Ville non disponible"}{visit.region?` · ${visit.region}`:""}</span></span><span className="visitPages"><b>{visit.pages.length} {visit.pages.length===1?"page":"pages"}{visit.downloads.length?` · ${visit.downloads.length} PDF`:""}</b><span>{titles[visit.pages[0]]||visit.downloads[0]?.file||visit.pages[0]}</span></span><span className="visitSource"><b>{visit.referrer||"Direct / inconnu"}</b><span>{visit.device} · {visit.browser}</span>{visit.automated&&<small className="automationBadge">Automatisation probable</small>}<i aria-hidden="true">⌄</i></span></summary><div className="visitDetail"><div><h3>Parcours de cette visite</h3><p>Horaires en {zone}. Session terminée après 30 minutes d’inactivité.</p></div><ol>{[...visit.events].reverse().map(event=><li key={event.id}><time dateTime={event.occurredAt}>{stamp(event.occurredAt,zone,"date")} · {stamp(event.occurredAt,zone,"time")}</time><span><a href={event.kind==="download"?`/api/reports/${event.reportId}`:event.page} target="_blank" rel="noreferrer">{event.kind==="download"?event.file:titles[event.page]||event.page} ↗</a>{event.kind==="download"&&<small className="downloadEventLabel">PDF demandé · sauvegarde et lecture non vérifiables</small>}</span></li>)}</ol></div></details></li>)}</ol></>}
      <div className="historyFoot"><p>Les visites antérieures à l’activation du journal ne sont pas reconstituées. Les parcours se complètent lorsque vous chargez la suite.</p>{cursor&&<button className="adminButton" onClick={loadMore} disabled={moreLoading}>{moreLoading?"Chargement…":"Charger les visites précédentes ↓"}</button>}</div>
    </section>
    <section className="adminPanel downloadPanel" aria-labelledby="downloads-title"><div className="panelHead"><div><p className="adminEyebrow">RAPPORTS & PDF</p><h2 id="downloads-title">Téléchargements de rapports</h2><p>Demandes de PDF servies par le site · {periods.find(([n])=>n===days)?.[1].toLowerCase()}.</p></div><span className="historyCount">{downloadSummary?`${downloadSummary.complete?"":"Au moins "}${number(downloadSummary.total)} PDF`:"—"}</span></div><p className="downloadExplanation">Le compteur confirme la demande de fichier, pas sa sauvegarde ni sa lecture. Les demandes automatiques peuvent être incluses. Les accès directs aux anciennes URL GitHub ne sont pas mesurés.</p>{downloadError?<p className="adminNotice adminError" role="alert">{downloadError}</p>:downloadSummary?<><ul className="downloadRanking">{downloadSummary.reports.map(report=><li key={report.id}><span><b>{report.title}</b><small>{report.file}</small></span><strong>{downloadSummary.complete?"":"≥ "}{number(report.count)}</strong></li>)}</ul>{!downloadSummary.complete&&<p className="adminNotice">Le volume dépasse la fenêtre de calcul. Ces compteurs sont des minimums.</p>}</>:<p className="adminEmpty">Chargement des compteurs PDF…</p>}</section>
    <section className="summarySection" aria-labelledby="summary-title"><div className="sectionHeading"><p className="adminEyebrow">VUE D’ENSEMBLE</p><h2 id="summary-title">Ce qui attire les visiteurs</h2><p>Bilan global Vercel · {days===0?"30 derniers jours":periods.find(([n])=>n===days)?.[1].toLowerCase()}. Les comptes du bilan et du nouveau journal peuvent différer.</p></div>{summaryError&&<p className="adminNotice" role="status">{summaryError} Le journal reste indépendant.</p>}{summaryLoading?<p className="adminNotice" role="status">Chargement du bilan global…</p>:<div className="adminGrid"><Ranking title="Pages les plus consultées" items={summary?.pages} pageLinks/><Ranking title="Sites et moteurs d’origine" items={summary?.referrers}/></div>}</section>
    <footer className="adminFoot"><span>OHMEGA · Birane DIAW</span><span>{updatedAt?`Journal actualisé le ${stamp(updatedAt,zone,"date")} à ${stamp(updatedAt,zone,"time")}`:""} · {zone}</span></footer>
  </main>;
}
