import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FounderSection from '@/components/FounderSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import CustomSection from '@/components/CustomSection';
import ServicesSection from '@/components/ServicesSection';
import PrivacyPolicySection from '@/components/PrivacyPolicySection';
import TermsSection from '@/components/TermsSection';
import CareersSection from '@/components/CareersSection';
import TeamSection from '@/components/TeamSection';

// Map of section type -> React component
// Structured for easy extension: global components (navbar/footer) can be
// promoted out of this map into the root layout in the future.
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  navbar: NavBar,
  hero: HeroSection,
  about: AboutSection,
  
  founder: FounderSection,
  how_it_works: HowItWorksSection,
  testimonials: TestimonialsSection,
  contact: ContactSection,
  footer: FooterSection,
  services: ServicesSection,
  privacy: PrivacyPolicySection,
  terms: TermsSection,
  careers: CareersSection,
  team: TeamSection,
  custom: CustomSection,
};

export interface SectionData {
  id: number;
  type: string;
  order: number;
  content: Record<string, any>;
}

/**
 * DynamicRenderer — renders sections in strict DB order.
 * The `order` column drives layout — no hardcoded section positions.
 * Adding/removing/reordering sections in the DB is all that's needed
 * for the future drag-and-drop editor to work.
 */
export default function DynamicRenderer({ sections }: { sections: SectionData[] }) {
  // Sort by order just in case DB returns unsorted (defensive)
  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <>
      {sorted.map((section) => {
        const Component = COMPONENT_MAP[section.type];

        if (!Component) {
          console.warn(`[Renderer] Unknown section type: "${section.type}"`);
          return null;
        }

        return (
          <Component
            key={section.id}
            // Spread all JSON content fields as props
            {...section.content}
            // Pass the DB id and componentId so the future editor can target this section
            _sectionId={section.id}
          />
        );
      })}
    </>
  );
}
