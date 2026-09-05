"use client";
import { useEffect, useMemo, useState } from "react";

const COUNTRY_CENTERS = {
  SN:[14.4974,-14.4524], MA:[31.7917,-7.0926], FR:[46.2276,2.2137], US:[37.0902,-95.7129],
  CA:[56.1304,-106.3468], GB:[55.3781,-3.4360], ES:[40.4637,-3.7492], PT:[39.3999,-8.2245],
  DE:[51.1657,10.4515], IT:[41.8719,12.5674], BE:[50.5039,4.4699], NL:[52.1326,5.2913],
  CH:[46.8182,8.2275], TR:[38.9637,35.2433], AE:[23.4241,53.8478], QA:[25.3548,51.1839],
  SA:[23.8859,45.0792], CI:[7.5400,-5.5471], GH:[7.9465,-1.0232], NG:[9.0820,8.6753],
  ML:[17.5707,-3.9962], GN:[9.9456,-9.6966], GM:[13.4432,-15.3101], MR:[21.0079,-10.9408],
  DZ:[28.0339,1.6596], TN:[33.8869,9.5375], EG:[26.8206,30.8025], ZA:[-30.5595,22.9375],
  KE:[-0.0236,37.9062], IN:[20.5937,78.9629], CN:[35.8617,104.1954], JP:[36.2048,138.2529],
  KR:[35.9078,127.7669], BR:[-14.2350,-51.9253], MX:[23.6345,-102.5528], AU:[-25.2744,133.7751]
};

function fmt(n){ return new Intl.NumberFormat("en-US").format(Number(n||0)); }

function Metric({label,value,sub}){
  return <div className="adminMetric"><span>{label}</span><strong>{fmt(value)}</strong><small>{sub}</small></div>;
}

function Bars({items,labelKey="name"}){
  if(!items?.length) return <div className="emptyState">No data yet.</div>;
  const max=Math.max(...items.map(x=>x.pageviews||0),1);
  return <div className="barList">{items.map((item,i)=><div className="barRow" key={(item.key||item.name)+i}>
    <div className="barMeta"><span title={item[labelKey]}>{item[labelKey]}</span><b>{fmt(item.pageviews)}</b></div>
    <div className="barTrack"><i style={{width:`${Math.max(3,(item.pageviews/max)*100)}%`}}/></div>
    <small>{fmt(item.visitors)} visitors</small>
  </div>)}</div>;
}

function Trend({items}){
  if(!items?.length) return <div className="emptyState">Traffic will appear here after Analytics receives visits.</div>;
  const max=Math.max(...items.map(x=>x.pageviews||0),1);
  return <div className="trendBars">{items.map((item,i)=><div className="trendCol" key={(item.key||"d")+i} title={`${item.name}: ${item.pageviews} page views`}>
    <div className="trendValue">{item.pageviews||0}</div>
    <div className="trendBar"><i style={{height:`${Math.max(5,(item.pageviews/max)*100)}%`}}/></div>
    <small>{String(item.name).slice(5)}</small>
  </div>)}</div>;
}

