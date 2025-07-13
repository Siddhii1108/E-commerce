export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  colors: ColorVariant[];
  inStock: boolean;
  fastDelivery?: boolean;
  freeShipping?: boolean;
}

export interface ColorVariant {
  id: string;
  name: string;
  color: string;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
}