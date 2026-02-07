import { LandingHero } from '@/components/landing-hero';
import { FeaturesSection } from '@/components/features-section';
import { RegionsStrip } from '@/components/regions-strip';
import { TestimonialsSection } from '@/components/testimonials-section';
import { PricingSection } from '@/components/pricing-section';
import { CallToActionSection } from '@/components/cta-section';

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <FeaturesSection />
      <RegionsStrip />
      <TestimonialsSection />
      <PricingSection />
      <CallToActionSection />
    </>
  );
}
