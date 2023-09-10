import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { CompletedTaskInterface, CompletedTaskSliceState } from "../interfaces";

export const getCompletedTasks = createAsyncThunk(`taskCompleted/getCompletedTask`, async () => {
    try {
        console.log("Before request")
        const res = await fetch(`/api/completedTask`, {
            method: 'GET'
        });
        console.log("After request")
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error in the async thunk of getCompletedTask: ', error);
        throw error;
    }
})

export const addTaskCompleted = createAsyncThunk(`taskCompleted/addTaskCompleted`,
    async (data: { task_completed: string, due_date: Date }) => {
        console.log("async thunk called")
        try {
            const res = await axios.post(`/api/completedTask`, {
                task_completed: data.task_completed,
                due_date: data.due_date
            });
            console.log("After api call");
            const taskAdded: CompletedTaskInterface = {
                task_completed: data.task_completed,
                due_date: data.due_date
            };

            console.log("task added")
            return taskAdded;

        } catch (error) {
            console.error("Error while passing data to completed task api: ", error);
        }
    })

export const deleteCompleted = createAsyncThunk(`taskCompleted/deleteCompleted`, async (data: { task_completed: string }) => {
    try {

        const encodedTask = encodeURIComponent(data.task_completed)
        const res = await axios.delete(`/api/completedTask?delete_task=${encodedTask}`);

        const deleted = await res.data;
        return deleted;

    } catch (error) {
        console.error("Error in the asyncThunk function deleteCompleted")
    }
})

const initialState: CompletedTaskSliceState = {
    tasks: [],
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
            state.tasks = action.payload
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
            const newItem = action.payload;
            console.log(newItem)
            if (newItem) {
                state.tasks.push(newItem);
            }
        });
        builder.addCase(addTaskCompleted.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in the cases for asyncThunk addTaskCompleted"
        });

        //Cases for deleteCompleted


        builder.addCase(deleteCompleted.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCompleted.fulfilled, (state, action) => {
            state.isLoading = false;
            const completedTask = action.payload;
            state.tasks = state.tasks.filter(task => task.task_completed === completedTask.task_added);
        });
        builder.addCase(deleteCompleted.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
})

export const selectCompletedTask = (state: RootState) => state.taskCompleted

export default completedTaskSlice.reducer;
