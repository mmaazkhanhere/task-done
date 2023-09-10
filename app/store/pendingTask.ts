import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PendingTaskInterface, PendingTaskSliceInterface } from "../interfaces";
import { RootState } from "./store";
import axios from "axios";

export const getPendingTask = createAsyncThunk(`pendingTask/getPendingTask`, async () => {
    try {

        const req = await fetch(`/api/pendingTask`, {
            method: 'GET'
        });

        const res = await req.json();

        return res;
    } catch (error) {
        console.error("Error in the asyncThunk function getPendingTask: ", error);
    }
})

export const addPendingTask = createAsyncThunk(`pendingTask/addPendingTask`,
    async (data: { pending_task: string, due_date: Date }) => {
        try {

            const res = await axios.post(`/api/pendingTask`, {
                pending_task: data.pending_task,
                due_date: data.due_date
            })

            const result = await res.data;

            const pendingTask: PendingTaskInterface = {
                task_pending: data.pending_task,
                due_date: data.due_date
            };

            return pendingTask;

        } catch (error) {
            console.error("Error in asyncThunk function addPendingTask: ", error);
        }
    });

export const deletePendingTask = createAsyncThunk(`pendingTask/deletePendingTask`, async (data: { pending_task: string }) => {
    try {
        const encodedTask = encodeURIComponent(data.pending_task);
        const res = await axios.delete(`/api/pendingTask?delete_task=${encodedTask}`);
        return res.data;
    } catch (error) {
        console.error("Error in the asyncThunk of deletePendingTask")
    }
})

const initialState: PendingTaskSliceInterface = {
    pending: [],
    isLoading: false,
    error: null
}

const pendingTaskSlice = createSlice({
    name: 'pendingTask',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //cases for getPendingTask

        builder.addCase(getPendingTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getPendingTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pending = action.payload;
            state.error = null;
        });
        builder.addCase(getPendingTask.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in cases for asyncThunk function getPendingTask";
        })

        //cases for addPendingTask

        builder.addCase(addPendingTask.pending, (state) => {
            state.error = true;
        });
        builder.addCase(addPendingTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const task = action.payload;
            if (task) {
                state.pending.push(task);
            }
            state.error = null;
        });
        builder.addCase(addPendingTask.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in case for asyncThunk function addPendingTask"
        });


        //cases for deleteing pendingTask

        builder.addCase(deletePendingTask.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deletePendingTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const completedTask = action.payload;
            state.pending = state.pending.filter(task => task.task_pending === completedTask.task_pending);
        });
        builder.addCase(deletePendingTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
})

export const selectPendingTask = (state: RootState) => state.pendingTask;

export default pendingTaskSlice.reducer;