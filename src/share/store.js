import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './CartContext'
export const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
})