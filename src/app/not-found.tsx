import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="bg-brand-gradient">
      <Container className="py-24 text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-navy/75 uppercase">404</p>
        <h1 className="mt-3 text-4xl text-navy">This page swapped itself out.</h1>
        <p className="mt-4 text-lg text-navy/85">The link may be old or mistyped.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </section>
  );
}
