import { OfferValues } from "../interfaces/interfaces";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const RESERVE_PRODUCT = 'RESERVE_PRODUCT';
export const FINISH_PRODUCT = 'REMOVE_PRODUCT';

export const loginUser = (username: string, password: string) => ({
  type: LOGIN_USER,
  payload: { username, password },
})

export const logOutUser = () => ({
  type: LOGOUT_USER,
  payload: {},
})

export const registerUser = (username: string, password: string) => ({
  type: REGISTER_USER,
  payload: { username, password },
})

export const addProduct = (userId: string, product: OfferValues) => ({
  type: ADD_PRODUCT,
  payload: { userId, product },
});

export const reserveProduct = (userId: string, productId: string, orderQuantity: number, minOrder: number) => ({
    type: RESERVE_PRODUCT,
    payload: { userId, productId, orderQuantity, minOrder },
});

export const finishProduct = (productId: string) => ({
  type: FINISH_PRODUCT,
  payload: { productId },
});