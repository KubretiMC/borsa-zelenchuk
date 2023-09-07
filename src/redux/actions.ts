export const RESERVE_PRODUCT = 'RESERVE_PRODUCT';

export const reserveProduct = (productId: string, orderQuantity: number) => ({
    type: RESERVE_PRODUCT,
    payload: { productId, orderQuantity },
  });