import { configureStore } from '@reduxjs/toolkit';
import loginslice from './redux/loginSlice'

const store = configureStore({
    reducer: {
      login: loginslice
    },
  });

export default store;