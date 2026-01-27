import Container from "@/components/Container";
import Button from "@/components/Button";

type CallToActionProps = {
  title: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
};

export default function CallToAction({
  title,
  text,
  buttonLabel,
  buttonHref,
}: CallToActionProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-8 py-10 shadow-sm sm:px-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
              <p className="text-sm text-[var(--color-ink-soft)] sm:text-base">
                {text}
              </p>
            </div>
            <Button label={buttonLabel} href={buttonHref} />
          </div>
        </div>
      </Container>
    </section>
  );
}

