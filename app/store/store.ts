import { configureStore } from '@reduxjs/toolkit'
import todoTaskSlice from './task'
import completedTaskSlice from './taskCompleted'

export const store = configureStore({
    reducer: {
        task: todoTaskSlice,
        taskCompleted: completedTaskSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch