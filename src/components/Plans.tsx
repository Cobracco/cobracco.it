import Button from "@/components/Button";
import Card from "@/components/Card";

type PlanItem = {
  title: string;
  description: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
};

type PlansProps = {
  title: string;
  description: string;
  items: PlanItem[];
};

export default function Plans({ title, description, items }: PlansProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
        <p className="max-w-3xl text-base text-[var(--color-ink-soft)] sm:text-lg">
          {description}
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((plan) => (
          <Card key={plan.title} title={plan.title} text={plan.description}>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-soft)]">
              {plan.bullets.map((bullet) => (
                <li key={bullet}>- {bullet}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Button label={plan.ctaLabel} href={plan.href} variant="ghost" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

