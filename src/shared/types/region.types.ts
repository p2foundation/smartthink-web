import type { RegionCode, Currency, PaymentProvider } from '../enums';

// ============================================
// Region Types — multi-region configuration
// ============================================

export interface RegionConfig {
  code: RegionCode;
  name: string;
  currency: Currency;
  currencySymbol: string;
  timezone: string;
  locale: string;
  paymentProviders: PaymentProvider[];
  flag: string;
  phonePrefix: string;
}

export interface RegionPricing {
  regionCode: RegionCode;
  price: number;
  currency: Currency;
  originalPrice?: number;
  discountPercentage?: number;
}
