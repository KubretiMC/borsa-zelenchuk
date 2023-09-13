export interface User {
  id: string;
  username: string;
  password: string;
  offers?: string[];
  reserves?: string[];
}

export interface OfferValues {
    name: string,
    cost?: number,
    availability?: number,
    minOrder?: number,
    place: string,
    image: string,
    phoneNumber?: number,
    additionalInformation: string
}

export type FilterValues = {
    name: string;
    place: string;
    minCost: number;
    maxCost: number;
  };

export interface Product {
  id: string;
  name: string;
  place: string;
  cost: number;
  image: string;
  availability: number;
  minOrder: number;
  reserved: boolean;
  additionalInformation?: string;
}

export interface ProductFilter {
  names: string[];
  places: string[];
}

export interface RootState {
  products: Product[];
  productFilters: ProductFilter;
  loggedUser?: User;
  users: User[];
}