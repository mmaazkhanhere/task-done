import { configureStore } from '@reduxjs/toolkit';
import { todoTaskSlice } from './todoTask';
import { pendingTaskSlice } from './pendingTask';
import { completedTaskSlice } from './completedTask';

export const store = configureStore({
    reducer: {
        todoTasks: todoTaskSlice.reducer,
        pendingTask: pendingTaskSlice.reducer,
        completedTask: completedTaskSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch