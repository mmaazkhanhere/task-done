import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PendingTaskInterface, PendingTaskSliceInterface } from "../interfaces";
import { RootState } from "./store";
import axios from "axios";

export const getPendingTask = createAsyncThunk(`pendingTask/getPendingTask`, async () => {
    try {
        console.log("async thunk called");
        const req = await fetch(`/api/pendingTask`, {
            method: 'GET'
        });
        console.log("after api call");
        const res = await req.json();
        console.log(res);
        return res;
    } catch (error) {
        console.error("Error in the asyncThunk function getPendingTask: ", error);
    }
})

export const addPendingTask = createAsyncThunk(`pendingTask/addPendingTask`,
    async (data: { pending_task: string, due_date: Date }) => {
        try {
            console.log("asyncthunk called")
            console.log(data.due_date);

            console.log("Before api call");
            const res = await axios.post(`/api/pendingTask`, {
                pending_task: data.pending_task,
                due_date: data.due_date
            })
            console.log("After api call");

            const result = await res.data;

            const pendingTask: PendingTaskInterface = {
                task_pending: data.pending_task,
                due_date: data.due_date
            };
            console.log(pendingTask);
            return pendingTask;

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

        //cases for getPendingTask

        builder.addCase(getPendingTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getPendingTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pending = action.payload;
            console.log(action.payload);
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
            console.log(task);
            if (task) {
                state.pending.push(task);
            }
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