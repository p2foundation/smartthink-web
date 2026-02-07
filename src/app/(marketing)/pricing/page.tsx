import Link from 'next/link';

export const metadata = {
  title: 'Pricing',
  description: 'Regional pricing — GH₵, NGN, USD, EUR. Mobile money, Paystack, Stripe.',
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Simple, Transparent Pricing
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Region-specific pricing and payment methods. Africa-first: Paystack, mobile money, bank transfer. US/EU: Stripe.
      </p>
      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-xl font-semibold text-slate-900">Regional pricing</h2>
        <ul className="mt-4 space-y-2 text-slate-600">
          <li><strong>Ghana / Africa (GH)</strong> — GH₵, Paystack, Mobile Money, Bank</li>
          <li><strong>Nigeria (NG)</strong> — NGN, Paystack, Bank</li>
          <li><strong>United States (US)</strong> — USD, Stripe</li>
          <li><strong>Europe (EU)</strong> — EUR/GBP, Stripe</li>
        </ul>
        <p className="mt-6 text-slate-500">
          Set your region in the header to see prices in your currency.
        </p>
        <Link href="/contact" className="mt-6 inline-block text-primary-600 font-medium hover:underline">
          Contact sales for enterprise pricing →
        </Link>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
