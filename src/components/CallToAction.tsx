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
    <section className="py-12">
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-7 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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

