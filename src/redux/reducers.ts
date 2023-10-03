import { v4 as uuidv4 } from 'uuid';
import { Product, RootState, User } from '../interfaces/interfaces';
import { 
  ADD_PRODUCT_LOGGED_USER, 
  FETCH_PRODUCTS, 
  FETCH_USERS, 
  FINISH_PRODUCT, 
  LOGIN_USER, 
  LOGOUT_USER, 
  RESERVE_PRODUCT, 
  UPDATE_PASSWORD 
} from './actions';

const initialState: RootState = {
    users: [],
    products: [],
    productFilters: {
        names: ['Диня', 'Череша', 'Праскова', 'Ягода'],
        places: ['Огняново', 'Мало Конаре', 'Динката', 'Мокрище'],
    }
};

const rootReducer = (state: RootState = initialState, action: any): RootState => {
  switch (action.type) {
    case FETCH_USERS:
      const { users: usersFetchUsers = [] } = action.payload;
      return {
        ...state,
        users: usersFetchUsers,
      };
    case LOGOUT_USER:
        return {
          ...state,
          loggedUser: undefined,
        };
    case UPDATE_PASSWORD:
      const { userId: userIdToUpdate, password: newPassword } = action.payload;
      const updatedLoggedUser = { ...state.loggedUser, password: newPassword };
    
      const updatedUsersUpdatePassword = state.users.map((user) => {
        if (user.id === userIdToUpdate) {
          return { ...user, password: newPassword };
        }
        return user;
      });
    
      return {
        ...state,
        loggedUser: updatedLoggedUser as User,
        users: updatedUsersUpdatePassword,
    };
    case LOGIN_USER:
      const { user: userLoginUser = {} } = action.payload;
      return {
        ...state,
        loggedUser: userLoginUser,
      };
    case FETCH_PRODUCTS:
      const { products: productsFetchProducts = [] } = action.payload;
      return {
        ...state,
        products: productsFetchProducts,
      };
    case ADD_PRODUCT_LOGGED_USER:
      const { loggedUser: loggedUserAddProduct, productId: productIdAddProduct } = action.payload;

      const updatedLoggedUserAddProduct = {
        ...loggedUserAddProduct,
        offers: loggedUserAddProduct.offers ? [...loggedUserAddProduct.offers, productIdAddProduct] : [productIdAddProduct],
      };
    
      return {
        ...state,
        loggedUser: updatedLoggedUserAddProduct,
      };
        
    case FINISH_PRODUCT:
      const { productId: productIdFinishProduct } = action.payload;

      const updatedProductsFinishProduct = state.products.map((product: Product) => {
        if (product.id === productIdFinishProduct) {
          return {
            ...product,
            finished: true,
          };
        }
        return product;
      });

      return {
        ...state,
        products: updatedProductsFinishProduct,
      };


    case RESERVE_PRODUCT:
      const { userId: userIdReserveProduct, productId: productIdReserveProduct, orderQuantity, minOrder: minimumOrder } = action.payload;

      let updatedUsers = state.users.map((user) => ({ ...user }));

      const updatedProductsReserveProduct = state.products.map((product: Product) => {
        if (product.id === productIdReserveProduct) {
          const newAvailability = product.availability - orderQuantity;

          // Find the user based on userId and add the productId to their reserves
          updatedUsers = updatedUsers.map((user) => {
            if (user.id === userIdReserveProduct) {
              const updatedReserves = user.reserves ? [...user.reserves, productIdReserveProduct] : [productIdReserveProduct];

              return {
                ...user,
                reserves: updatedReserves,
              };
            }
            return user;
          });

          // Find the original user who offered the product
          const originalUser = updatedUsers.find((user) => user.offers?.includes(productIdReserveProduct));

          if (originalUser) {
            // Remove the productId from the original user's offers array
            const updatedOffers = originalUser.offers?.filter((offerId) => offerId !== productIdReserveProduct);

            // Update the original user
            updatedUsers = updatedUsers.map((user) => {
              if (user.id === originalUser.id) {
                return {
                  ...user,
                  offers: updatedOffers,
                  userReserved: [...(user.userReserved ?? []), productIdReserveProduct],
                };
              }
              return user;
            });
          }

          // mark the product as reserved and the quantity reserved
          const updatedProduct: Product = {
            ...product,
            reserved: true,
            availability: orderQuantity,
          };

          // if newAvailability >= minOrder a new product should be created, because there is enough quantity for potential buyers
          if (newAvailability >= minimumOrder) {
            const newProductId = uuidv4();
            const newProduct: Product = {
              ...product,
              id: newProductId,
              reserved: false,
              availability: newAvailability,
            };

            // Find the original user who offered the product
            if (originalUser) {
              // Remove the productId from the original user's offers array
              const updatedOffers = originalUser.offers?.filter((offerId) => offerId !== productIdReserveProduct);

              // Update the original user and add the new offer
              updatedUsers = updatedUsers.map((user) => {
                if (user.id === originalUser.id) {
                  const updatedOffersArray = updatedOffers ? [...updatedOffers, newProductId] : [newProductId];

                  return {
                    ...user,
                    offers: updatedOffersArray,
                  };
                }
                return user;
              });
            }

            return [updatedProduct, newProduct];
          }

          return updatedProduct;
        }
        return product;
      });

      // Flatten the array
      const newProductsReserve = updatedProductsReserveProduct.flat().filter((product) => product);

      const loggedUserUpdated = updatedUsers.find(
        (user) => user.id === userIdReserveProduct
      )

      return {
        ...state,
        products: newProductsReserve,
        users: updatedUsers,
        loggedUser: loggedUserUpdated
      };

    default:
      return state;
  }
};

export default rootReducer;