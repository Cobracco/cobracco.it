import fs from "node:fs";
import path from "node:path";

export type BlogBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cta"; text: string; href: string; label: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  keywords: string[];
  body: BlogBodyBlock[];
};

const seedPosts: BlogPost[] = [
  {
    slug: "home-assistant-termogea-integrazione-locale-zone-policy",
    title:
      "Home Assistant Termogea: integrazione locale con policy presenza e gestione zone",
    description:
      "Analisi tecnica del repository Cobracco/home-assistant-termogea: climate per zona, policy presenza, persistenza nativa e servizi operativi in Home Assistant.",
    date: "2026-03-11",
    readingTime: "7 min",
    keywords: [
      "Home Assistant",
      "Termogea",
      "custom integration",
      "climate zone",
      "presenza",
      "automazione",
    ],
    body: [
      {
        type: "paragraph",
        text: "Il repository `home-assistant-termogea` e una custom integration Home Assistant orientata a un caso reale: controllare impianti Termogea in locale, con logica di presenza persone e gestione multi-zona persistente. Non e un prototipo minimo, ma una base operativa con config flow, storage e servizi dedicati.",
      },
      {
        type: "paragraph",
        text: "### Architettura: integrazione locale e polling controllato",
      },
      {
        type: "paragraph",
        text: "Nel `manifest.json` l'integrazione dichiara `integration_type: hub` e `iot_class: local_polling`. Questo significa che il dialogo con il controller avviene sulla rete locale e che lo stato viene aggiornato con un ciclo di polling configurabile (default 30 secondi, range 10-300).",
      },
      {
        type: "paragraph",
        text: "Dal punto di vista operativo e un vantaggio importante: minore dipendenza da cloud esterni e comportamento piu prevedibile in ambienti residenziali o office.",
      },
      {
        type: "paragraph",
        text: "### Entita esposte: climate, sensor e binary_sensor",
      },
      {
        type: "list",
        items: [
          "Entita `climate` per ogni zona con mapping completo",
          "Supporto a target temperature e modalita heat/off dove disponibile",
          "Sensori di policy per capire target effettivo, modalita attiva e zone configurate",
          "Binary sensor per stato presenza persone, presenza rilevata e abilitazione zona",
        ],
      },
      {
        type: "paragraph",
        text: "In pratica non hai solo il controllo temperatura: hai anche telemetria utile per dashboard e troubleshooting della logica di automazione.",
      },
      {
        type: "paragraph",
        text: "### Config flow e persistenza: meno YAML, piu governance",
      },
      {
        type: "paragraph",
        text: "Il progetto usa `config_flow` e `options flow` per gestire connessione, impostazioni globali, zone, schedule e mapping registri. La persistenza e gestita da storage interno (`TermogeaStorageManager`) e include anche import legacy da YAML.",
      },
      {
        type: "paragraph",
        text: "Questo approccio riduce errori manuali, rende le modifiche piu tracciabili e facilita la manutenzione quando il numero di zone cresce.",
      },
      {
        type: "paragraph",
        text: "### Policy di zona: persone, sensori e fallback termici",
      },
      {
        type: "paragraph",
        text: "Uno dei punti piu interessanti e il motore di policy: ogni zona puo combinare persone assegnate, sensore di presenza e parametri come common area, manual override e preset termici (comfort, eco, away, night, inactive).",
      },
      {
        type: "paragraph",
        text: "Quando l'integrazione applica una policy, calcola decisione e target effettivo e poi scrive i registri necessari sul controller (setpoint e, se previsto, stato HVAC).",
      },
      {
        type: "paragraph",
        text: "### Servizi utili in esercizio",
      },
      {
        type: "list",
        items: [
          "`termogea.apply_zone_policy` per applicare la policy a una singola zona",
          "`termogea.apply_all_zone_policies` per riallineare tutte le zone",
          "`termogea.force_relogin` per forzare una nuova autenticazione",
          "`termogea.import_legacy_yaml` per migrazione configurazioni pregresse",
        ],
      },
      {
        type: "paragraph",
        text: "Sono servizi pratici in fase di commissioning e nelle attivita di supporto, perche permettono di validare rapidamente comportamento e coerenza stato.",
      },
      {
        type: "paragraph",
        text: "### Perche questo repository e rilevante per progetti reali",
      },
      {
        type: "paragraph",
        text: "Per chi integra automazione edificio e software su misura, `home-assistant-termogea` mostra un pattern solido: logica locale, configurazione via UI, policy esplicite, telemetria leggibile e migrazione da legacy. E una base concreta per ridurre attrito operativo e aumentare controllabilita nel tempo.",
      },
      {
        type: "paragraph",
        text: "Repository: https://github.com/Cobracco/home-assistant-termogea",
      },
      {
        type: "cta",
        text: "Vuoi integrare impianti e processi operativi in modo piu robusto con Home Assistant?",
        href: "/contatti",
        label: "Parla con noi",
      },
    ],
  },
  {
    slug: "vantaggi-odoo-crm-per-la-direzione-commerciale",
    title: "Odoo CRM: vantaggi concreti per la direzione commerciale",
    description:
      "Pipeline piu controllata, forecasting piu affidabile e processi vendita piu efficienti: i vantaggi pratici di Odoo CRM per team commerciali.",
    date: "2026-03-02",
    readingTime: "6 min",
    keywords: ["Odoo CRM", "direzione commerciale", "pipeline vendite", "forecast", "CRM"],
    body: [
      {
        type: "paragraph",
        text: "Molti team commerciali lavorano ancora tra fogli di calcolo, inbox e strumenti separati. Il risultato e una pipeline poco leggibile, previsioni instabili e troppo tempo perso in attivita manuali. Odoo CRM riduce questa frammentazione in modo operativo.",
      },
      {
        type: "paragraph",
        text: "### 1) Pipeline visibile e decisioni piu rapide",
      },
      {
        type: "paragraph",
        text: "Con una pipeline unica e aggiornata in tempo reale, la direzione commerciale vede subito dove si bloccano le trattative, quali opportunita stanno rallentando e su quali deal concentrare il team.",
      },
      {
        type: "paragraph",
        text: "### 2) Forecast commerciale piu affidabile",
      },
      {
        type: "paragraph",
        text: "Quando fasi, probabilita e attivita sono tracciate in modo coerente, il forecast non dipende da stime soggettive. Questo migliora la qualita delle riunioni commerciali e riduce sorprese a fine trimestre.",
      },
      {
        type: "paragraph",
        text: "### 3) Meno lavoro amministrativo, piu tempo vendita",
      },
      {
        type: "list",
        items: [
          "Automazione follow-up e promemoria",
          "Task assegnati per fase opportunita",
          "Storico completo di note, email e appuntamenti",
          "Template e attivita ricorrenti per il team",
        ],
      },
      {
        type: "paragraph",
        text: "Il beneficio pratico e semplice: meno operazioni ripetitive e piu tempo sulle trattative ad alto valore.",
      },
      {
        type: "paragraph",
        text: "### 4) Allineamento vendite-marketing",
      },
      {
        type: "paragraph",
        text: "Odoo CRM facilita la gestione lead dal primo contatto alla conversione. La direzione commerciale puo distinguere meglio lead qualificati, performance dei canali e contributo reale delle campagne.",
      },
      {
        type: "paragraph",
        text: "### 5) Scalabilita del processo commerciale",
      },
      {
        type: "paragraph",
        text: "Quando il team cresce, processi non standardizzati diventano un collo di bottiglia. Odoo CRM permette di definire regole, passaggi e responsabilita in modo ripetibile, mantenendo controllo anche su volumi piu alti.",
      },
      {
        type: "paragraph",
        text: "### Conclusione",
      },
      {
        type: "paragraph",
        text: "Odoo CRM non e solo un software per registrare contatti: e uno strumento di governance commerciale. Se usato con un processo chiaro, aiuta la direzione commerciale a migliorare conversioni, prevedibilita e produttivita.",
      },
      {
        type: "cta",
        text: "Vuoi valutare se Odoo CRM e adatto al tuo processo commerciale?",
        href: "/contatti",
        label: "Parla con noi",
      },
    ],
  },
  {
    slug: "stripe-lab-webhook-stripe-locale",
    title: "Stripe Lab: testare webhook Stripe locali su piu app senza caos",
    description:
      "Panoramica pratica del repository Cobracco/stripe-lab: registry centralizzato, listener dedicati e workflow PowerShell per test webhook in locale.",
    date: "2026-02-26",
    readingTime: "5 min",
    keywords: ["Stripe", "webhook", "PowerShell", "Windows Server", "testing"],
    body: [
      {
        type: "paragraph",
        text: "Quando un team lavora su piu applicazioni che dipendono da Stripe, il testing locale dei webhook puo diventare fragile: listener sovrapposti, chiavi non isolate e segreti sparsi. `stripe-lab` nasce per standardizzare questo flusso in modo ripetibile.",
      },
      {
        type: "paragraph",
        text: "### Cosa risolve stripe-lab",
      },
      {
        type: "list",
        items: [
          "Registry centralizzato delle app in `config/apps.json`",
          "Listener Stripe CLI dedicato per ogni applicazione",
          "Start/stop singolo o batch con script PowerShell",
          "Estrazione del webhook secret runtime in file locale",
          "Log e PID separati per ogni app",
        ],
      },
      {
        type: "paragraph",
        text: "### Sicurezza e confini del progetto",
      },
      {
        type: "paragraph",
        text: "Il repository e dichiaratamente demo/local testing: usa solo chiavi `sk_test_*`, blocca le `sk_live_*` e non versione segreti. Questo riduce errori operativi quando si onboardano nuovi repo o ambienti di test.",
      },
      {
        type: "paragraph",
        text: "### Flusso operativo tipico",
      },
      {
        type: "list",
        items: [
          "Installazione Stripe CLI",
          "Inizializzazione cartelle di lavoro",
          "Configurazione app in `apps.json`",
          "Avvio listener per app target",
          "Trigger eventi test (es. `checkout.session.completed`)",
          "Controllo stato globale e log",
        ],
      },
      {
        type: "paragraph",
        text: "Per team che sviluppano software su misura o MVP con pagamenti Stripe, questo approccio evita configurazioni ad hoc su ogni macchina e rende il debugging webhook molto piu veloce.",
      },
      {
        type: "paragraph",
        text: "Repository: https://github.com/Cobracco/stripe-lab",
      },
      {
        type: "cta",
        text: "Vuoi integrare Stripe in modo robusto nel tuo prodotto?",
        href: "/contatti",
        label: "Parla con noi",
      },
    ],
  },
  {
    slug: "home-assistant-aruba-ddns-addon",
    title: "Home Assistant + Aruba DDNS: add-on pronto per DNS dinamico e certificati",
    description:
      "Panoramica pratica del repository Cobracco per aggiornare Aruba DDNS e gestire Let's Encrypt via DNS-01.",
    date: "2026-02-14",
    readingTime: "5 min",
    keywords: ["Home Assistant", "Aruba", "DDNS", "Let's Encrypt"],
    body: [
      {
        type: "paragraph",
        text: "Quando ospiti servizi in casa o in ufficio, IP dinamico e certificati SSL sono due problemi ricorrenti. Il repository `home-assistant-aruba-ddns` nasce per risolverli in modo operativo dentro Home Assistant.",
      },
      {
        type: "paragraph",
        text: "### Cosa fa l'add-on Aruba DDNS",
      },
      {
        type: "paragraph",
        text: "L'add-on incluso aggiorna automaticamente il DNS dinamico su Aruba e integra la gestione certificati Let's Encrypt con challenge DNS-01. In pratica: dominio sempre aggiornato e certificati rinnovabili senza passaggi manuali.",
      },
      {
        type: "paragraph",
        text: "### Installazione rapida in Home Assistant",
      },
      {
        type: "list",
        items: [
          "Aggiungi il repository custom negli Add-ons di Home Assistant",
          "Seleziona e installa l'add-on `Aruba DDNS`",
          "Configura credenziali e parametri dominio",
          "Verifica log e primo aggiornamento DNS",
        ],
      },
      {
        type: "paragraph",
        text: "Il repository e strutturato in modo essenziale: `repository.yaml` per i metadata del catalogo add-on e cartella `aruba-ddns/` con la logica dell'add-on.",
      },
      {
        type: "paragraph",
        text: "### Compatibilita e target",
      },
      {
        type: "paragraph",
        text: "Il progetto e pensato per installazioni Home Assistant OS/Supervised e dichiara supporto multi-architettura (`aarch64`, `amd64`, `armv7`, `armhf`, `i386`).",
      },
      {
        type: "paragraph",
        text: "### Perche e utile",
      },
      {
        type: "paragraph",
        text: "Riduce errori manuali su DNS e certificati, migliora continuita dei servizi esposti e semplifica la manutenzione operativa nel tempo.",
      },
      {
        type: "paragraph",
        text: "Repository: https://github.com/Cobracco/home-assistant-aruba-ddns",
      },
    ],
  },
  {
    slug: "mvp-vertical-slice-example",
    title: "Building an MVP without painting yourself into a corner",
    description:
      "Perche un MVP puo restare manutenibile: un esempio pratico di vertical slice e trade-off chiari.",
    date: "2026-01-29",
    readingTime: "6 min",
    keywords: ["MVP", "architettura", "vertical slice", "startup"],
    body: [
      {
        type: "paragraph",
        text: "Un MVP spesso si rompe prima di trovare il product-market fit: feature fatte in fretta, confini sfocati e un primo refactor che diventa riscrittura. Questo post mostra come evitarlo senza rallentare il time-to-market.",
      },
      {
        type: "paragraph",
        text: "### Il problema: MVP che invecchiano in settimane",
      },
      {
        type: "paragraph",
        text: "Quando tutto vive nello stesso modulo e le dipendenze sono casuali, ogni nuova feature diventa piu costosa. Il risultato e che l'MVP non scala nemmeno a se stesso.",
      },
      {
        type: "paragraph",
        text: "### Perche una Vertical Slice Architecture",
      },
      {
        type: "paragraph",
        text: "Nel repository ogni feature e una slice verticale: API, logica e UI sono organizzate per caso d'uso. Invece di costruire una base generica, si cresce per funzionalita reali, con confini chiari e meno accoppiamento.",
      },
      {
        type: "paragraph",
        text: "### Trade-off intenzionali",
      },
      {
        type: "list",
        items: [
          "Semplicita rispetto a completezza: pochi casi d'uso ben delimitati",
          "Coerenza dei confini invece di astrazioni premature",
          "Test mirati sulle slice, non su ogni strato astratto",
        ],
      },
      {
        type: "paragraph",
        text: "### Stack e riferimento",
      },
      {
        type: "paragraph",
        text: "Lo stack e leggero (Python, FastAPI, Vite, React) e serve solo a mostrare le scelte architetturali. Il repository non e un boilerplate: e un riferimento ragionato per impostare MVP solidi.",
      },
      {
        type: "paragraph",
        text: "Repository: https://github.com/Cobracco/cobracco-mvp-saas-example",
      },
      {
        type: "paragraph",
        text: "Per Cobracco un MVP valido e un prodotto minimo ma strutturato: abbastanza semplice per validare rapidamente, abbastanza chiaro da non vincolare la crescita futura.",
      },
    ],
  },
  {
    slug: "clean-architecture-dotnet-example",
    title: "Clean Architecture in practice: a concrete .NET example",
    description:
      "Un esempio concreto di Clean Architecture in .NET per rendere confini e responsabilita davvero verificabili.",
    date: "2026-01-28",
    readingTime: "6 min",
    keywords: ["Clean Architecture", ".NET", "architettura", "DDD"],
    body: [
      {
        type: "paragraph",
        text: "Clean Architecture e spesso raccontata in modo teorico: diagrammi perfetti e poco codice. Questo esempio mostra come rendere i confini espliciti, senza trasformare il progetto in un esercizio accademico.",
      },
      {
        type: "paragraph",
        text: "### Il problema: teoria senza confini reali",
      },
      {
        type: "paragraph",
        text: "Quando tutto compila ma le dipendenze sono ambigue, il team perde tempo a discutere dove mettere le cose. Qui le regole sono verificabili e il codice le rispetta.",
      },
      {
        type: "paragraph",
        text: "### Confini pratici: layer, ports/adapters, use case",
      },
      {
        type: "paragraph",
        text: "L'esempio separa chiaramente i layer, usa porte e adattatori per isolare infrastruttura e framework, e modella i use case come punti di ingresso. Il risultato e una dipendenza unidirezionale comprensibile al primo sguardo.",
      },
      {
        type: "paragraph",
        text: "### Chiarezza > astuzia",
      },
      {
        type: "paragraph",
        text: "L'obiettivo non e introdurre piu astrazioni possibili, ma rendere il flusso di decisioni leggibile. Se una regola non e evidente nel codice, non e un vantaggio architetturale.",
      },
      {
        type: "paragraph",
        text: "### Quando ha senso (e quando no)",
      },
      {
        type: "paragraph",
        text: "Questo approccio funziona per domini con logica centrale e team che devono evolvere la base nel tempo. E sovradimensionato per prototipi usa-e-getta o micro-servizi banali.",
      },
      {
        type: "paragraph",
        text: "Repository: https://github.com/Cobracco/cobracco-architecture-example",
      },
      {
        type: "paragraph",
        text: "Il progetto e un riferimento didattico: non promette scorciatoie, ma un esempio concreto di separazione delle responsabilita in .NET.",
      },
    ],
  },
  {
    slug: "sviluppo-software-su-misura-pmi",
    title: "Sviluppo software su misura per medie e grandi imprese: quando conviene davvero",
    description:
      "Capire se costruire un software su misura ha senso: segnali, costi nascosti e vantaggi per organizzazioni con processi complessi.",
    date: "2026-01-15",
    readingTime: "6 min",
    keywords: ["software su misura", "medie e grandi imprese", "sviluppo", "processi"],
    body: [
      {
        type: "paragraph",
        text: "Molte organizzazioni iniziano con strumenti generici: fogli di calcolo, software verticali non adattabili, processi manuali. Funziona fino a quando la crescita rende evidente il costo nascosto di inefficienze e errori.",
      },
      {
        type: "paragraph",
        text: "Lo sviluppo su misura conviene quando il processo centrale del business non e coperto bene da software standard o quando le integrazioni diventano una giungla di workaround.",
      },
      {
        type: "paragraph",
        text: "Un'altra situazione tipica: un gestionale storico frena l'operativita. Qui un progetto su misura permette di migrare step by step, riducendo il rischio.",
      },
      {
        type: "paragraph",
        text: "Il punto non e fare un software enorme, ma costruire esattamente cio che serve per ridurre tempi, aumentare controllo e offrire un'esperienza migliore a clienti e team interni.",
      },
      {
        type: "list",
        items: [
          "Processi critici manuali o duplicati",
          "Scarsa visibilita sui dati operativi",
          "Integrazioni instabili tra CRM ed ERP",
          "Tempo perso in riconciliazioni e controlli",
        ],
      },
      {
        type: "paragraph",
        text: "La scelta giusta non e sempre un progetto gigante: spesso un MVP interno o un modulo mirato produce valore subito e apre la strada a evoluzioni successive.",
      },
      {
        type: "paragraph",
        text: "Se sei a Roma o lavori in tutta Italia con team distribuiti, il modello remote-first riduce costi e accelera le decisioni. L'importante e la governance, non la distanza.",
      },
      {
        type: "paragraph",
        text: "Conclusione: conviene quando il software diventa leva strategica. Se i processi sono il tuo vantaggio, vale la pena possederne il cuore digitale.",
      },
      {
        type: "cta",
        text: "Vuoi capire se un progetto su misura ha senso per la tua organizzazione?",
        href: "/contatti",
        label: "Parla con noi",
      },
    ],
  },
  {
    slug: "quanto-costa-un-mvp",
    title: "Quanto costa un MVP? Come stimare budget e tempi senza sprechi",
    description:
      "Guida pratica per startup: come stimare un MVP, evitare scope creep e ottenere un preventivo realistico.",
    date: "2026-01-18",
    readingTime: "7 min",
    keywords: ["MVP", "startup", "budget", "tempi"],
    body: [
      {
        type: "paragraph",
        text: "Il costo di un MVP non dipende solo dalle funzionalita, ma dalla chiarezza con cui definisci il problema. Un MVP nasce per validare ipotesi, non per coprire tutto.",
      },
      {
        type: "paragraph",
        text: "Il primo passo e definire un perimetro minimo: chi e l'utente, quale azione compie, quale valore ottiene. Tutto il resto e nice-to-have.",
      },
      {
        type: "paragraph",
        text: "La stima realistica include discovery, UX, sviluppo, QA e un minimo di analytics per misurare l'uso. Se salti questi passaggi, paghi dopo.",
      },
      {
        type: "paragraph",
        text: "Per evitare sprechi, lavora per fasi e chiedi rilasci frequenti. Un MVP che non si testa con utenti reali e solo un software incompleto.",
      },
      {
        type: "list",
        items: [
          "Scope essenziale e misurabile",
          "Priorita condivise con il team tecnico",
          "Budget con margine per iterazioni",
          "Timeline 4-6 settimane per un piano minimale",
        ],
      },
      {
        type: "paragraph",
        text: "Il range puo variare molto. Un preventivo serio parte da una call, da requisiti scritti e da un prototipo semplice: cosi si evita il classico extra di fine progetto.",
      },
      {
        type: "paragraph",
        text: "Se stai validando la tua idea, un piano MVP competitivo ti permette di testare il mercato prima di investire tutto.",
      },
      {
        type: "paragraph",
        text: "Conclusione: non cercare il prezzo piu basso, cerca il partner che ti aiuta a definire cosa serve davvero per validare.",
      },
      {
        type: "cta",
        text: "Vuoi un piano MVP chiaro e rapido?",
        href: "/mvp-startup",
        label: "Scopri il piano MVP",
      },
    ],
  },
  {
    slug: "ai-in-azienda-casi-uso-pmi",
    title: "AI in azienda: 5 casi d'uso concreti per medie e grandi imprese",
    description:
      "Dalla ricerca documentale alla classificazione ticket: casi d'uso concreti per portare AI nei processi aziendali.",
    date: "2026-01-21",
    readingTime: "6 min",
    keywords: ["AI", "medie e grandi imprese", "automazioni", "RAG"],
    body: [
      {
        type: "paragraph",
        text: "L'AI non e una magia: funziona quando automatizza compiti ripetitivi o accelera decisioni basate su dati. Per le medie e grandi imprese, il valore e spesso immediato.",
      },
      {
        type: "paragraph",
        text: "Il primo caso d'uso e la ricerca documentale: con un motore RAG puoi trovare risposte in policy, manuali o contratti in pochi secondi.",
      },
      {
        type: "paragraph",
        text: "Secondo: estrazione dati da PDF e email. Qui si riduce il lavoro manuale di inserimento e si aumenta la qualita dei dati.",
      },
      {
        type: "paragraph",
        text: "Terzo: assistenti operativi per team commerciali e customer care. Un assistente interno riduce il tempo per rispondere a richieste standard.",
      },
      {
        type: "list",
        items: [
          "RAG documentale per FAQ e manuali",
          "Estrazione dati da documenti",
          "Classificazione ticket e richieste",
          "Assistenti per vendite e supporto",
          "Workflow intelligenti tra sistemi",
        ],
      },
      {
        type: "paragraph",
        text: "Quarto e quinto: classificazione ticket e workflow intelligenti. Qui l'AI agisce come orchestratore, non come sostituto.",
      },
      {
        type: "paragraph",
        text: "L'aspetto chiave e la sicurezza: dati chiari, accessi controllati e scelte tecnologiche trasparenti.",
      },
      {
        type: "paragraph",
        text: "Conclusione: parti da un caso d'uso concreto, misura il risultato e poi scala.",
      },
      {
        type: "cta",
        text: "Vuoi capire dove l'AI crea valore nella tua azienda?",
        href: "/ai",
        label: "Scopri le soluzioni AI",
      },
    ],
  },
  {
    slug: "integrazioni-api-crm-erp",
    title: "Integrazioni API tra CRM ed ERP: errori comuni e come evitarli",
    description:
      "Le integrazioni CRM-ERP sono delicate: ecco gli errori piu frequenti e le buone pratiche per evitarli.",
    date: "2026-01-24",
    readingTime: "7 min",
    keywords: ["API", "CRM", "ERP", "integrazioni"],
    body: [
      {
        type: "paragraph",
        text: "Integrare CRM ed ERP sembra semplice: sincronizzare anagrafiche e ordini. In realta, le differenze tra sistemi creano problemi se non si definiscono regole chiare.",
      },
      {
        type: "paragraph",
        text: "Errore numero uno: non gestire il master data. Chi e la fonte di verita? Se entrambi i sistemi modificano gli stessi dati, i conflitti sono inevitabili.",
      },
      {
        type: "paragraph",
        text: "Errore numero due: mancanza di monitoraggio. Senza log e alert, un'integrazione si rompe e nessuno se ne accorge per giorni.",
      },
      {
        type: "paragraph",
        text: "Errore numero tre: API non versionate. Un piccolo cambiamento puo bloccare l'intera pipeline.",
      },
      {
        type: "list",
        items: [
          "Definisci i dati master e le regole di conflitto",
          "Implementa log, retry e notifiche",
          "Usa API versionate e testate",
          "Documenta ogni flusso critico",
        ],
      },
      {
        type: "paragraph",
        text: "Buona pratica: iniziare con un'integrazione minima, poi estendere con nuovi flussi solo dopo aver stabilizzato la base.",
      },
      {
        type: "paragraph",
        text: "Se il tuo CRM o ERP e legacy, un middleware leggero spesso risolve senza riscrivere tutto.",
      },
      {
        type: "paragraph",
        text: "Conclusione: le integrazioni sono strategiche. Affidarsi a un team con esperienza evita costi nascosti e blocchi operativi.",
      },
      {
        type: "cta",
        text: "Hai bisogno di integrare CRM ed ERP in modo sicuro?",
        href: "/contatti",
        label: "Parla con noi",
      },
    ],
  },
];

function getGeneratedPosts(): BlogPost[] {
  if (typeof process === "undefined") {
    return [];
  }

  try {
    const filePath = path.join(process.cwd(), "data", "blog.json");

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mergePosts(seed: BlogPost[], generated: BlogPost[]) {
  const map = new Map<string, BlogPost>();

  seed.forEach((post) => map.set(post.slug, post));
  generated.forEach((post) => map.set(post.slug, post));

  return Array.from(map.values());
}

export function getAllPosts() {
  const generated = getGeneratedPosts();
  return mergePosts(seedPosts, generated).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const generated = getGeneratedPosts();
  return mergePosts(seedPosts, generated).find((post) => post.slug === slug);
}

export { seedPosts };
