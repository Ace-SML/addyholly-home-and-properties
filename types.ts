
export interface Property {
  id: string;
  title: string;
  price: number;
  currency: 'NGN' | 'USD';
  location: string;
  city: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Villa' | 'Condo';
  images: string[];
  featured?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface SearchFilters {
  location: string;
  type: string;
  budget: string;
}
