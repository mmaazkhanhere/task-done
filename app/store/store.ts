import { configureStore } from '@reduxjs/toolkit'
import todoTaskSlice from './task'

export const store = configureStore({
    reducer: {
        task: todoTaskSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch