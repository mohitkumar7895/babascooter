export interface ProductRateInfo {
  tier: string;
  priceDisplay: string;
  numericPrice: number;
  subLabel: string;
}

export const OFFICIAL_RATES = {
  scooterStarting: '₹11,000/-',
  singleLightStarting: '₹15,000/-',
  batteryStarting: '₹15,000/-',
  warranty: '60 Month Warranty',
  distributorOffer: '40 + 20 FREE',
  distributorOfferHindi: '40 स्कूटर खरीदें और 20 स्कूटर बिल्कुल FREE पाएँ!',
  address: 'Plot No. 4, Kaili, Ballabhgarh, Faridabad, Haryana – 121004',
  phone: '9953564151',
  website: 'www.frendo.in',
  offerBannerImage: '/images/frendo-offer-banner.jpg',
} as const;

export function getProductRate(product: {
  category_name?: string | null;
  category?: string | null;
  name?: string | null;
  price?: number | null;
  price_label?: string | null;
}): ProductRateInfo {
  const cat = (product.category_name || product.category || '').toLowerCase();
  const customLabel = (product.price_label || '').trim();
  const numeric = product.price ? Number(product.price) : 0;

  // Respect explicit admin-entered custom prices other than the legacy default 15000
  const isCustomPrice =
    numeric > 0 &&
    numeric !== 15000 &&
    customLabel !== 'Starting ₹15,000/-';

  if (isCustomPrice) {
    return {
      tier: 'Showroom Rate',
      priceDisplay:
        customLabel && customLabel !== 'Contact for Best Price'
          ? customLabel
          : `₹${numeric.toLocaleString('en-IN')}/-`,
      numericPrice: numeric,
      subLabel: '60 Month Warranty',
    };
  }

  if (cat.includes('commercial') || cat.includes('loader')) {
    return {
      tier: 'Commercial Loader',
      priceDisplay: 'Commercial Rate',
      numericPrice: 0,
      subLabel: 'Contact for Best B2B Price',
    };
  }

  if (cat.includes('mobility') || cat.includes('trike')) {
    return {
      tier: 'Special Mobility',
      priceDisplay: 'Contact for Price',
      numericPrice: 0,
      subLabel: '60 Month Warranty',
    };
  }

  if (cat.includes('sport') || cat.includes('performance') || cat.includes('single light')) {
    return {
      tier: 'Single Light Model',
      priceDisplay: 'Starting ₹15,000/-',
      numericPrice: 15000,
      subLabel: 'Single Light Series • 60 Month Warranty',
    };
  }

  return {
    tier: 'Electric Scooter',
    priceDisplay: 'Starting ₹11,000/-',
    numericPrice: 11000,
    subLabel: '60 Month Warranty',
  };
}
