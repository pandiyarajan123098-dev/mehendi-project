import { getAssetUrl } from '../utils/assetUrl';

export const portfolioCategories = [
  'ALL',
  'BRIDAL',
  'ARABIC',
  'TRADITIONAL',
  'MINIMAL',
  'ENGAGEMENT',
  'EVENTS'
];

export const portfolioItems = [
  {
    id: 1,
    image: getAssetUrl('/images/portfolio_1.png'),
    category: 'BRIDAL',
    title: 'Signature Royal Bridal Procession',
    description: 'Detailed elephant procession, bridal palanquin, and hyper-intricate floral jaal.'
  },
  {
    id: 2,
    image: getAssetUrl('/images/portfolio_2.png'),
    category: 'ARABIC',
    title: 'Indo-Arabic Palm Mandala & Shaded Petals',
    description: 'Negative space symmetry with deep stain contrast and delicate finger accents.'
  },
  {
    id: 3,
    image: getAssetUrl('/images/portfolio_3.png'),
    category: 'TRADITIONAL',
    title: 'Heirloom Bridal Feet & Ankle Architecture',
    description: 'Intricate feet jaali adorned with auspicious lotus blooms and peacock motifs.'
  },
  {
    id: 4,
    image: getAssetUrl('/images/portfolio_4.png'),
    category: 'ENGAGEMENT',
    title: 'Celebratory Full Arm Storytelling Bridal Henna',
    description: 'From fingertips to elbow, featuring the couple’s sacred wedding vows.'
  }
];

