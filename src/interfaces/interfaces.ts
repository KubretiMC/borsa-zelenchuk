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
  additionalInformation?: string;
}

export interface ProductFilter {
  names: string[];
  places: string[];
}