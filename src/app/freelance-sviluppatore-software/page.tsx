import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import CallToAction from "@/components/CallToAction";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: "Sviluppatore Software Freelance",
  description:
    "Supporto freelance per sviluppo software: affiancamento senior full-stack per startup e PMI su MVP, integrazioni API e moduli critici.",
  keywords: [
    ...siteContent.seo.freelanceKeywords,
    ...siteContent.seo.primaryKeywords,
    ...siteContent.seo.startupKeywords,
  ],
  alternates: {
    canonical: "/freelance-sviluppatore-software",
  },
  openGraph: {
    title: "Sviluppatore software freelance per startup e PMI",
    description:
      "Affiancamento freelance senior su MVP, sviluppo software su misura e integrazioni API.",
    url: "/freelance-sviluppatore-software",
  },
};

const valuePoints = [
  {
    title: "Affiancamento rapido su codice esistente",
    text: "Entriamo su repository gia avviati e riduciamo il tempo perso in handover, fissando subito priorita tecniche chiare.",
  },
  {
    title: "Focus su moduli critici",
    text: "API, autenticazione, flussi business, performance e rilascio: interveniamo dove l'impatto e misurabile in tempi brevi.",
  },
  {
    title: "Metodo da team, non da esecutore isolato",
    text: "Documentazione minima ma utile, review strutturate e passaggio di conoscenza continuo con il team interno.",
  },
];

const fitCases = [
  "Startup che devono chiudere un MVP in tempi rapidi senza compromettere la base tecnica.",
  "PMI con software interno da evolvere, integrare o stabilizzare.",
  "Team tecnici che cercano un freelance senior full-stack su una fase ad alta complessita.",
  "Founder non tecnici che vogliono un referente unico per decisioni tecniche e roadmap.",
];

const faqItems = [
  {
    question: "Lavorate come freelance singolo o come team?",
    answer:
      "Lavoriamo con assetto flessibile: referente tecnico unico e, quando serve, supporto del team Cobracco su design, sviluppo e delivery.",
  },
  {
    question: "Possiamo partire da un progetto gia avviato?",
    answer:
      "Si. Facciamo audit rapido del codice, definiamo rischi e priorita, poi impostiamo una roadmap con rilasci incrementali.",
  },
  {
    question: "Supportate sia startup sia PMI?",
    answer:
      "Si. Per startup lavoriamo su MVP e validazione; per PMI su software su misura, integrazioni API e manutenzione evolutiva.",
  },
  {
    question: "Qual e il modello di collaborazione?",
    answer:
      "A progetto o per sprint continuativi, con obiettivi, deliverable e metriche condivise fin dall'inizio.",
  },
];

export default function FreelanceSviluppatoreSoftwarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sviluppatore software freelance",
    serviceType: "Affiancamento freelance per sviluppo software",
    areaServed: "IT",
    provider: {
      "@type": "LocalBusiness",
      name: siteContent.brand.name,
      url: siteContent.brand.siteUrl,
      email: siteContent.footer.email,
      telephone: siteContent.footer.phone,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <Section
          title="Sviluppatore software freelance per startup e PMI"
          description="Quando serve accelerare lo sviluppo software senza perdere qualita: supporto senior full-stack, operativo su tutta Italia."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {valuePoints.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section
          title="Quando scegliere un partner freelance software"
          description="Questa soluzione e utile se devi consegnare in fretta, ridurre rischio tecnico o aumentare la capacita del team interno."
        >
          <Card title="Casi tipici">
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-soft)]">
              {fitCases.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Card>
        </Section>

        <Section
          title="Percorsi collegati"
          description="In base allo stato del progetto puoi approfondire questi servizi."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Card
              title="Sviluppo software su misura"
              text="Per progetti completi chiavi in mano con roadmap e manutenzione evolutiva."
            >
              <Link href="/sviluppo-software" className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)]">
                Scopri sviluppo software
              </Link>
            </Card>
            <Card
              title="MVP per startup"
              text="Per validare un prodotto digitale in 4-6 settimane con un perimetro tecnico sostenibile."
            >
              <Link href="/mvp-startup" className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)]">
                Scopri il piano MVP
              </Link>
            </Card>
            <Card
              title="Contatto diretto"
              text="Descrivi contesto, stack e obiettivi: ti proponiamo un piano operativo concreto."
            >
              <Link href="/contatti" className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)]">
                Parla con noi
              </Link>
            </Card>
          </div>
        </Section>

        <Section title="FAQ sviluppo software freelance">
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      <CallToAction
        title="Hai bisogno di supporto freelance su un progetto software?"
        text="Raccontaci stack, fase del progetto e obiettivi: ti rispondiamo con una proposta operativa chiara."
        buttonLabel="Richiedi una call"
        buttonHref="/contatti"
      />
    </>
  );
}
