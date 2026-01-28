import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: `Gestione cookie | ${siteContent.brand.name}`,
  description: "Informativa sintetica sulla gestione dei cookie.",
};

export default function CookiePage() {
  return (
    <Container>
      <Section
        title="Gestione dei cookie"
        description="Informazioni sintetiche sui cookie utilizzati dal sito e su come gestirli."
      >
        <div className="space-y-6 text-sm text-[var(--color-ink-soft)]">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Cosa sono i cookie
            </h3>
            <p>
              I cookie sono piccoli file di testo salvati dal browser che
              permettono il corretto funzionamento del sito e, se autorizzato,
              l&apos;analisi delle visite.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Cookie utilizzati
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cookie tecnici necessari al funzionamento del sito.</li>
              <li>
                Cookie di analytics attivati solo con consenso esplicito.
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Gestione delle preferenze
            </h3>
            <p>
              Puoi modificare o revocare il consenso tramite il pulsante
              &quot;Gestisci consenso&quot; nel footer del sito.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)]">
              Durata e controllo
            </h3>
            <p>
              I cookie tecnici possono essere di sessione o persistenti. Puoi
              comunque gestire o eliminare i cookie dalle impostazioni del tuo
              browser.
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
