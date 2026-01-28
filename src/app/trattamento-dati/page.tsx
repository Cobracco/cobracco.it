import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: `Trattamento dei dati | ${siteContent.brand.name}`,
  description: "Informativa sintetica sul trattamento dei dati personali.",
};

export default function TrattamentoDatiPage() {
  const { brand, footer } = siteContent;

  return (
    <Container>
      <Section
        title="Trattamento dei dati personali"
        description="Informativa sintetica sul trattamento dei dati raccolti tramite il sito."
      >
        <div className="space-y-6 text-sm text-[var(--color-ink-soft)]">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Titolare del trattamento
            </h3>
            <p>
              {brand.name}, {footer.address}. Contatto:{" "}
              <a className="underline" href={`mailto:${footer.email}`}>
                {footer.email}
              </a>
              .
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Dati trattati
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dati di contatto forniti tramite form o email.</li>
              <li>Dati di navigazione tecnici (es. IP, user-agent).</li>
              <li>Preferenze cookie espresse dall&apos;utente.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Finalita e basi giuridiche
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Rispondere alle richieste e fornire informazioni sui servizi.</li>
              <li>Gestire il rapporto pre-contrattuale e contrattuale.</li>
              <li>Adempiere ad obblighi legali e fiscali.</li>
              <li>Garantire la sicurezza e prevenire abusi del sito.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Modalita e tempi di conservazione
            </h3>
            <p>
              I dati sono trattati con misure tecniche e organizzative adeguate
              e conservati per il tempo necessario alle finalita sopra indicate
              o per obblighi di legge.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Destinatari e trasferimenti
            </h3>
            <p>
              I dati possono essere trattati da fornitori tecnici (es. hosting,
              strumenti di comunicazione) nominati responsabili. Non sono previsti
              trasferimenti fuori dallo SEE salvo adeguate garanzie.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Diritti dell&apos;interessato
            </h3>
            <p>
              Puoi esercitare i diritti di accesso, rettifica, cancellazione,
              limitazione, opposizione e portabilita. Hai inoltre diritto a
              proporre reclamo al Garante Privacy.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Contatti
            </h3>
            <p>
              Per richieste o chiarimenti scrivi a{" "}
              <a className="underline" href={`mailto:${footer.email}`}>
                {footer.email}
              </a>
              .
            </p>
          </div>
          <p className="text-xs text-[var(--color-ink-soft)]">
            Ultimo aggiornamento: 28 gennaio 2026.
          </p>
        </div>
      </Section>
    </Container>
  );
}
