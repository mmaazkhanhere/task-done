import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { CompletedTaskInterface, CompletedTaskSliceState } from "../interfaces";

export const getCompletedTasks = createAsyncThunk(`taskCompleted/getCompletedTask`, async () => {
    try {
        const res = await axios.get(`/api/completedTask`);
        const data = await res.data();
        return data;
    } catch (error) {
        console.error('Error in the async thunk of getCompletedTask: ', error);
        throw error;
    }
})

export const addTaskCompleted = createAsyncThunk(`taskCompleted/addTaskCompleted`, async (data: { task_completed: string }) => {
    try {
        const res = await axios.post(`/api/completedTask`, {
            task_completed: data.task_completed,
        });

        const taskAdded: CompletedTaskInterface = {
            task_completed: data.task_completed,
        };

        return taskAdded;

    } catch (error) {
        console.error("Error while passing data to completed task api: ", error);
    }
})


const initialState: CompletedTaskSliceState = {
    completedTask: [],
    isLoading: false,
    error: null
}


export const completedTaskSlice = createSlice({
    name: 'taskCompleted',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getCompletedTasks.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(getCompletedTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.completedTask = action.payload;
            state.error = null;
        });
        builder.addCase(getCompletedTasks.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in the cases for asyncThunk function getCompletedTask"
        })

        //Cases for addTaskCompleted

        builder.addCase(addTaskCompleted.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addTaskCompleted.fulfilled, (state, action) => {
            state.isLoading = false;
            const newTask = action.payload;
            state.completedTask.push();
        });
        builder.addCase(addTaskCompleted.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in the cases for asyncThunk addTaskCompleted"
        });
    }
})

export const selectCompletedTaskSlice = (state: RootState) => state.taskCompleted

export const completedTaskReducer = completedTaskSlice.reducer;
