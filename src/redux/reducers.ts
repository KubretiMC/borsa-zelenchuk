import { v4 as uuidv4 } from 'uuid';
import { Product, RootState, User } from '../interfaces/interfaces';
import { ADD_PRODUCT, FETCH_USERS, FINISH_PRODUCT, LOGIN_USER, LOGOUT_USER, RESERVE_PRODUCT, UPDATE_PASSWORD } from './actions';

const initialState: RootState = {
    users: [],
    products: [
        { 
          id: '9cc32e6a-76a9-49a4-9372-4d541d534404', 
          name:'Диня', 
          place: 'Огняново', 
          cost: 1.2,
          availability: 2000,
          minOrder: 200,  
          additionalInformation: 'Най-доброто на пазара',
          reserved: false,
          image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg',
          finished: false,
          dateAdded: '12.09'
        },
        { 
          id: "d554aeaa-5854-4656-8865-d30fa2b85b1c", 
          name:'Череша', 
          place: 'Мало Конаре', 
          cost: 4, 
          availability: 800,
          minOrder: 40,
          reserved: false,
          image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' ,
          finished: false,
          dateAdded: '24.09'
        },
        { 
          id: "409808fc-05d7-486a-8eae-d611eb75c2b8", 
          name:'Диня', 
          place: 'Огняново', 
          cost: 1.5,
          availability:1200,
          minOrder:150, 
          additionalInformation: 'Купена от Турция',
          reserved: false,
          image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg',
          finished: false,
          dateAdded: '20.09'
        },
        { 
          id: "7d24b41c-fae0-4843-a380-05ae3ea14048", 
          name:'Череша', 
          place: 'Динката', 
          cost: 2.5, 
          availability:500,
          minOrder:10,
          additionalInformation: 'Петъка няма да ме има',
          reserved: false,
          image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg',
          finished: false,
          dateAdded: '17.11'
        },
        { 
          id: "f9c1520b-fd8a-4eef-be07-d3a0448b5641", 
          name:'Праскова', 
          place: 'Мало Конаре', 
          cost: 4,
          availability: 4000,
          minOrder:500, 
          reserved: false,
          additionalInformation: 'Петъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме има',
          image: 'https://agri.bg/media/2019/08/03/409961/740x500.jpg',
          finished: false,
          dateAdded: '17.07'
        },
    ],
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
      const { user: userRegistration = {} } = action.payload;
      return {
        ...state,
        loggedUser: userRegistration,
      };
    case ADD_PRODUCT:
      const { userId: userIdAddProduct, product } = action.payload;
      const {
        name = '',
        cost = 0,
        availability = 0,
        minOrder = 0,
        place = '',
        image = '',
        additionalInformation = '',
      } = product;

      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}.${currentDate.toLocaleString('default', { month: 'short' })}`;

      const newProduct: Product = {
        id: uuidv4(),
        name: name,
        cost: parseFloat(cost),
        availability: parseFloat(availability),
        minOrder: parseFloat(minOrder),
        place: place,
        image: image || 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg',
        additionalInformation: additionalInformation,
        reserved: false,
        finished: false,
        dateAdded: formattedDate
      };
    
      const newProducts = [...state.products, newProduct];
    
      const updatedUsersAddProducts = state.users.map((user) => {
        if (user.id === userIdAddProduct) {
          const updatedOffers = user.offers ? [...user.offers, newProduct.id] : [newProduct.id];
    
          return {
            ...user,
            offers: updatedOffers,
          };
        }
        return user;
      });

      const loggedUserUpdatedAddProduct = updatedUsersAddProducts.find(
        (user) => user.id === userIdAddProduct
      )

      return {
        ...state,
        products: newProducts,
        users: updatedUsersAddProducts,
        loggedUser: loggedUserUpdatedAddProduct,
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