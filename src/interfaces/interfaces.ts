export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  offers?: string[];
  userReserved?: string[];
}

export interface UserErrors {
  username: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
}

export interface PasswordChangeErrors {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface OfferValues {
  name: string,
  cost?: number,
  availability?: number,
  minOrder?: number,
  place: string,
  image: string,
  additionalInformation: string,
}

export interface OfferErrors {
  cost: string,
  availability: string,
  minOrder: string,
  image: string,
}

export type FilterValues = {
    name: string;
    place: string;
    minCost?: number;
    maxCost?: number;
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
  reservedCost: number;
  additionalInformation?: string;
  finished: boolean;
  dateAdded: string;
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

export interface DecodedToken {
  userId: string;
  exp: number;
}