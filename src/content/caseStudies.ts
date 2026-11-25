export type CaseStudyBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type CaseStudy = {
  slug: string;
  projectTitle: string;
  title: string;
  description: string;
  tagline: string;
  projectHref: string;
  stack: string[];
  context: CaseStudyBodyBlock[];
  approach: CaseStudyBodyBlock[];
  outcome: CaseStudyBodyBlock[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nexus",
    projectTitle: "Nexus",
    title: "Caso studio Nexus: un gateway unico per l'orchestrazione AI",
    description:
      "Come Cobracco ha progettato Nexus, la piattaforma interna che governa l'accesso a più fornitori di modelli linguistici con policy, tracciabilità e portabilità on-premise.",
    tagline:
      "Un gateway unico per smettere di dipendere da un solo fornitore di modelli linguistici",
    projectHref: "https://nexus.cobracco.it",
    stack: ["Rust", "PostgreSQL", "Redis", "Database vettoriale"],
    context: [
      {
        type: "paragraph",
        text: "Le aziende che iniziano a integrare l'intelligenza artificiale in più punti del proprio software finiscono spesso con integrazioni dirette verso un singolo fornitore di modelli linguistici, sparse nel codice applicativo. Cambiare fornitore, applicare policy di sicurezza coerenti o anche solo sapere quali dati sono usciti verso quale modello diventa complicato.",
      },
      {
        type: "paragraph",
        text: "Cobracco ha affrontato lo stesso problema al proprio interno e ha deciso di risolverlo con una piattaforma dedicata, non con un'ennesima integrazione puntuale.",
      },
    ],
    approach: [
      {
        type: "paragraph",
        text: "Nexus è la piattaforma di orchestrazione AI che Cobracco sviluppa e usa internamente: un gateway unico tra le applicazioni e i principali fornitori di modelli linguistici, con un core scritto in Rust.",
      },
      {
        type: "list",
        items: [
          "Instradamento guidato dal livello di sensibilità del dato, non da regole fisse: embedding, reranking e classificazione restano in locale, verso il cloud esce solo la generazione",
          "Oscuramento dei dati personali su ogni payload in uscita, prima che lasci il perimetro interno",
          "Registro strutturato di ogni chiamata ai modelli, consultabile come audit trail",
          "Quality gate automatici sul codice prodotto: nessuna modifica entra nel ramo principale senza superare la verifica completa",
          "Motore agenti nativo in Rust, con IDE web, CLI ed estensione per editor; dati su PostgreSQL, Redis e un database vettoriale",
        ],
      },
    ],
    outcome: [
      {
        type: "paragraph",
        text: "Il punto chiave è che il codice applicativo non sa quale fornitore sta usando: tutto passa dal gateway unificato. Spostare il carico su modelli self-hosted installati nell'infrastruttura del cliente richiede un cambio di configurazione e dell'adattatore del fornitore, non una riscrittura.",
      },
      {
        type: "paragraph",
        text: "Il risultato è un'infrastruttura AI che resta governabile anche quando il numero di modelli, fornitori e casi d'uso cresce: ogni decisione presa dai modelli è tracciata, ogni dato sensibile è trattato secondo policy esplicite, e il passaggio a un'infrastruttura on-premise resta un'opzione concreta, non teorica.",
      },
    ],
  },
  {
    slug: "superai",
    projectTitle: "SuperAI",
    title: "Caso studio SuperAI: una piattaforma AI chat-first con governance operativa",
    description:
      "Come Cobracco ha costruito SuperAI, una piattaforma AI multi-tenant con API OpenAI-compatible e una console admin pensata per chi deve gestire provider, billing e configurazioni, non solo una chat.",
    tagline: "Una piattaforma AI chat-first con governance operativa reale",
    projectHref: "https://ai.cobracco.it",
    stack: ["SQL Server", "API OpenAI-compatible", "Server-Sent Events"],
    context: [
      {
        type: "paragraph",
        text: "Offrire funzionalità AI ai propri utenti significa, in pratica, gestire molto più di una finestra di chat: sessioni separate per ogni cliente (tenant), più fornitori di modelli da monitorare e fatturare, compatibilità con client e strumenti già costruiti attorno alle API OpenAI, e un pannello che permetta a chi gestisce la piattaforma di vedere cosa succede senza dover leggere i log.",
      },
    ],
    approach: [
      {
        type: "paragraph",
        text: "SuperAI è la piattaforma che Cobracco ha sviluppato per rispondere a questo bisogno: un'applicazione web chat-first con sessioni utente isolate per tenant, affiancata da una console amministrativa separata dal prodotto rivolto agli utenti finali.",
      },
      {
        type: "list",
        items: [
          "Web app chat-first con sessioni utente tenant-scoped",
          "API OpenAI-compatible per chat, responses, embeddings e models, utilizzabili da client già esistenti",
          "Admin console dedicata per configurazioni, stato di salute dei provider, billing e governance",
          "Workflow su documenti, generazione di presentazioni e copilot con risposte in streaming (SSE)",
          "Persistenza su SQL Server, con audit e policy versionate come fonte di verità",
        ],
      },
    ],
    outcome: [
      {
        type: "paragraph",
        text: "Chi integra SuperAI tramite le sue API non deve riscrivere l'integrazione se già utilizza client compatibili con le API OpenAI: il contratto è lo stesso, cambia cosa succede dietro al gateway.",
      },
      {
        type: "paragraph",
        text: "E chi gestisce la piattaforma ha una console separata dal prodotto per gli utenti finali, in cui ogni configurazione, ogni policy e ogni decisione di billing è versionata e verificabile, invece di vivere solo nella memoria di chi l'ha impostata.",
      },
    ],
  },
  {
    slug: "fullengage",
    projectTitle: "FullEngage",
    title: "Caso studio FullEngage: un'unica piattaforma di recruiting al posto di strumenti scollegati",
    description:
      "Come Cobracco ha progettato FullEngage, piattaforma di recruiting con quattro frontend su un'unica base tecnica condivisa: sito pubblico, dashboard candidato, hub recruiter e console superadmin.",
    tagline: "Un'unica piattaforma di recruiting al posto di quattro strumenti scollegati",
    projectHref: "https://fullengage.it",
    stack: ["Monorepo npm workspaces", "Autenticazione cross-domain", "WhatsApp Business API"],
    context: [
      {
        type: "paragraph",
        text: "Un processo di recruiting coinvolge, nella pratica, pubblici molto diversi: chi cerca lavoro, chi seleziona, chi amministra la piattaforma. Costruirli come prodotti separati porta quasi sempre a design disallineati, autenticazioni duplicate e dati che non comunicano tra loro.",
      },
    ],
    approach: [
      {
        type: "paragraph",
        text: "FullEngage è una piattaforma di recruiting intelligente che Cobracco ha costruito su un'architettura monorepo con microservizi, in modo che i diversi fronti condividano la stessa base invece di evolvere in isolamento.",
      },
      {
        type: "list",
        items: [
          "Monorepo npm workspaces con una libreria UI condivisa e quattro frontend distinti: sito pubblico, dashboard candidato, hub recruiter, console superadmin",
          "Dashboard candidato con profilo, gestione documenti, integrazione LinkedIn e smart processing dei dati",
          "Hub recruiter per la gestione di progetti, selezioni e team",
          "Sistema pubblico dei profili con permessi granulari, tracciamento delle visualizzazioni e notifiche",
          "Funzionalità operative su WhatsApp Business, analisi documentale con AI e governance superadmin",
        ],
      },
    ],
    outcome: [
      {
        type: "paragraph",
        text: "I quattro frontend condividono lo stesso design system e la stessa libreria UI, e l'autenticazione è unica tra i domini: non ci sono doppi login tra l'area candidato, l'hub recruiter e la console di amministrazione.",
      },
      {
        type: "paragraph",
        text: "Questo significa che un cambiamento nella logica di permessi o nel flusso di un profilo si propaga in modo coerente su tutti i fronti della piattaforma, invece di dover essere replicato manualmente prodotto per prodotto.",
      },
    ],
  },
  {
    slug: "redemptor",
    projectTitle: "Redemptor",
    title: "Caso studio Redemptor: un marketplace che segue la consegna del software, non solo la selezione",
    description:
      "Come Cobracco ha costruito Redemptor, marketplace AI per talenti tech con monitoraggio continuo su GitHub, controlli automatici di qualità e pagamenti legati allo stato di avanzamento lavori.",
    tagline: "Un marketplace che non si ferma alla selezione, ma segue la consegna del software",
    projectHref: "https://www.redemptor.it",
    stack: ["Integrazione GitHub", "CI/CD monitoring", "Workflow legali e NDA"],
    context: [
      {
        type: "paragraph",
        text: "Trovare un professionista tech freelance affidabile è relativamente semplice da promettere su un marketplace; garantire che il lavoro venga poi consegnato con la qualità attesa, nei tempi concordati, è un problema diverso e più difficile, che la sola fase di selezione non risolve.",
      },
    ],
    approach: [
      {
        type: "paragraph",
        text: "Redemptor è il marketplace AI che Cobracco ha costruito per affrontare questo secondo problema: non si ferma alla pubblicazione dei progetti e alla selezione dei professionisti, ma resta attivo per tutta la durata del lavoro.",
      },
      {
        type: "list",
        items: [
          "Assistente AI per la definizione di requisiti e roadmap del progetto",
          "Monitoraggio diretto su GitHub: commit, pipeline CI/CD e stato di avanzamento",
          "Controlli automatici su qualità e compliance del codice prodotto",
          "Workflow legali e NDA integrati direttamente in piattaforma",
          "Pagamenti a tranche basati sullo stato di avanzamento lavori (SAL), non solo su scadenze di calendario",
        ],
      },
    ],
    outcome: [
      {
        type: "paragraph",
        text: "Il monitoraggio non si esaurisce nella scelta del professionista giusto: prosegue sui commit e sulla pipeline CI/CD per tutta la vita del progetto, con controlli automatici di qualità che restano attivi indipendentemente da quanto le parti si fidino tra loro.",
      },
      {
        type: "paragraph",
        text: "E poiché i pagamenti sono legati allo stato di avanzamento verificabile del lavoro, committente e professionista condividono lo stesso riferimento oggettivo su cosa sia stato effettivamente consegnato.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((item) => item.slug);
}
