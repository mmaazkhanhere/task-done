import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CompletedTaskInterface, CompletedTaskSliceState, TaskSliceState } from "../interfaces";
import { RootState } from "./store";
import { TaskInterface } from '@/app/interfaces'
import axios from "axios";


export const getCompletedTask = createAsyncThunk("completedTask/getCompletedTask", async () => {
    try {
        const res = await axios.get(`/api/completedTask`);
        const data = await res.data;
        return data;
    } catch (error) {
        console.error("Error in the asyncThunk function getCompletedTask");
    }
});

export const addCompletedTask = createAsyncThunk("completedTask/addCompletedTask", async (data: { task_completed: string, due_date: Date }) => {
    try {
        await axios.post(`/api/completedTask`, {
            task_added: data.task_completed,
            due_date: data.due_date
        });
        const taskAdded: CompletedTaskInterface = {
            task_completed: data.task_completed,
            due_date: data.due_date
        };
        return taskAdded;

    } catch (error) {
        console.error("Error in addCompletedTask asyncThunk function: ", error);
    }
});

export const deleteCompleted = createAsyncThunk(`completedTask/deleteCompleted`, async (data: { task_added: string }) => {
    try {
        const res = await axios.delete(`/api/completedTask?delete_task=${data.task_added}`);
        return res.data;
    } catch (error) {
        console.error("Error in async thunk function deleteCompleted: ", error);
    }
});

const initialState: CompletedTaskSliceState = {
    completed: [],
    isLoading: false,
    error: null
};

export const completedTaskSlice = createSlice({
    name: 'completedTask',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //cases for getAllTasks asyncThunk

        builder.addCase(getCompletedTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getCompletedTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.completed = action.payload;
            state.error = null;
        });
        builder.addCase(getCompletedTask.rejected, (state) => {
            state.error = "Error in the builder.addCase for getAllTasks";
            state.isLoading = false;
        });

        //cases for addTask asyncThunk

        builder.addCase(addCompletedTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addCompletedTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const newTask = action.payload;
            if (newTask) {
                state.completed.push(newTask);
            };
            state.error = null;
        });
        builder.addCase(addCompletedTask.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in builder.addCases for addTask"
        });


        //cases for deleteTask asyncThunk

        builder.addCase(deleteCompleted.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteCompleted.fulfilled, (state, action) => {
            state.isLoading = false;
            const deleteTask = action.payload
            state.completed = state.completed.filter(completed => completed.task_completed === deleteTask.task_added);
            state.error = null;
        });
        builder.addCase(deleteCompleted.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in the builder.addCase of deleteTask";
        });
    }
})