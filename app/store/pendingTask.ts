import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PendingTaskSliceInterface } from "../interfaces";
import { RootState } from "./store";
import axios from "axios";

export const addPendingTask = createAsyncThunk(`pendingTask/addPendingTask`,
    async (data: { pending_task: string, due_date: Date }) => {
        try {
            const res = await axios.post(`/api/pendingTask`, {
                pending_task: data.pending_task,
                due_date: data.due_date
            });

            const result = await res.data;
            return result;

        } catch (error) {
            console.error("Error in asyncThunk function addPendingTask: ", error);
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

        //cases for addPendingTask

        builder.addCase(addPendingTask.pending, (state) => {
            state.error = true;
        });
        builder.addCase(addPendingTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const task = action.payload;
            state.pending.push(task);
            state.error = null;
        });
        builder.addCase(addPendingTask.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in case for asyncThunk function addPendingTask"
        })
    }
})

export const selectPendingTask = (state: RootState) => state.pendingTask;

export default pendingTaskSlice.reducer;