export interface Product {
  id: number;
  name: string;
  model_number: string;
  slug: string;
  category_id: number | null;
  category_name?: string;
  category_slug?: string;
  short_description: string;
  detailed_description: string;
  price: number | null;
  price_label: string;
  special_offers: string | null;
  availability: 'In Stock' | 'Available on Order' | 'Coming Soon';
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  primary_image?: string;
  images?: ProductImage[];
  specifications?: ProductSpecification;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProductSpecification {
  id: number;
  product_id: number;
  motor_power: string;
  battery_voltage: string;
  controller: string;
  front_tyre: string;
  rear_tyre: string;
  brakes: string;
  central_locking: string;
  digital_meter: string;
  reverse_gear: string;
  other_specifications: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  product_count?: number;
}

export interface HomepageSection {
  id: number;
  section_key: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  is_visible: boolean;
  sort_order: number;
  updated_at: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string | null;
  offer_text: string | null;
  button_text: string;
  button_link: string;
  image_url: string | null;
  banner_type: 'hero' | 'promo' | 'middle';
  is_active: boolean;
  sort_order: number;
}

export interface ContactSettings {
  id: number;
  business_name: string;
  brand_name: string;
  tagline: string;
  address: string;
  primary_phone: string;
  whatsapp_number: string;
  additional_phones: string; // JSON string array
  email: string;
  google_maps_url: string;
  google_maps_embed: string;
  opening_hours: string;
}

export interface WebsiteSettings {
  [key: string]: string;
}

export interface SeoSetting {
  id: number;
  page_route: string;
  meta_title: string;
  meta_description: string;
  keywords: string | null;
  canonical_url: string | null;
  og_image: string | null;
}

export interface Enquiry {
  id: number;
  product_id: number | null;
  product_name: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  city: string | null;
  message: string | null;
  status: 'New' | 'Contacted' | 'Closed';
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: string;
  author: string;
  read_time: string;
  is_published: boolean;
  meta_title: string | null;
  meta_description: string | null;
  views: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}
