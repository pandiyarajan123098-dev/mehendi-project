import { getAssetUrl } from '../utils/assetUrl';

export const products = [
  {
    id: 'cone-single',
    name: 'Premium Natural Mehendi Cone',
    category: 'REGULAR',
    badge: 'FRESH BATCH',
    badgeColor: 'badge-fresh',
    tag: 'SINGLE CONE',
    rating: 4.9,
    reviewsCount: 1240,
    price: 50,
    image: getAssetUrl('/images/product_cone_single.jpg'),
    description: 'Smooth application • Rich deep color • Freshly prepared every Monday.',
    longDescription: 'Our signature handcrafted henna cone made with 100% pure organic Sojat henna leaves, triple-cloth sifted for zero clogging and infused with premium Nilgiri eucalyptus essential oil. Delivers a deep mahogany stain that matures within 48 hours and lasts up to 2-3 weeks.',
    features: [
      '100% Organic Sojat Grade Henna',
      'Ultra-smooth 0.38mm precision tip',
      'Triple-cloth sifted for zero clogs',
      'Freshly prepared every Monday'
    ],
    inStock: true
  },
  {
    id: 'cone-bridal-pack',
    name: 'Bridal Royal Sojat Cone',
    category: 'BRIDAL',
    badge: 'BESTSELLER',
    badgeColor: 'badge-bestseller',
    tag: 'PACK OF 5',
    rating: 5.0,
    reviewsCount: 890,
    price: 280,
    image: getAssetUrl('/images/product_cone_bridal.jpg'),
    description: 'Triple-filtered micro-tip calibrated for intricate royal bridal figures and portraits.',
    longDescription: 'Specially designed for professional bridal mehendi artists and brides seeking flawless line consistency. The extra-fine 0.38mm micro-tip allows seamless creation of portraits, negative-space mandalas, and intricate jaali patterns with zero hand fatigue.',
    features: [
      'Pack of 5 calibrated bridal cones',
      'Micro-tip calibrated for fine portraits',
      'Super dark staining formula with pure Cajuput oil',
      'Chilled thermal packaging included'
    ],
    inStock: true
  },
  {
    id: 'henna-care-kit',
    name: 'Henna Oil & Balm Kit',
    category: 'PREMIUM',
    badge: 'AFTERCARE',
    badgeColor: 'badge-aftercare',
    tag: 'CARE KIT',
    rating: 4.8,
    reviewsCount: 430,
    price: 350,
    image: getAssetUrl('/images/product_oil_kit.jpg'),
    description: 'Infused with pure Nilgiri & Cajuput oil for maximum darkness and longevity.',
    longDescription: 'The ultimate aftercare duo to darken and protect your bridal henna stain. Includes 30ml concentrated botanical essential oil (Nilgiri eucalyptus, clove bud & cajuput) plus a 20g organic beeswax moisturizing balm to shield stains against premature water fading.',
    features: [
      '30ml concentrated botanical stain booster oil',
      '20g pure beeswax water-seal aftercare balm',
      'Prolongs stain brilliance up to 3 weeks',
      '100% chemical-free and skin safe'
    ],
    inStock: true
  },
  {
    id: 'festival-bulk-box',
    name: 'Festival Bulk Box (20 Cones)',
    category: 'BULK',
    badge: 'FESTIVE BOX',
    badgeColor: 'badge-festive',
    tag: '20 CONES BOX',
    rating: 4.9,
    reviewsCount: 610,
    price: 920,
    image: getAssetUrl('/images/product_bulk_box.jpg'),
    description: 'Specially packaged for Sangeet ceremonies, Karwa Chauth, and family gatherings.',
    longDescription: 'Perfect festive solution for Sangeet nights, Eid, Teej, Karwa Chauth, and community celebrations. Contains 20 freshly rolled artisan henna cones packed in an insulated thermal box with chilled packs.',
    features: [
      '20 freshly rolled natural cones',
      'Insulated cold-chain gift carton',
      'Bulk discount applied (Save ₹80)',
      'Free expedited chilled delivery included'
    ],
    inStock: true
  }
];

export const productCategories = ['ALL', 'BRIDAL', 'REGULAR', 'PREMIUM', 'FESTIVAL', 'BULK'];
