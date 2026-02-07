import {
  AboutUsHero,
  MissionSection,
  ValuesSection,
  TeamSection,
  StorySection,
  ContactCTA
} from '@/components/about-us-sections';

export const metadata = {
  title: 'About SmartThink | Africa-anchored Cybersecurity Education',
  description: 'Learn about SmartThink\'s mission to democratize cybersecurity education across Africa and beyond. World-class training, consulting, and career opportunities.',
  keywords: ['SmartThink', 'cybersecurity education', 'Africa', 'training', 'consulting', 'mission'],
};

export default function AboutPage() {
  return (
    <>
      <AboutUsHero />
      <MissionSection />
      <ValuesSection />
      <StorySection />
      <TeamSection />
      <ContactCTA />
    </>
  );
}
