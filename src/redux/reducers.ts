import { Product, RootState, User } from '../interfaces/interfaces';
import { 
  ADD_PRODUCT_LOGGED_USER, 
  FETCH_PRODUCTS, 
  FETCH_USERS, 
  FINISH_PRODUCT, 
  LOGOUT_USER, 
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
      const { users: usersFetchUsers = [], userId = '' } = action.payload;
      const updatedLoggedUserFetchUses = usersFetchUsers.find((user: User) => user.id === userId);
    
      return {
        ...state,
        users: usersFetchUsers,
        loggedUser: updatedLoggedUserFetchUses || state.loggedUser,
    };
    case LOGOUT_USER:
      return {
        ...state,
        loggedUser: undefined,
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

    default:
      return state;
  }
};

export default rootReducer;