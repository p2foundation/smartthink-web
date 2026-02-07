import { RegionCode, Currency, PaymentProvider } from '../enums';
import type { RegionConfig } from '../types/region.types';

// ============================================
// Region Configuration Constants
// Africa-first: Ghana is the default region
// ============================================

export const REGIONS: Record<RegionCode, RegionConfig> = {
  [RegionCode.GH]: {
    code: RegionCode.GH,
    name: 'Ghana / Africa',
    currency: Currency.GHS,
    currencySymbol: 'GH₵',
    timezone: 'Africa/Accra',
    locale: 'en-GH',
    paymentProviders: [PaymentProvider.PAYSTACK, PaymentProvider.MOBILE_MONEY, PaymentProvider.BANK_TRANSFER],
    flag: '🇬🇭',
    phonePrefix: '+233',
  },
  [RegionCode.NG]: {
    code: RegionCode.NG,
    name: 'Nigeria',
    currency: Currency.NGN,
    currencySymbol: '₦',
    timezone: 'Africa/Lagos',
    locale: 'en-NG',
    paymentProviders: [PaymentProvider.PAYSTACK, PaymentProvider.BANK_TRANSFER],
    flag: '🇳🇬',
    phonePrefix: '+234',
  },
  [RegionCode.US]: {
    code: RegionCode.US,
    name: 'United States',
    currency: Currency.USD,
    currencySymbol: '$',
    timezone: 'America/New_York',
    locale: 'en-US',
    paymentProviders: [PaymentProvider.STRIPE],
    flag: '🇺🇸',
    phonePrefix: '+1',
  },
  [RegionCode.EU]: {
    code: RegionCode.EU,
    name: 'Europe',
    currency: Currency.EUR,
    currencySymbol: '€',
    timezone: 'Europe/London',
    locale: 'en-GB',
    paymentProviders: [PaymentProvider.STRIPE],
    flag: '🇪🇺',
    phonePrefix: '+44',
  },
};

export const DEFAULT_REGION = RegionCode.GH;

export const REGION_LIST = Object.values(REGIONS);

export function getRegionConfig(code: RegionCode): RegionConfig {
  return REGIONS[code] ?? REGIONS[DEFAULT_REGION];
}

export function formatPrice(amount: number, regionCode: RegionCode): string {
  const region = getRegionConfig(regionCode);
  return new Intl.NumberFormat(region.locale, {
    style: 'currency',
    currency: region.currency,
  }).format(amount);
}
