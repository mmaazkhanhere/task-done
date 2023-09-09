import { configureStore } from '@reduxjs/toolkit'
import todoTaskSlice from './task'
import { completedTaskReducer, completedTaskSlice } from './completedTask'

export const store = configureStore({
    reducer: {
        task: todoTaskSlice,
        taskCompleted: completedTaskReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch