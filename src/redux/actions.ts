import { Product, User } from "../interfaces/interfaces";

export const FETCH_USERS = 'FETCH_USERS';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_PRODUCT_LOGGED_USER = 'ADD_PRODUCT_LOGGED_USER';
export const FINISH_PRODUCT = 'FINISH_PRODUCT';

export const fetchUsers = (users: User[]) => ({
  type: FETCH_USERS,
  payload: { users },
});

export const loginUser = (userId: string) => ({
  type: LOGIN_USER,
  payload: { userId },
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: {},
})

export const updatePassword = (userId: string, password: string) => ({
  type: UPDATE_PASSWORD,
  payload: { userId, password },
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