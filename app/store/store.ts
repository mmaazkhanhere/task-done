import { configureStore } from '@reduxjs/toolkit';
import { todoTaskSlice } from './todoTask';
import { pendingTaskSlice } from './pendingTask';

export const store = configureStore({
    reducer: {
        todoTasks: todoTaskSlice.reducer,
        pendingTask: pendingTaskSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch