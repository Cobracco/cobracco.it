# Cobracco - Deploy Production

## Requisiti server
- Docker
- Docker Compose (plugin `docker compose`)

## DNS
- Record A: `cobracco.it` -> IP del server
- Record CNAME: `www` -> `cobracco.it` (oppure record A sullo stesso IP); Traefik reindirizza automaticamente `https://www.cobracco.it` su `https://cobracco.it`.

## Configurazione env
1) Copia il file esempio:
```bash
cp .env.production.example .env.production
cp .deploy/deploy.env.example .deploy/deploy.env
```
2) Compila i valori SMTP e reCAPTCHA.
3) Imposta `LETSENCRYPT_EMAIL` per i certificati HTTPS.
4) Per i build arg di Docker Compose, usa `--env-file .env.production` o esporta `NEXT_PUBLIC_GA_ID` nella shell (altrimenti il tag GA non viene iniettato in build).
5) Se vuoi tracciare conversioni Google Ads, imposta anche `NEXT_PUBLIC_GOOGLE_ADS_ID` (formato `AW-...`) e almeno una label conversione:
   - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT`
   - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CANDIDATURA`
   - fallback: `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`

### Note reCAPTCHA v3

## Avvio production (Traefik + app)
```bash
bash scripts/deploy/ubuntu/release.sh
```

## Logs
```bash
docker compose -f docker-compose.prod.yml logs -f
```

## Stato container
```bash
docker compose -f docker-compose.prod.yml ps
```

## Stop
```bash
docker compose -f docker-compose.prod.yml down
```

## Health check
- URL: `https://cobracco.it/health`
- Risposta: `{ "status": "ok" }`
- Non indicizzabile (cache disabilitata)

## Test API (senza reCAPTCHA)
```bash
curl -X POST https://cobracco.it/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"test","token":""}'
```
Atteso: errore generico (reCAPTCHA obbligatorio).

## Note Let's Encrypt
- Traefik gestisce automaticamente i certificati HTTPS.
- Serve un'email valida in `LETSENCRYPT_EMAIL` per Let's Encrypt.

## Analytics + consenso
- Google Analytics 4 (`G-40B3CN7851`) viene caricato subito (gtag.js è sempre incluso) ma con il `consent default` impostato su `denied` per tutte le categorie (basic mode). Gli eventi `page_view`, `generate_lead` e analoghi vengono inviati solo dopo che l’utente accetta il consenso.
- Google Ads usa lo stesso `gtag` e rispetta lo stesso consenso. Se configuri `NEXT_PUBLIC_GOOGLE_ADS_ID`, il tag Ads viene inizializzato; se configuri anche le label conversione (`..._CONTACT`, `..._CANDIDATURA` oppure fallback globale), al submit dei form viene inviato l'evento `conversion`.
- Mappa eventi Ads implementata:
  - remarketing page view: `page_view` con `send_to=AW-...` su ogni pagina
  - micro-conversioni pagina: `view_contact_page`, `view_mvp_page`, `view_sviluppo_software_page`, `view_freelance_software_page`, `view_blog_article_page`
  - micro-conversioni click CTA: `cta_contact_click`, `cta_mvp_click`, `cta_sviluppo_software_click`, `cta_freelance_software_click`
  - conversioni hard: `conversion` su submit `ContactForm` e `CandidaturaForm` (con label dedicate se presenti)
- Il cookie di preferenza `cobracco_consent` può valere `accepted` o `rejected` e resta valido 180 giorni. Il banner e il pulsante “Gestisci consenso” nel footer permettono di riaprire la scelta in qualsiasi momento.
- Per testare: cancella `cobracco_consent`, ricarica la pagina e osserva che `gtag.js` viene caricato ma non invia eventi finché non accetti. Dopo aver accettato, controlla in DevTools > Network che venga inviato `gtag('consent','update', ...)` e che partano i `page_view` e il `generate_lead` al submit del form.
