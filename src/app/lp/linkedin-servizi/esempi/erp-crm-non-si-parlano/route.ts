export async function GET() {
  const canonicalUrl =
    "https://cobracco.it/lp/linkedin-servizi/esempi/erp-crm-non-si-parlano";
  const ogImage = "https://cobracco.it/projects/superai.png";
  const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ERP e CRM non si parlano | Cobracco</title>
  <meta name="description" content="Caso pratico: integrazione ERP e CRM per eliminare doppio inserimento dati, ridurre errori operativi e accelerare il ciclo ordine-fatturazione." />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Cobracco" />
  <meta property="og:title" content="ERP e CRM non si parlano: come integrarli senza caos" />
  <meta property="og:description" content="Contesto, soluzione e impatto operativo di un progetto di integrazione tra CRM commerciale ed ERP gestionale." />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ERP e CRM non si parlano: come integrarli senza caos" />
  <meta name="twitter:description" content="Caso pratico di integrazione CRM-ERP per PMI operative." />
  <meta name="twitter:image" content="${ogImage}" />
  <style>
    :root {
      --bg: #0b1220;
      --panel: #111b2e;
      --panel-2: #16243d;
      --text: #e8eefc;
      --muted: #b7c4de;
      --accent: #4ea1ff;
      --line: #2a3d62;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, -apple-system, Segoe UI, Roboto, sans-serif;
      color: var(--text);
      background: radial-gradient(circle at 20% 0%, #1a2a46 0%, var(--bg) 45%);
      line-height: 1.6;
    }
    .wrap {
      max-width: 1080px;
      margin: 0 auto;
      padding: 40px 20px 56px;
    }
    .hero {
      display: grid;
      gap: 24px;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      margin-bottom: 24px;
    }
    .badge {
      display: inline-block;
      background: #0e315f;
      color: #9ec7ff;
      border: 1px solid #29548c;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 6px 10px;
      border-radius: 999px;
      margin-bottom: 12px;
      font-weight: 700;
    }
    h1 {
      margin: 0 0 14px;
      line-height: 1.1;
      font-size: clamp(32px, 5vw, 54px);
      letter-spacing: -0.02em;
    }
    p { margin: 0 0 12px; color: var(--muted); }
    .hero img {
      width: 100%;
      border-radius: 16px;
      border: 1px solid var(--line);
      display: block;
      background: #0a1324;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      margin-top: 18px;
    }
    .card {
      background: linear-gradient(180deg, var(--panel) 0%, var(--panel-2) 100%);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 18px;
    }
    .card h2 {
      margin: 0 0 8px;
      font-size: 20px;
      line-height: 1.25;
    }
    .card ul {
      margin: 10px 0 0 18px;
      color: var(--muted);
      padding: 0;
    }
    .cta {
      margin-top: 22px;
      padding: 18px;
      border: 1px solid #2c558f;
      border-radius: 14px;
      background: linear-gradient(90deg, #0e315f 0%, #123a71 100%);
    }
    .cta b { color: #d8e9ff; }
    .brand {
      margin-top: 18px;
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #b7c7e5;
      font-size: 14px;
    }
    .brand img {
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <section class="hero">
      <div>
        <span class="badge">Caso Operativo</span>
        <h1>ERP e CRM non si parlano</h1>
        <p>In molte PMI il reparto commerciale lavora nel CRM mentre amministrazione e operations lavorano in ERP. Quando i due sistemi restano separati, ogni ordine richiede passaggi manuali, ricopiature e verifiche continue tra uffici.</p>
        <p>Il risultato è un processo lento e fragile: informazioni duplicate, allineamento difficile su clienti/stato ordini, e ritardi che si riflettono direttamente sul servizio al cliente.</p>
      </div>
      <img src="https://cobracco.it/projects/superai.png" alt="Integrazione sistemi aziendali" />
    </section>

    <section class="grid">
      <article class="card">
        <h2>Contesto cliente</h2>
        <p>Azienda con flusso commerciale attivo, più uffici coinvolti e necessità di portare a terra le opportunità del CRM in modo affidabile su ERP senza moltiplicare attività operative a basso valore.</p>
      </article>

      <article class="card">
        <h2>Cosa abbiamo costruito</h2>
        <p>Un layer di integrazione tra CRM ed ERP con regole chiare di sincronizzazione: anagrafiche, opportunità, ordini, stati e informazioni utili a contabilità e logistica.</p>
        <ul>
          <li>Mappatura dati e campi critici tra i due sistemi</li>
          <li>Flussi API con controllo errori e retry</li>
          <li>Monitoraggio eventi e log operativi per il team</li>
        </ul>
      </article>

      <article class="card">
        <h2>Beneficio operativo</h2>
        <p>Il passaggio dal commerciale all’operativo diventa continuo: meno attività manuali, meno errori di trascrizione e maggiore affidabilità del dato condiviso tra reparti.</p>
      </article>

      <article class="card">
        <h2>Approccio di delivery</h2>
        <p>Intervento incrementale, senza bloccare l’operatività esistente: analisi dei flussi reali, rilascio progressivo, hardening e supporto fino alla stabilizzazione.</p>
      </article>
    </section>

    <section class="cta">
      <p><b>Se hai un processo simile, scrivici.</b> Ti aiutiamo a progettare un’integrazione CRM-ERP concreta, sostenibile e orientata ai risultati operativi.</p>
    </section>

    <div class="brand">
      <img src="https://cobracco.it/logos/logo-primary.png" alt="Cobracco logo" />
      <span>Cobracco · Software su misura e integrazioni per PMI operative</span>
    </div>
  </main>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
