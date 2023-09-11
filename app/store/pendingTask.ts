import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PendingTaskInterface, PendingTaskSliceInterface, TaskSliceState } from "../interfaces";
import { RootState } from "./store";
import { TaskInterface } from '@/app/interfaces'
import axios from "axios";


export const getPendingTask = createAsyncThunk("pendingTask/getPendingTask", async () => {
    try {
        const res = await axios.get(`/api/pendingTask`);
        const data = await res.data;
        return data;
    } catch (error) {
        console.error("Error in the asyncThunk function getLatestTask");
    }
});

export const addPending = createAsyncThunk("pendingTask/addTask", async (data: { pending_task: string, pending_date: Date }) => {
    try {
        await axios.post(`/api/pendingTask`, {
            pending_task: data.pending_task,
            pending_date: data.pending_date
        });
        const taskAdded: PendingTaskInterface = {
            task_pending: data.pending_task,
            due_date: data.pending_date
        };
        return taskAdded;

    } catch (error) {
        console.error("Error in addTask asyncTHunk function: ", error);
    }
});

export const deletePending = createAsyncThunk(`pendingTask/deletePending`, async (data: { pending_task: string }) => {
    try {
        const res = await axios.delete(`/api/pendingTask?delete_task=${data.pending_task}`);
        return res.data;
    } catch (error) {
        console.error("Error in async thunk function deleteTask: ", error);
    }
});

const initialState: PendingTaskSliceInterface = {
    pending: [],
    isLoading: false,
    error: null
};

export const pendingTaskSlice = createSlice({
    name: "pendingTask",
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
            state.error = "Error in the builder.addCase for getPendingTask";
            state.isLoading = false;
        });


        //cases for addTask asyncThunk

        builder.addCase(addPending.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addPending.fulfilled, (state, action) => {
            state.isLoading = false;
            const newTask = action.payload;
            if (newTask) {
                state.pending.push(newTask);
            };
            state.error = null;
        });
        builder.addCase(addPending.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in builder.addCases for addPending"
        });

        //cases for addPending asyncThunk

        builder.addCase(deletePending.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deletePending.fulfilled, (state, action) => {
            state.isLoading = false;
            const deleteTask = action.payload
            state.pending = state.pending.filter(pending => pending.task_pending === deleteTask.task_added);
            state.error = null;
        });
        builder.addCase(deletePending.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in the builder.addCase of deleteTask";
        });
    },
});

export const selectPending = (state: RootState) => state.pendingTask;

export default pendingTaskSlice.reducer;