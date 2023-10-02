import { OfferValues, User } from "../interfaces/interfaces";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const RESERVE_PRODUCT = 'RESERVE_PRODUCT';
export const FINISH_PRODUCT = 'REMOVE_PRODUCT';

export const logOutUser = () => ({
  type: LOGOUT_USER,
  payload: {},
})

export const updatePassword = (userId: string, password: string) => ({
  type: UPDATE_PASSWORD,
  payload: { userId, password },
})

export const loginUser = (user: User) => ({
  type: LOGIN_USER,
  payload: { user },
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