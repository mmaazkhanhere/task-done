export interface TaskInterface {
    username?: string;
    task_added: string;
    due_date: Date;
}

export interface TaskSliceState {
    todoTask: TaskInterface[],
    isLoading: boolean,
    error: any
}
export interface CompletedTaskSliceState {
    completedTask: CompletedTaskInterface[],
    isLoading: boolean,
    error: any
}

export interface CompletedTaskInterface {
    task_completed: string;
    due_date?: Date;
}