import axiosInstance from "@/lib/axiosInstance";

export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
    try {
        const response = await axiosInstance.get("/todos");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
    }
};

export const fetchTodo = async (id: string): Promise<Todo | null> => {
    try {
        const response = await axiosInstance.get(`/todos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch todo:", error);
        return null;
    }
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo>  => {
    try {
        const response = await axiosInstance.post("/todos", todo);
        return response.data;
    } catch (error) {
        console.error("Failed to create todo:", error);
        return {} as Todo;
    }
};

export const updateTodo = async (id: number, data: Omit<Todo, "id">): Promise<Todo> => {
    try {
        const response = await axiosInstance.put(`/todos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Failed to update todo:", error);
        return {} as Todo;
    }
};

export const partialUpdateTodo = async (id: number, data: Partial<Todo>): Promise<Todo> => {
    try {
        const response = await axiosInstance.patch(`/todos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Failed to update todo:", error);
        return {} as Todo;
    }
};

export const deleteTodo = async (id: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`/todos/${id}`);
        return true;
    } catch (error) {
        console.error("Failed to delete todo:", error);
        return false;
    }
};
