import { EnhancedHeader } from '@/components/enhanced-header';

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnhancedHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
