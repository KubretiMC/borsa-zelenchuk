import { v4 as uuidv4 } from 'uuid';
import { Product, ProductFilter } from '../interfaces/interfaces';

interface RootState {
  products: Product[];
  productFilters: ProductFilter;
}

const initialState: RootState = {
    products: [
        { id: uuidv4(), name:'Диня', place: 'Огняново', cost: 1.2, image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg' },
        { id: uuidv4(), name:'Череша', place: 'Мало Конаре', cost: 4, image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { id: uuidv4(), name:'Диня', place: 'Огняново', cost: 1.5, image: 'https://zemedeleca.bg/wp-content/uploads/2023/05/%D0%94%D0%B8%D0%BD%D0%B8.jpg' },
        { id: uuidv4(), name:'Череша', place: 'Динката', cost: 2.5, image: 'https://trud.bg/public/images/articles/2015-05/image__4754527--4754232_3580228130795270688_big.jpg' },
        { id: uuidv4(), name:'Праскова', place: 'Мало Конаре', cost: 4, image: 'https://agri.bg/media/2019/08/03/409961/740x500.jpg' },
    ],
    productFilters: {
        names: ['Диня', 'Череша', 'Праскова', 'Ягода'],
        places: ['Огняново', 'Мало Конаре', 'Динката', 'Мокрище'],
    }
};

const rootReducer = (state: RootState = initialState, action: any): RootState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;