# Cobracco - Deploy Production

## Requisiti server
- Docker
- Docker Compose (plugin `docker compose`)

## DNS
- Record A: `cobracco.it` -> IP del server
- Record CNAME: `www` -> `cobracco.it` (oppure record A sullo stesso IP); Caddy reindirizza automaticamente `https://www.cobracco.it` su `https://cobracco.it`.

## Configurazione env
1) Copia il file esempio:
```bash
cp .env.production.example .env.production
```
2) Compila i valori SMTP e reCAPTCHA.

### Note reCAPTCHA v3
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` e la chiave pubblica (client).
- `RECAPTCHA_SECRET` resta solo sul server.

## Avvio production (Caddy + app)
```bash
docker compose -f docker-compose.prod.yml up -d --build
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
- Caddy gestisce automaticamente i certificati HTTPS.
- Non serve configurare email, Caddy usa Let's Encrypt in automatico.

## Analytics + consenso
- Google Analytics 4 (`G-40B3CN7851`) viene caricato subito (gtag.js è sempre incluso) ma con il `consent default` impostato su `denied` per tutte le categorie (basic mode). Gli eventi `page_view`, `generate_lead` e analoghi vengono inviati solo dopo che l’utente accetta il consenso.
- Il cookie di preferenza `cobracco_consent` può valere `accepted` o `rejected` e resta valido 180 giorni. Il banner e il pulsante “Gestisci consenso” nel footer permettono di riaprire la scelta in qualsiasi momento.
- Per testare: cancella `cobracco_consent`, ricarica la pagina e osserva che `gtag.js` viene caricato ma non invia eventi finché non accetti. Dopo aver accettato, controlla in DevTools > Network che venga inviato `gtag('consent','update', ...)` e che partano i `page_view` e il `generate_lead` al submit del form.