export default function AdminDashboard(){
  const [auth,setAuth]=useState(null);
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [data,setData]=useState(null);
  const [days,setDays]=useState(30);
  const [country,setCountry]=useState(null);

  async function load(period=days){
    setLoading(true); setError("");
    try{
      const r=await fetch(`/api/admin/analytics?days=${period}`,{cache:"no-store"});
      const j=await r.json();
      if(r.status===401){ setAuth(false); setData(null); return; }
      setAuth(true);
      if(!r.ok || !j.ok) throw new Error(j.error||"Unable to load analytics.");
      setData(j);
      if(j.countries?.length) setCountry(c=>c||j.countries[0]);
    }catch(e){ setError(e.message||"Unable to load analytics."); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ load(days); },[]);

  async function login(e){
    e.preventDefault(); setLoading(true); setError("");
    const r=await fetch("/api/admin/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({password})});
    const j=await r.json().catch(()=>({}));
    if(!r.ok){ setError(j.error||"Incorrect password."); setLoading(false); return; }
    setPassword(""); setAuth(true); await load(days);
  }

  async function logout(){
    await fetch("/api/admin/logout",{method:"POST"});
    setAuth(false); setData(null);
  }

  async function changePeriod(next){
    setDays(next); await load(next);
  }

  const map = useMemo(()=>{
    const code=country?.key?.toUpperCase();
    const center=COUNTRY_CENTERS[code]||[20,0];
    const [lat,lon]=center;
    const bbox=[lon-8,lat-5,lon+8,lat+5].join(",");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lon}`;
  },[country]);

  if(auth===false){
    return <main className="adminShell loginShell">
      <section className="loginCard">
        <div className="adminBrand"><span>Ω</span><div><b>OHMEGA</b><small>Private analytics</small></div></div>
        <h1>Admin Dashboard</h1>
        <p>Owner access only.</p>
        <form onSubmit={login}>
          <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoFocus autoComplete="current-password"/></label>
          {error&&<div className="loginError">{error}</div>}
          <button disabled={loading||!password}>{loading?"Checking…":"Access dashboard"}</button>
        </form>
        <a href="/">← Back to portfolio</a>
      </section>
    </main>;
  }

  return <main className="adminShell">
    <header className="adminTop">
      <div className="adminBrand"><span>Ω</span><div><b>OHMEGA</b><small>Site insights</small></div></div>
      <div className="adminActions">
        <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
        <button onClick={logout}>Log out</button>
      </div>
    </header>

    <section className="adminIntro">
      <div><p>PRIVATE DASHBOARD</p><h1>Traffic overview</h1><span>Aggregated Vercel Web Analytics. No tracking cookies.</span></div>
      <div className="periodSwitch">{[1,7,30].map(n=><button className={days===n?"active":""} onClick={()=>changePeriod(n)} key={n}>{n===1?"Today":n===7?"7 days":"30 days"}</button>)}</div>
    </section>

    {loading && <div className="adminNotice">Refreshing analytics…</div>}
    {error && <div className="adminNotice error">{error}</div>}

    {data&&<>
      <section className="metricGrid">
        <Metric label="Visitors today" value={data.totals?.today?.visitors} sub={`${fmt(data.totals?.today?.pageviews)} page views`}/>
        <Metric label="Visitors · 7 days" value={data.totals?.week?.visitors} sub={`${fmt(data.totals?.week?.pageviews)} page views`}/>
        <Metric label="Visitors · 30 days" value={data.totals?.month?.visitors} sub={`${fmt(data.totals?.month?.pageviews)} page views`}/>
        <Metric label="Current period" value={days===1?data.totals?.today?.pageviews:days===7?data.totals?.week?.pageviews:data.totals?.month?.pageviews} sub="page views"/>
      </section>

      <section className="adminPanel widePanel">
        <div className="panelHead"><div><p>TRAFFIC</p><h2>Visits over time</h2></div><small>Last {days} day{days>1?"s":""}</small></div>
        <Trend items={data.trend}/>
      </section>

      <section className="adminGrid">
        <div className="adminPanel">
          <div className="panelHead"><div><p>CONTENT</p><h2>Top pages</h2></div></div>
          <Bars items={data.pages}/>
        </div>
        <div className="adminPanel">
          <div className="panelHead"><div><p>ACQUISITION</p><h2>Sources / search engines</h2></div></div>
          <Bars items={data.referrers}/>
        </div>
      </section>

      <section className="adminGrid">
        <div className="adminPanel">
          <div className="panelHead"><div><p>TECHNOLOGY</p><h2>Devices</h2></div></div>
          <Bars items={data.devices}/>
        </div>
        <div className="adminPanel">
          <div className="panelHead"><div><p>TECHNOLOGY</p><h2>Browsers</h2></div></div>
          <Bars items={data.browsers}/>
        </div>
      </section>

      <section className="adminPanel geoPanel">
        <div className="panelHead"><div><p>GEOGRAPHY</p><h2>Visitor locations</h2></div><small>OpenStreetMap</small></div>
        <div className="geoGrid">
          <div className="countryList">
            {data.countries?.length ? data.countries.map((c,i)=><button key={(c.key||c.name)+i} onClick={()=>setCountry(c)} className={country?.key===c.key?"active":""}>
              <span><b>{c.name}</b><small>{c.key}</small></span>
              <span><b>{fmt(c.visitors)}</b><small>visitors</small></span>
            </button>) : <div className="emptyState">No country data yet.</div>}
          </div>
          <div className="mapWrap">
            <iframe title="Visitor location map" src={map} loading="lazy"/>
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">© OpenStreetMap contributors ↗</a>
          </div>
        </div>
      </section>

      <footer className="adminFoot">Updated {data.generatedAt ? new Date(data.generatedAt).toLocaleString() : "now"} · Analytics are aggregated and privacy-friendly.</footer>
    </>}
  </main>;
}
