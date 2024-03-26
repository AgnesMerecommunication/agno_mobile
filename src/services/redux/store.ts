import {configureStore} from '@reduxjs/toolkit';
import reducerCard from './reducerCard';
import reducerAgenda from './reducerAgenda';
import reducerProducts from './reducerProducts';
import reducerUser from './reducerUser';

export const store = configureStore({
  reducer: {
    cards: reducerCard,
    agenda: reducerAgenda,
    products: reducerProducts,
    user: reducerUser,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
