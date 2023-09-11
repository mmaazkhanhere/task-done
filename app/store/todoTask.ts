import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskSliceState } from "../interfaces";
import { RootState } from "./store";
import { TaskInterface } from '@/app/interfaces'
import axios from "axios";

export const getLatestTask = createAsyncThunk("latestTask/getLatestTask", async () => {
    try {
        const res = await axios.get(`/api/latestTask`);
        const data = await res.data;
        return data;
    } catch (error) {
        console.error("Error in the asyncThunk function getLatestTask");
    }
});

export const getAllTasks = createAsyncThunk("todoTasks/getAllTasks", async () => {
    try {
        const res = await axios.get(`/api/todoTask`);
        const data = await res.data;
        return data;
    } catch (error) {
        console.error("Error in asyncThunk function getAllTasks: ", error);
    }
});

export const addTask = createAsyncThunk("todoTasks/addTask", async (data: { task_added: string, due_date: Date }) => {
    try {
        await axios.post(`/api/todoTask`, {
            task_added: data.task_added,
            due_date: data.due_date
        });
        const taskAdded: TaskInterface = {
            task_added: data.task_added,
            due_date: data.due_date
        };
        return taskAdded;

    } catch (error) {
        console.error("Error in addTask asyncTHunk function: ", error);
    }
});

export const deleteTask = createAsyncThunk(`todoTasks/deleteTask`, async (data: { task_added: string }) => {
    try {
        const res = await axios.delete(`/api/todoTask?delete_task=${data.task_added}`);
        return res.data;
    } catch (error) {
        console.error("Error in async thunk function deleteTask: ", error);
    }
});

export const updateTask = createAsyncThunk(`todoTask/updateTask`, async (data: { new_task: string, new_date: Date }) => {
    try {
        const res = await axios.patch(`/api/todoTask`, {
            new_task: data.new_task,
            new_date: data.new_date
        });
        const updatedTask = res.data;
        return updatedTask;
    } catch (error) {
        console.error('Error in async thunk function updateTask: ', error);
    }
})

const initialState: TaskSliceState = {
    task: [],
    isLoading: false,
    error: null
};

export const todoTaskSlice = createSlice({
    name: 'todoTasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //cases getLatestTask asyncThunk

        builder.addCase(getLatestTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getLatestTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.task = action.payload;
            state.error = null;
        });
        builder.addCase(getLatestTask.rejected, (state) => {
            state.error = "Error in the builder.addCase for getLatesTask";
            state.isLoading = false;
        });

        //cases for getAllTasks asyncThunk

        builder.addCase(getAllTasks.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAllTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.task = action.payload;
            state.error = null;
        });
        builder.addCase(getAllTasks.rejected, (state) => {
            state.error = "Error in the builder.addCase for getAllTasks";
            state.isLoading = false;
        });


        //cases for addTask asyncThunk

        builder.addCase(addTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const newTask = action.payload;
            if (newTask) {
                state.task.push(newTask);
            };
            state.error = null;
        });
        builder.addCase(addTask.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in builder.addCases for addTask"
        });

        //cases for deleteTask asyncThunk

        builder.addCase(deleteTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const deleteTask = action.payload
            state.task = state.task.filter(task => task.task_added === deleteTask.task_added);
            state.error = null;
        });
        builder.addCase(deleteTask.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in the builder.addCase of deleteTask";
        });

        //cases for updateTask asyncThunk

        builder.addCase(updateTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const updatedTask = action.payload;
            if (updatedTask) {
                state.task = state.task.map((task) => task.task_added === task.task_added ? updatedTask : task);
            }
            state.error = null;
        });
        builder.addCase(updateTask.rejected, (state) => {
            state.isLoading = false;
            state.error = "Error in the builder.addCase of updateTask";
        });
    }
})

export const selectTodo = (state: RootState) => state.todoTasks;

export default todoTaskSlice.reducer;