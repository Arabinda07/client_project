export type StockStatus = 'in_stock' | 'out_of_stock' | 'made_to_order';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  mainCategory: string;
  subCategory: string;
  collection?: string[];
  shortDescription: string;
  longDescription?: string;
  images: string[];
  materials: string[];
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  stockStatus: StockStatus;
  stockQuantity: number;
  isNew: boolean;
  isBestseller: boolean;
  isSale: boolean;
  isCustomisable: boolean;
  tags: string[];
  occasion: string[];
  colorFamily: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: string[];
  description?: string;
  image?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
  customerDetails: CustomerDetails;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CustomerDetails {
  email: string;
  phone: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
  date?: string;
}
