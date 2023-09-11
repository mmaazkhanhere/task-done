export interface TaskInterface {
    username?: string;
    task_added: string;
    due_date: Date;
}

export interface TaskSliceState {
    task: TaskInterface[],
    isLoading: boolean,
    error: any
}
export interface LatestTaskSliceState {
    latestTask: TaskInterface[],
    isLoading: boolean,
    error: any
}
export interface CompletedTaskSliceState {
    completed: CompletedTaskInterface[],
    isLoading: boolean,
    error: any
}
export interface PendingTaskSliceInterface {
    pending: PendingTaskInterface[],
    isLoading: boolean,
    error: any
}

export interface CompletedTaskInterface {
    task_completed: string;
    due_date: Date
}

export interface PendingTaskInterface {
    task_pending: string,
    due_date: Date
}

