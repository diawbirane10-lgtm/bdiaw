export default function NotFound(){
  return <main className="site">
    <section className="notFoundV4">
      <div>
        <span className="code">404 / SIGNAL LOST</span>
        <h1>Out of grid.</h1>
        <p>The requested path is outside the portfolio architecture. Return to the main system and continue from a known node.</p>
        <a href="/">Return to OHMEGA ↗</a>
      </div>
      <div className="notFoundSignal" aria-hidden="true">
        <div>NODE NOT FOUND<br/>PATH / NULL<br/>STATUS / ISOLATED</div>
      </div>
    </section>
  </main>;
}
