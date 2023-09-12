import { v4 as uuidv4 } from 'uuid';
import { Product, ProductFilter } from '../interfaces/interfaces';
import { ADD_PRODUCT, RESERVE_PRODUCT } from './actions';

interface RootState {
  products: Product[];
  productFilters: ProductFilter;
}

const initialState: RootState = {
    products: [
        { 
          id: uuidv4(), 
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
          id: uuidv4(), 
          name:'Череша', 
          place: 'Мало Конаре', 
          cost: 4, 
          availability: 800,
          minOrder: 40,
          reserved: false,
          image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { 
          id: uuidv4(), 
          name:'Диня', 
          place: 'Огняново', 
          cost: 1.5,
          availability:1200,
          minOrder:150, 
          additionalInformation: 'Купена от Турция',
          reserved: false,
          image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg' },
        { 
          id: uuidv4(), 
          name:'Череша', 
          place: 'Динката', 
          cost: 2.5, 
          availability:500,
          minOrder:10,
          additionalInformation: 'Петъка няма да ме има',
          reserved: false,
          image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { 
          id: uuidv4(), 
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
    case ADD_PRODUCT:
      const { product } = action.payload;
      const { 
        name = '', 
        cost = 0, 
        availability = 0, 
        minOrder = 0, 
        place = '', 
        image = '', 
        additionalInformation = '' 
      } = product;

      const newProduct: Product = {
        id: uuidv4(),
        name: name,
        cost: parseFloat(cost),
        availability: parseFloat(availability),
        minOrder: parseFloat(minOrder),
        place: place,
        image: image || 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg',
        // phoneNumber: offer.phoneNumber,
        additionalInformation: additionalInformation,
        reserved: false,
      };

      const newProducts = [...state.products, newProduct];

      return {
        ...state,
        products: newProducts,
    };
    case RESERVE_PRODUCT:
      const { productId, orderQuantity, minOrder: minimumOrder } = action.payload;
    
      const updatedProducts = state.products.map((product: Product) => {
        if (product.id === productId) {
          const newAvailability = product.availability - orderQuantity;
          console.log('newAvailability', newAvailability);
          console.log('product.availability', product.availability);
          console.log('orderQuantity', orderQuantity);
          // mark the product as reserved and the quantity reservered
          const updatedProduct: Product = {
            ...product,
            reserved: true,
            availability: orderQuantity,
          };
    
          // if newAvailability >= minOrder a new product should be created, because there is enough quantity for potential buyers
          if (newAvailability >= minimumOrder) {
            const newProduct: Product = {
              ...product,
              id: uuidv4(),
              reserved: false,
              availability: newAvailability,
            };
    
            return [updatedProduct, newProduct];
          }

          return updatedProduct;
        }
        return product;
      });
    
      // Flatten the arra
      const newProductsReserve = updatedProducts.flat().filter((product) => product);
    
      return {
        ...state,
        products: newProductsReserve,
    };    

    default:
      return state;
  }
};

export default rootReducer;