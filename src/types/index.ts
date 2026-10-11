export type StockStatus = 'in_stock' | 'out_of_stock' | 'made_to_order';

export interface ProductColourOption {
  id: string;
  name: string;
  swatch: string;
  available?: boolean;
}

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
  tags: string[];
  occasion: string[];
  colorFamily: string[];
  colourOptions?: ProductColourOption[];
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
  selectedColour?: ProductColourOption;
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

export type CustomOrderStatus =
  | 'inquiry'
  | 'quote_sent'
  | 'advance_pending'
  | 'advance_paid'
  | 'in_crafting'
  | 'photo_proof_ready'
  | 'customer_approved'
  | 'balance_pending'
  | 'balance_paid'
  | 'dispatched'
  | 'completed'
  | 'cancelled';

export interface CustomOrder {
  id: string;
  customOrderNumber: string;
  customerName: string;
  phone: string;
  whatsappPhone?: string;
  email?: string;
  title: string;
  description: string;
  referenceImageUrls: string[];
  occasion?: string;
  targetDeliveryDate?: string;
  status: CustomOrderStatus;
  quoteAmountInrPaise: number;
  advanceRequiredInrPaise: number;
  advancePaidInrPaise: number;
  balanceDueInrPaise: number;
  shippingFeeInrPaise: number;
  proofImageUrls: string[];
  proofSharedAt?: string;
  customerFeedbackNotes?: string;
  customerApprovedAt?: string;
  shippingAddressLine1?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPincode?: string;
  courierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  artisanNotes?: string;
  createdAt: string;
  updatedAt: string;
}

