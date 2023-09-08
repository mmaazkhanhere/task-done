import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { TaskSliceState } from "../interfaces";

export const getLatestTask = createAsyncThunk('task/getLatestTask', async () => {
    try {
        const res = await fetch('/api/addTask', {
            method: 'GET',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in the async thunk of getLatestTask: ', error);
        throw error;
    }
});

export const taskCompleted = createAsyncThunk(`task/taskCompleted`, async (data: { task_completed: string }) => {
    try {
        const encodedTask = encodeURIComponent(data.task_completed)
        const res = await axios.delete(`/api/addTask?delete_task=${encodedTask}`);
        return res.data;
    } catch (error) {
        console.error("Error in the asyncThunk of taskCompleted")
    }
})


const initialState: TaskSliceState = {
    todoTask: [],
    isLoading: false,
    error: null
}

export const todoTaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLatestTask.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getLatestTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todoTask = action.payload
            state.error = null;
        });
        builder.addCase(getLatestTask.rejected, (state) => {
            state.isLoading = false;
            state.error("Error in the async thunk of getting latest task");
        });

        builder.addCase(taskCompleted.pending, (state) => {
            state.error = true;
        });
        builder.addCase(taskCompleted.fulfilled, (state, action) => {
            state.isLoading = false;
            const deletedTask = action.payload; // This should be the deleted task
            console.log(deletedTask);

            state.todoTask = state.todoTask.filter(task => task.task_added !== deletedTask.task_added);
            console.log(state.todoTask);
        });

        builder.addCase(taskCompleted.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
})

export const selectTodoTask = (state: RootState) => state.task

export default todoTaskSlice.reducer;