import { OfferValues } from "../interfaces/interfaces";

export const RESERVE_PRODUCT = 'RESERVE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const addProduct = (product: OfferValues) => ({
  type: ADD_PRODUCT,
  payload: { product },
});

export const reserveProduct = (productId: string, orderQuantity: number) => ({
    type: RESERVE_PRODUCT,
    payload: { productId, orderQuantity },
});