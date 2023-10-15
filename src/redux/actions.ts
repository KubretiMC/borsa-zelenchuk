import { Product, User } from "../interfaces/interfaces";

export const FETCH_USERS = 'FETCH_USERS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_PRODUCT_LOGGED_USER = 'ADD_PRODUCT_LOGGED_USER';
export const FINISH_PRODUCT = 'FINISH_PRODUCT';
export const FETCH_PRODUCT_FILTERS ='FETCH_PRODUCT_FILTERS';

export const fetchUsers = (users: User[], userId: string) => ({
  type: FETCH_USERS,
  payload: { users, userId },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: {},
})

export const fetchProducts = (products: Product[]) => ({
  type: FETCH_PRODUCTS,
  payload: { products },
});


export const addProductLoggedUser = (loggedUser: User, productId: string) => ({
  type: ADD_PRODUCT_LOGGED_USER,
  payload: { loggedUser, productId },
});

export const finishProduct = (productId: string) => ({
  type: FINISH_PRODUCT,
  payload: { productId },
});

export const fetchProductFilters = (productFilters: any) => ({
  type: FETCH_PRODUCT_FILTERS,
  payload: { productFilters },
});
