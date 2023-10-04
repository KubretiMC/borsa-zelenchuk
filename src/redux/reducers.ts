import { Product, RootState, User } from '../interfaces/interfaces';
import { 
  ADD_PRODUCT_LOGGED_USER, 
  FETCH_PRODUCTS, 
  FETCH_USERS, 
  FINISH_PRODUCT, 
  LOGIN_USER, 
  LOGOUT_USER, 
  UPDATE_LOGGED_USER, 
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
    case UPDATE_LOGGED_USER:
      const { userId } = action.payload;
      const updatedLoggedUser = state.users.find((user => user.id === userId));

      if (updatedLoggedUser) {
        return {
          ...state,
          loggedUser: updatedLoggedUser as User,
        };
      }

      return state;
    case LOGOUT_USER:
      return {
        ...state,
        loggedUser: undefined,
      };
    case UPDATE_PASSWORD:
      const { userId: userIdToUpdate, password: newPassword } = action.payload;
      const updatedLoggedUserUpdatePassword = { ...state.loggedUser, password: newPassword };
    
      const updatedUsersUpdatePassword = state.users.map((user) => {
        if (user.id === userIdToUpdate) {
          return { ...user, password: newPassword };
        }
        return user;
      });
    
      return {
        ...state,
        loggedUser: updatedLoggedUserUpdatePassword as User,
        users: updatedUsersUpdatePassword,
    };
    case LOGIN_USER:
      const { userId: userIdLoginUser = '' } = action.payload;
      const user: User = {
        id: userIdLoginUser,
        username: '',
        password: '',
        phoneNumber: ''
      };

      return {
        ...state,
        loggedUser: user
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