export default function LegalPage({ title, updated = "November 4, 2026", children }) {
  return (
    <article className="legal-page content-width">
      <div className="eyebrow"><span className="eyebrow-line" /> THE FINE PRINT</div>
      <h1>{title}</h1>
      <p className="legal-updated">Last updated {updated}</p>
      <div className="legal-copy">{children}</div>
    </article>
  );
}