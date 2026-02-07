import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CallToActionSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-700 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-80" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Ready to transform your cybersecurity career?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-100">
          Join thousands of professionals who advanced with SmartThink — training, certifications, and live sessions built for your region.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="xl" className="bg-white text-primary-600 hover:bg-primary-50 shadow-lg">
              Start free
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
