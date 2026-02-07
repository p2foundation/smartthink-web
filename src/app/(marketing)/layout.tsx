import { EnhancedHeader } from '@/components/enhanced-header';
import { Footer } from '@/components/footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnhancedHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
