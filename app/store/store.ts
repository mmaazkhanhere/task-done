import { configureStore } from '@reduxjs/toolkit';
import todoTaskSlice from './task';
import completedTaskSlice from './taskCompleted';
import pendingTaskSlice from './pendingTask';

export const store = configureStore({
    reducer: {
        task: todoTaskSlice,
        taskCompleted: completedTaskSlice,
        pendingTask: pendingTaskSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch