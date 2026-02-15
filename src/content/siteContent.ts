export const siteContent = {
  brand: {
    name: "Cobracco",
    tagline: "Artigiani del software per PMI italiane.",
    description:
      "Sviluppiamo applicazioni e software chiavi in mano per PMI, con un team full-stack senior e un approccio artigianale che valorizza ogni progetto.",
    siteUrl: "https://cobracco.it",
  },
  seo: {
    primaryKeywords: [
      "sviluppo software",
      "sviluppo software su misura",
      "software house",
      "software house roma",
      "sviluppo applicazioni web",
      "sviluppo app mobile",
      "integrazioni API",
      "sviluppo software pmi",
    ],
    startupKeywords: [
      "mvp startup",
      "sviluppo mvp",
      "sviluppo prodotto digitale",
      "software per startup",
      "team tecnico startup",
    ],
    freelanceKeywords: [
      "sviluppatore software freelance",
      "freelance sviluppo software",
      "consulente software freelance",
      "sviluppatore freelance startup",
      "freelance full stack",
    ],
  },
  navigation: [
    { label: "Servizi", href: "/servizi" },
    { label: "Sviluppo Software", href: "/sviluppo-software" },
    { label: "MVP Startup", href: "/mvp-startup" },
    { label: "Freelance Software", href: "/freelance-sviluppatore-software" },
    { label: "AI", href: "/ai" },
    { label: "Metodo", href: "/metodo" },
    { label: "Progetti strategici", href: "/progetti-strategici" },
    { label: "Chi siamo", href: "/chi-siamo" },
    { label: "Lavora con noi", href: "/lavora-con-noi" },
    { label: "Blog", href: "/blog" },
  ],
  navigationGroups: [
    {
      label: "Servizi",
      href: "/servizi",
      items: [
        { label: "Sviluppo Software", href: "/sviluppo-software" },
        { label: "MVP Startup", href: "/mvp-startup" },
        { label: "Freelance Software", href: "/freelance-sviluppatore-software" },
        { label: "AI", href: "/ai" },
      ],
    },
    {
      label: "Azienda",
      href: "/chi-siamo",
      items: [
        { label: "Chi siamo", href: "/chi-siamo" },
        { label: "Metodo", href: "/metodo" },
        { label: "Progetti strategici", href: "/progetti-strategici" },
        { label: "Lavora con noi", href: "/lavora-con-noi" },
      ],
    },
    { label: "Blog", href: "/blog" },
  ],
  footer: {
    headline: "Cobracco, software house.",
    copy: "Artigiani del software. Soluzioni che durano.",
    address: "Roma (operativi in tutta Italia)",
    email: "contatto@brachini.com",
    phone: "3933370960",
  },
  pages: {
    home: {
      meta: {
        title: "Cobracco",
        description:
          "Sviluppo software su misura per PMI e startup: team senior, approccio artigianale, supporto freelance e delivery chiavi in mano.",
      },
      hero: {
        title: "Applicazioni su misura per PMI, senza compromessi.",
        subtitle:
          "Cobracco è il partner che trasforma le esigenze di business in software affidabile, con un team full-stack senior e un approccio da artigiani del digitale.",
        ctaLabel: "Parla con noi",
        ctaHref: "/contatti",
        secondaryLabel: "Scopri i servizi",
        secondaryHref: "/servizi",
      },
      highlights: [
        {
          title: "Chiavi in mano",
          text: "Analisi, UX, sviluppo e go-live. Gestiamo tutto il percorso, senza passaggi critici lasciati scoperti.",
        },
        {
          title: "Team senior full-stack",
          text: "Professionisti con esperienza pluriennale su web, mobile e sistemi integrati per PMI italiane.",
        },
        {
          title: "AI dove crea valore",
          text: "Integriamo soluzioni AI solo quando migliorano tempi, costi o qualita del lavoro.",
        },
      ],
      services: {
        title: "Servizi principali",
        text:
          "Dalla strategia alla manutenzione evolutiva, accompagniamo le PMI con un servizio continuo e trasparente.",
        items: [
          {
            title: "Sviluppo web app",
            text: "Piattaforme gestionali, portali clienti e dashboard operative con flussi su misura.",
          },
          {
            title: "App mobile",
            text: "Applicazioni iOS e Android integrate ai processi aziendali e ai dati esistenti.",
          },
          {
            title: "Integrazioni e API",
            text: "Connessioni sicure tra software, CRM, ERP e servizi esterni.",
          },
          {
            title: "Modernizzazione",
            text: "Rinnoviamo sistemi legacy migliorando performance, UX e sicurezza.",
          },
          {
            title: "Data & analytics",
            text: "Rendiamo i dati chiari e usabili con reportistica e indicatori chiave.",
          },
          {
            title: "AI applicata",
            text: "Automazioni intelligenti e assistenti operativi per ridurre il lavoro manuale.",
          },
        ],
      },
      seoLinks: {
        title: "Percorsi consigliati per chi deve sviluppare software",
        text: "Scegli il percorso in base al tuo obiettivo: prodotto startup, software su misura o supporto freelance senior.",
      },
      plans: {
        title: "Piani",
        text: "Tre percorsi chiari, pensati per startup e PMI con obiettivi diversi.",
        items: [
          {
            title: "MVP per Startup",
            description:
              "Piano minimale per validare in tempi rapidi con un prodotto solido.",
            bullets: ["4-6 settimane", "scope essenziale", "pronto per validare"],
            href: "/mvp-startup",
            ctaLabel: "Scopri il piano",
          },
          {
            title: "Software su misura per PMI",
            description:
              "Soluzioni chiavi in mano per processi critici e integrazioni complesse.",
            bullets: [
              "chiavi in mano",
              "integrazioni",
              "manutenzione evolutiva",
            ],
            href: "/sviluppo-software",
            ctaLabel: "Vai ai dettagli",
          },
          {
            title: "AI nelle applicazioni",
            description:
              "Automazioni e assistenti intelligenti quando generano valore reale.",
            bullets: [
              "RAG documentale",
              "estrazione dati",
              "workflow intelligenti",
            ],
            href: "/ai",
            ctaLabel: "Scopri l'AI",
          },
        ],
      },
      methodSummary: {
        title: "Metodo snello, risultati concreti",
        text: "Partiamo dalla discovery, definiamo un MVP solido e iteriamo con rilasci frequenti e feedback continui.",
      },
      aiSummary: {
        title: "AI integrata con criterio",
        text: "Dalla ricerca documentale ai workflow interni, adottiamo l'AI solo se crea valore misurabile.",
      },
      callToAction: {
        title: "Raccontaci il tuo progetto",
        text: "Siamo a Roma ma lavoriamo in tutta Italia. Organizziamo una call per valutare obiettivi, tempi e budget.",
        buttonLabel: "Richiedi una consulenza",
        buttonHref: "/contatti",
      },
    },
    servizi: {
      meta: {
        title: "Servizi",
        description:
          "Servizi di sviluppo software per PMI e startup: analisi, UX, sviluppo chiavi in mano, supporto freelance e manutenzione evolutiva.",
      },
      hero: {
        title: "Servizi completi per PMI che vogliono software affidabile.",
        subtitle:
          "Dalla prima analisi al supporto post-lancio, lavoriamo come partner tecnologico e non come fornitore a volume.",
      },
      sections: [
        {
          title: "Consulenza e discovery",
          text: "Raccogliamo obiettivi, vincoli e processi chiave. Definiamo roadmap, priorita e un piano sostenibile per la tua PMI.",
        },
        {
          title: "Progettazione e UX",
          text: "Prototipi rapidi, flussi chiari, UI accessibile. Progettiamo strumenti che il team usa davvero ogni giorno.",
        },
        {
          title: "Delivery e supporto",
          text: "Sviluppo full-stack, test, rilascio e manutenzione evolutiva. Restiamo disponibili anche dopo il go-live.",
        },
      ],
      serviceList: [
        {
          title: "Applicazioni web",
          text: "Gestionali e portali su misura per vendite, operations e customer care.",
        },
        {
          title: "App mobile",
          text: "Soluzioni mobile per agenti, tecnici, clienti o partner.",
        },
        {
          title: "Integrazioni e API",
          text: "Flussi automatizzati tra software aziendali e servizi esterni.",
        },
        {
          title: "Modernizzazione software",
          text: "Aggiornamento stack, migrazione dati e refactoring con rischio controllato.",
        },
        {
          title: "Data & BI",
          text: "KPI, report e dashboard per decisioni rapide e basate sui dati.",
        },
        {
          title: "AI applicata",
          text: "Automazioni intelligenti e assistenti intelligenti integrati nei processi di lavoro.",
        },
      ],
      plans: {
        title: "Piani",
        text: "Scegli il percorso piu adatto in base a maturita del progetto e obiettivi.",
        items: [
          {
            title: "MVP per Startup",
            description:
              "Piano minimale per validare in tempi rapidi con un prodotto solido.",
            bullets: ["4-6 settimane", "scope essenziale", "pronto per validare"],
            href: "/mvp-startup",
            ctaLabel: "Scopri il piano",
          },
          {
            title: "Software su misura per PMI",
            description:
              "Soluzioni chiavi in mano per processi critici e integrazioni complesse.",
            bullets: [
              "chiavi in mano",
              "integrazioni",
              "manutenzione evolutiva",
            ],
            href: "/sviluppo-software",
            ctaLabel: "Vai ai dettagli",
          },
          {
            title: "AI nelle applicazioni",
            description:
              "Automazioni e assistenti intelligenti quando generano valore reale.",
            bullets: [
              "RAG documentale",
              "estrazione dati",
              "workflow intelligenti",
            ],
            href: "/ai",
            ctaLabel: "Scopri l'AI",
          },
        ],
      },
    },
    sviluppoSoftware: {
      meta: {
        title: "Sviluppo Software",
        description:
          "Sviluppo software su misura per PMI e startup: team senior full-stack, approccio chiavi in mano e supporto freelance su progetti complessi.",
      },
      hero: {
        title: "Sviluppo software chiavi in mano per PMI.",
        subtitle:
          "Dalla strategia al rilascio: un team full-stack senior che segue il progetto dall'inizio alla fine, a Roma o da remoto in tutta Italia.",
      },
      whenNeeded: {
        title: "Quando serve",
        text: "Hai un processo critico gestito con Excel, tool frammentati o software obsoleti. Vuoi un'unica applicazione su misura che centralizzi dati e operazioni.",
      },
      includes: {
        title: "Cosa include chiavi in mano",
        items: [
          "Analisi dei processi e definizione requisiti",
          "UX/UI design e prototipi condivisi",
          "Sviluppo full-stack e integrazioni",
          "Test funzionali e sicurezza",
          "Rilascio in produzione e onboarding",
          "Supporto e manutenzione evolutiva",
        ],
      },
      approach: {
        title: "Approccio",
        text: "Lavoriamo in modo iterativo, con rilasci frequenti e validazioni continue con il team cliente. Massima trasparenza su tempi, costi e priorita.",
      },
      timing: {
        title: "Tempi",
        text: "Per una PMI tipica, un MVP solido richiede 6-12 settimane. Progetti piu complessi vengono pianificati per fasi, con risultati progressivi.",
      },
      technologies: {
        title: "Tecnologie",
        text: "Stack moderno e collaudato, selezionato in base a scalabilita, sicurezza e manutenzione nel tempo. Niente hype, solo strumenti che durano.",
      },
      faq: {
        title: "Domande frequenti",
        items: [
          {
            question: "Lavorate solo su Roma?",
            answer:
              "No. La sede e a Roma, ma lavoriamo remote-first con PMI in tutta Italia, con call regolari e presenza quando serve.",
          },
          {
            question: "Qual e il budget minimo per un progetto?",
            answer:
              "Dipende dalla complessita. Proponiamo sempre una roadmap con priorita, per costruire valore in modo sostenibile.",
          },
          {
            question: "Chi gestisce il progetto?",
            answer:
              "Hai un referente unico senior che coordina design, sviluppo e delivery, evitando dispersioni.",
          },
          {
            question: "Quanto tempo serve per andare online?",
            answer:
              "Spesso 6-12 settimane per un MVP, poi miglioramenti iterativi basati su feedback reali.",
          },
          {
            question: "Potete integrare software esistenti?",
            answer:
              "Si, integriamo ERP, CRM e servizi terzi tramite API e automazioni su misura.",
          },
          {
            question: "Offrite assistenza dopo il rilascio?",
            answer:
              "Si, con piani di manutenzione evolutiva, monitoraggio e supporto continuativo.",
          },
        ],
      },
    },
    mvpStartup: {
      meta: {
        title: "MVP per Startup",
        description:
          "Sviluppo MVP per startup con team senior e supporto freelance: piano minimale, tempi rapidi, costo competitivo e base tecnica solida.",
      },
      hero: {
        title: "MVP per startup, senza sprechi.",
        subtitle:
          "Un piano minimale per validare il prodotto con tempi rapidi e qualita da team senior. Ideale per fondatori che vogliono lanciare bene, non solo in fretta.",
      },
      perChi: {
        title: "Per chi e pensato",
        items: [
          "Startup early-stage",
          "Team non tecnico",
          "Founder che devono validare",
        ],
      },
      cosaInclude: {
        title: "Cosa include",
        items: [
          "Discovery light e definizione MVP",
          "UX essenziale con prototipo navigabile",
          "Sviluppo full-stack e API",
          "Deploy e ambienti pronti",
          "Analytics base per misurare uso",
          "Handoff e documentazione minima",
        ],
      },
      pianoMinimale: {
        title: "Cosa ottieni in 4-6 settimane",
        text: "Un MVP funzionante, pronto da mostrare a investitori o primi utenti, con le funzionalita essenziali e dati di utilizzo. Niente promesse irrealistiche: solo un prodotto solido per validare l'idea.",
      },
      pricing: {
        title: "Piano MVP",
        text: "Range indicativo da 9k a 25k, in base a scope e complessita. Dopo una call, prepariamo una proposta chiara con tempi e priorita.",
      },
      comeLavoriamo: {
        title: "Come lavoriamo",
        steps: [
          {
            title: "Settimana 1-2: Discovery e prototipo",
            text: "Allineamento obiettivi, definizione scope, wireframe e prototipo condiviso.",
          },
          {
            title: "Settimana 3-4: Build",
            text: "Sviluppo full-stack con rilasci incrementali e demo settimanali.",
          },
          {
            title: "Settimana 5: QA e refine",
            text: "Test, rifiniture UX e verifica dei flussi principali.",
          },
          {
            title: "Settimana 6: Release",
            text: "Deploy, monitoraggio iniziale e handoff operativo.",
          },
        ],
      },
      stack: {
        title: "Stack",
        text: "Stack moderno, Docker per ambienti riproducibili e CI/CD per rilasci veloci e sicuri.",
      },
      faq: {
        title: "FAQ",
        items: [
          {
            question: "Il codice e di mia proprieta?",
            answer:
              "Si, il codice e tuo. Consegnamo repository, documentazione base e accessi completi.",
          },
          {
            question: "Quanto tempo serve per un MVP?",
            answer:
              "Di norma 4-6 settimane per un piano minimale, con scope ben definito.",
          },
          {
            question: "Supportate il post-MVP?",
            answer:
              "Si, possiamo evolvere il prodotto con iterazioni e supporto continuativo.",
          },
          {
            question: "Accettate equity?",
            answer:
              "No, lavoriamo a progetto. Valutiamo solo collaborazioni con budget chiaro.",
          },
          {
            question: "Possiamo iterare durante lo sviluppo?",
            answer:
              "Si, ma gestiamo le modifiche con una roadmap chiara per non perdere tempi e focus.",
          },
          {
            question: "Integrare AI e possibile?",
            answer:
              "Si, se utile alla validazione. Valutiamo l'impatto e integriamo solo dove crea valore.",
          },
        ],
      },
      callToAction: {
        title: "Prenota una call con il team",
        text: "Raccontaci la tua idea e valutiamo insieme scope, tempi e budget per il tuo MVP.",
        buttonLabel: "Prenota una call",
        buttonHref: "/contatti",
      },
    },
    ai: {
      meta: {
        title: "AI",
        description:
          "Soluzioni AI applicate ai processi di PMI: RAG, estrazione dati, assistenti digitali e automazioni.",
      },
      hero: {
        title: "AI pratica per le PMI.",
        subtitle:
          "Portiamo l'intelligenza artificiale nei processi dove serve: meno lavori manuali, piu velocita e dati piu utili.",
      },
      items: [
        {
          title: "Ricerca documentale (RAG)",
          text: "Motori di ricerca interna che rispondono a domande sui documenti aziendali con fonti tracciabili.",
        },
        {
          title: "Estrazione dati",
          text: "Automazione di lettura e inserimento dati da PDF, email o moduli.",
        },
        {
          title: "Assistenti operativi",
          text: "Chat e tool interni per supportare vendite, customer care e team tecnici.",
        },
        {
          title: "Classificazione ticket",
          text: "Prioritizzazione automatica delle richieste con routing al team giusto.",
        },
        {
          title: "Workflow intelligenti",
          text: "Automazioni che orchestrano task tra software diversi per ridurre tempi e errori.",
        },
      ],
      security: {
        title: "Sicurezza e dati",
        text: "Valutiamo privacy, sicurezza e conformita. I dati restano sotto controllo, con policy chiare e accessi limitati.",
      },
    },
    metodo: {
      meta: {
        title: "Metodo",
        description:
          "Il metodo Cobracco: discovery, progettazione, delivery ed evoluzione con un team senior full-stack.",
      },
      hero: {
        title: "Un metodo artigianale e trasparente.",
        subtitle:
          "Ogni fase e pensata per ridurre rischi e mantenere alta la qualita, con un dialogo costante con il team cliente.",
      },
      steps: [
        {
          title: "1. Discovery",
          text: "Analisi del contesto, obiettivi, processi e stakeholder per definire un perimetro chiaro.",
        },
        {
          title: "2. Progettazione",
          text: "Wireframe, prototipi e architettura tecnica. Condivisione e feedback rapidi.",
        },
        {
          title: "3. Delivery",
          text: "Sviluppo iterativo, test e rilasci frequenti. Tutto misurato e documentato.",
        },
        {
          title: "4. Evoluzione",
          text: "Monitoraggio, manutenzione evolutiva e nuove funzionalita basate su dati reali.",
        },
      ],
    },
    progettiStrategici: {
      meta: {
        title: "Progetti strategici",
        description:
          "Una selezione di progetti strategici sviluppati da Cobracco: iniziative ad alto valore tecnologico, con impatto reale e requisiti elevati.",
      },
      hero: {
        title: "Progetti strategici",
        subtitle:
          "Realizziamo piattaforme e prodotti con alto valore tecnologico e strategico: sistemi che devono scalare, integrarsi e restare affidabili nel tempo.",
      },
      pillars: {
        title: "Cosa significa “strategico” per noi",
        text:
          "Non è solo tecnologia: è continuità, impatto e responsabilità end-to-end sulle scelte.",
        items: [
          {
            title: "Robustezza e qualità",
            text: "Architetture solide, standard elevati e attenzione alle performance.",
          },
          {
            title: "Integrazioni e dati",
            text: "API, flussi critici e governance dei dati per sistemi che devono dialogare.",
          },
          {
            title: "Evoluzione continua",
            text: "Roadmap, osservabilità e manutenzione evolutiva per risultati che durano.",
          },
        ],
      },
      projects: {
        title: "Progetti",
        text: "Alcuni esempi di iniziative su cui mettiamo competenza e responsabilità.",
        items: [
          {
            title: "SkillsCloud",
            href: "https://skillscloud.it",
            linkLabel: "Visita SkillsCloud",
            description:
              "Recruiter SkillsCloud: il sistema di gestione delle candidature di SkillsCloud.",
            image: {
              src: "/projects/skillscloud.png",
              alt: "Screenshot piattaforma SkillsCloud",
            },
            highlights: [
              "Gestione posizioni e candidature (ATS)",
              "Pubblicazione annunci e contenuti",
              "Questionari e workflow di selezione",
              "Statistiche e analisi operative",
              "Matching assistito (AI)",
            ],
          },
          {
            title: "Redemptor",
            href: "https://www.redemptor.it",
            linkLabel: "Visita Redemptor",
            description:
              "Marketplace AI per talenti tech: pubblicazione progetti, selezione professionisti e monitoraggio continuo del delivery software.",
            image: {
              src: "/projects/redemptor.png",
              alt: "Screenshot piattaforma Redemptor",
            },
            highlights: [
              "Assistente AI per definizione requisiti e roadmap",
              "Monitoraggio GitHub su commit, CI/CD e avanzamento",
              "Controlli automatici su qualita e compliance del codice",
              "Workflow legali e NDA integrati in piattaforma",
              "Pagamenti a tranche basati su SAL",
            ],
          },
        ],
      },
      callToAction: {
        title: "Hai un progetto strategico?",
        text: "Raccontaci obiettivi e vincoli: definiamo insieme un percorso chiaro e realizzabile.",
        buttonLabel: "Parla con noi",
        buttonHref: "/contatti",
      },
    },
    chiSiamo: {
      meta: {
        title: "Chi siamo",
        description:
          "Cobracco e una software house di Roma con team senior full-stack e operativita in tutta Italia.",
      },
      hero: {
        title: "Un team senior, vicino alle PMI.",
        subtitle:
          "Siamo artigiani del software: progetti su misura, cura dei dettagli e responsabilita diretta su ogni consegna.",
      },
      values: [
        {
          title: "Trasparenza",
          text: "Comunicazione chiara su costi, tempi e scelte tecniche.",
        },
        {
          title: "Qualita",
          text: "Codice solido, testato e pensato per durare nel tempo.",
        },
        {
          title: "Responsabilita",
          text: "Ci prendiamo carico del risultato finale, non solo delle task.",
        },
      ],
      location: {
        title: "Roma e tutta Italia",
        text: "La sede e a Roma, ma lavoriamo remote-first con PMI su tutto il territorio nazionale, con la stessa cura e presenza.",
      },
    },
    contatti: {
      meta: {
        title: "Contatti",
        description:
          "Contatta Cobracco per il tuo progetto software: siamo a Roma e operiamo in tutta Italia.",
      },
      hero: {
        title: "Parliamo del tuo progetto.",
        subtitle:
          "Raccontaci esigenze e obiettivi: rispondiamo con tempi, modalita e una proposta chiara.",
      },
      info: {
        title: "Dove siamo",
        text: "Roma, con operativita in tutta Italia e un approccio remote-first.",
      },
      form: {
        title: "Inviaci una richiesta",
        helper:
          "Compila il form e raccontaci cosa vuoi costruire. Ti rispondiamo entro 1-2 giorni lavorativi.",
      },
    },

    lavoraConNoi: {
      meta: {
        title: "Lavora con noi",
        description:
          "Lavora con Cobracco: cerchiamo professionisti senior e ad alto profilo per progetti software complessi e di valore.",
      },
      hero: {
        title: "Lavora con noi",
        subtitle:
          "Cerchiamo persone di altissimo livello: autonomia, responsabilita e standard elevati. Se vuoi giocare una partita difficile, e il posto giusto.",
        text:
          "Costruiamo software critico per PMI ambiziose. Lavoriamo con chi porta esperienza reale, cura dei dettagli e visione tecnica e di prodotto.",
        points: [
          "Seniorita reale, non solo anni di lavoro.",
          "Capacita di decisione tecnica e ownership end-to-end.",
          "Comunicazione chiara con team e stakeholder.",
        ],
        highlight: {
          title: "Profilo alto, impatto reale",
          text:
            "Non cerchiamo un esecutore. Cerchiamo chi alza il livello del team, del codice e dei risultati.",
          items: [
            "Architetture complesse e sistemi integrati",
            "Qualita del codice, test e performance",
            "Responsabilita diretta sui risultati",
          ],
        },
      },
      profile: {
        title: "Il profilo che cerchiamo",
        text: "Se ti riconosci in questi punti, vogliamo parlare con te.",
        items: [
          {
            title: "Senior full-stack o tech lead",
            text: "Esperienza solida su web app, API e integrazioni. Sai scegliere e motivare le scelte.",
          },
          {
            title: "Product mindset",
            text: "Capisci il business, trasformi esigenze in soluzioni chiare e misurabili.",
          },
          {
            title: "Qualita e disciplina",
            text: "Test, review, documentazione essenziale e attenzione alle performance.",
          },
          {
            title: "Comunicazione efficace",
            text: "Parli chiaro, riduci ambiguita, gestisci le aspettative con maturita.",
          },
        ],
      },
      roles: {
        title: "Ruoli tipici che valutiamo",
        items: [
          {
            title: "Senior Full-Stack Engineer",
            text: "Costruisci feature end-to-end e guidi decisioni tecniche.",
          },
          {
            title: "Tech Lead / Solution Architect",
            text: "Definisci architetture, roadmap tecniche e standard di qualita.",
          },
          {
            title: "Product & UX Specialist",
            text: "Progetti flussi e interfacce con rigore e sensibilita al business.",
          },
          {
            title: "AI / Data Engineer",
            text: "Porti l'AI dove crea valore reale, con metriche e governance chiare.",
          },
        ],
      },
      process: {
        title: "Come valutiamo",
        steps: [
          {
            title: "1. Colloquio conoscitivo",
            text: "Parliamo di esperienza, progetti e modo di lavorare.",
          },
          {
            title: "2. Challenge pratica mirata",
            text: "Un esercizio breve, orientato a decisioni e qualita.",
          },
          {
            title: "3. Review tecnica",
            text: "Ragioniamo su scelte, trade-off e impatto reale.",
          },
          {
            title: "4. Allineamento finale",
            text: "Obiettivi, modalita e aspettative chiare da entrambe le parti.",
          },
        ],
      },

      offer: {
        title: "Cosa offriamo",
        items: [
          {
            title: "Progetti ad alta complessita",
            text: "Sistemi integrati, processi critici, clienti con obiettivi seri.",
          },
          {
            title: "Autonomia e ownership",
            text: "Le decisioni tecniche contano, e chi decide si prende la responsabilita.",
          },
          {
            title: "Team senior e selettivo",
            text: "Collabori con persone competenti che alzano il livello.",
          },
          {
            title: "Remote-first con ritmi sostenibili",
            text: "Focus, profondita, poche riunioni e lavoro ben pianificato.",
          },
        ],
      },
      form: {
        title: "Invia la tua candidatura",
        helper:
          "Raccontaci i progetti piu complessi che hai guidato, responsabilita e risultati. Puoi allegare il CV (PDF/DOC). Rispondiamo entro 1-2 giorni lavorativi.",
        note:
          "Valutiamo solo profili senior con forte autonomia e senso di ownership.",
      },
      callToAction: {
        title: "Se ti riconosci, scrivici",
        text: "Raccontaci i tuoi progetti piu complessi e il tuo livello di responsabilita. Valutiamo solo profili davvero senior.",
        buttonLabel: "Candidati ora",
        buttonHref: "/contatti",
      },
    },
  },
};

export type SiteContent = typeof siteContent;



