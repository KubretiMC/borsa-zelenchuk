import { OfferValues } from "../interfaces/interfaces";

export const LOG_USER = 'LOG_USER';
export const RESERVE_PRODUCT = 'RESERVE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const logUser = (username: string, password: string) => ({
  type: LOG_USER,
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