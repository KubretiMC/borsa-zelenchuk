import { v4 as uuidv4 } from 'uuid';
import { Product, RootState, User } from '../interfaces/interfaces';
import { ADD_PRODUCT, LOG_USER, RESERVE_PRODUCT } from './actions';

export const mockUsers: User[] = [
  { id: uuidv4(), username: 'admin', password: 'admin', offers: ['9cc32e6a-76a9-49a4-9372-4d541d534404', "7d24b41c-fae0-4843-a380-05ae3ea14048"] },
  { id: uuidv4(), username: 'admin2', password: 'admin2' },
];

const initialState: RootState = {
    users: mockUsers,
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
        },
        { 
          id: "d554aeaa-5854-4656-8865-d30fa2b85b1c", 
          name:'Череша', 
          place: 'Мало Конаре', 
          cost: 4, 
          availability: 800,
          minOrder: 40,
          reserved: false,
          image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { 
          id: "409808fc-05d7-486a-8eae-d611eb75c2b8", 
          name:'Диня', 
          place: 'Огняново', 
          cost: 1.5,
          availability:1200,
          minOrder:150, 
          additionalInformation: 'Купена от Турция',
          reserved: false,
          image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg' },
        { 
          id: "7d24b41c-fae0-4843-a380-05ae3ea14048", 
          name:'Череша', 
          place: 'Динката', 
          cost: 2.5, 
          availability:500,
          minOrder:10,
          additionalInformation: 'Петъка няма да ме има',
          reserved: false,
          image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { 
          id: "f9c1520b-fd8a-4eef-be07-d3a0448b5641", 
          name:'Праскова', 
          place: 'Мало Конаре', 
          cost: 4,
          availability: 4000,
          minOrder:500, 
          reserved: false,
          additionalInformation: 'Петъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме имаПетъка няма да ме има',
          image: 'https://agri.bg/media/2019/08/03/409961/740x500.jpg' 
        },
    ],
    productFilters: {
        names: ['Диня', 'Череша', 'Праскова', 'Ягода'],
        places: ['Огняново', 'Мало Конаре', 'Динката', 'Мокрище'],
    }
};

const rootReducer = (state: RootState = initialState, action: any): RootState => {
  switch (action.type) {
    case LOG_USER:
      const { username, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        return {
          ...state,
          loggedUser: foundUser,
        };
      }
      return state;
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

      let updatedLoggedUser = state.loggedUser;
      if (updatedLoggedUser && updatedLoggedUser.id === userIdAddProduct) {
        const updatedLoggedUserOffers = updatedLoggedUser.offers
          ? [...updatedLoggedUser.offers, newProduct.id]
          : [newProduct.id];

        updatedLoggedUser = {
          ...updatedLoggedUser,
          offers: updatedLoggedUserOffers,
        };
      }

      return {
        ...state,
        products: newProducts,
        users: updatedUsersAddProducts,
        loggedUser: updatedLoggedUser,
    };
    case RESERVE_PRODUCT:
      const { userId, productId, orderQuantity, minOrder: minimumOrder } = action.payload;

      let updatedUsers = state.users.map((user) => ({ ...user })); // Create a copy of users array

      const updatedProducts = state.products.map((product: Product) => {
        if (product.id === productId) {
          const newAvailability = product.availability - orderQuantity;

          // Find the user based on userId and add the productId to their reserves
          updatedUsers = updatedUsers.map((user) => {
            if (user.id === userId) {
              const updatedReserves = user.reserves ? [...user.reserves, productId] : [productId];

              return {
                ...user,
                reserves: updatedReserves,
              };
            }
            return user;
          });

          // Find the original user who offered the product
          const originalUser = updatedUsers.find((user) => user.offers?.includes(productId));

          if (originalUser) {
            // Remove the productId from the original user's offers array
            const updatedOffers = originalUser.offers?.filter((offerId) => offerId !== productId);

            // Update the original user
            updatedUsers = updatedUsers.map((user) => {
              if (user.id === originalUser.id) {
                return {
                  ...user,
                  offers: updatedOffers,
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
              const updatedOffers = originalUser.offers?.filter((offerId) => offerId !== productId);

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
      const newProductsReserve = updatedProducts.flat().filter((product) => product);

      return {
        ...state,
        products: newProductsReserve,
        users: updatedUsers, // Update the users with the modified reserves and offers arrays
    };

    default:
      return state;
  }
};

export default rootReducer;