import { Product, User } from "../interfaces/interfaces";

export const FETCH_USERS = 'FETCH_USERS';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_PRODUCT_LOGGED_USER = 'ADD_PRODUCT_LOGGED_USER';
export const RESERVE_PRODUCT = 'RESERVE_PRODUCT';
export const FINISH_PRODUCT = 'REMOVE_PRODUCT';

export const fetchUsers = (users: User[]) => ({
  type: FETCH_USERS,
  payload: { users },
});

export const loginUser = (user: User) => ({
  type: LOGIN_USER,
  payload: { user },
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

export const reserveProduct = (userId: string, productId: string, orderQuantity: number, minOrder: number) => ({
    type: RESERVE_PRODUCT,
    payload: { userId, productId, orderQuantity, minOrder },
});

export const finishProduct = (productId: string) => ({
  type: FINISH_PRODUCT,
  payload: { productId },
});