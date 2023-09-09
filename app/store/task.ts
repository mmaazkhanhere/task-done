import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { TaskInterface, TaskSliceState } from "../interfaces";

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

export const taskAdded = createAsyncThunk(`task/taskAdded`, async (data: { task_added: string, due_date: Date }) => {
    try {
        const res = await axios.post(`/api/addTask`, {
            task_added: data.task_added,
            due_date: data.due_date
        })

        const addedTask: TaskInterface = {
            task_added: data.task_added,
            due_date: data.due_date
        };

        return addedTask;

    } catch (error) {
        console.error("The following error encounteredin taskAdded Post call: ", error)
        throw new Error("Cannot add task to the list !")
    }
})

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

        //cases for gettingLatestTask

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

        //cases for taskAdded

        builder.addCase(taskAdded.pending, (state) => {
            state.isLoading = false;
        });
        builder.addCase(taskAdded.fulfilled, (state, action) => {
            state.isLoading = false;
            const newItem = action.payload;
            state.todoTask.push(newItem);
        });
        builder.addCase(taskAdded.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in case of taskAdded asyncThunk";
        });

        //cases for taskCompleted

        builder.addCase(taskCompleted.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(taskCompleted.fulfilled, (state, action) => {
            state.isLoading = false;
            const completedTask = action.payload;
            state.todoTask = state.todoTask.filter(task => task.task_added === completedTask.task_added);
        });
        builder.addCase(taskCompleted.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

    }
})

export const selectTodoTask = (state: RootState) => state.task

export default todoTaskSlice.reducer;