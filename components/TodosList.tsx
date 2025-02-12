"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTodo, fetchTodos, Todo } from "@/lib/services/todoService";
import TodoItem from "@/components/TodoItem";
import AuthWrapper from "./AuthWrapper";
import { useAuth } from "@/hooks/useAuth";

const TodosList = () => {
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
    });

    const { user } = useAuth();

    useEffect(() => {
        // Fetch Todos from API and Set State for Todos and Loading
        const fetchAndSetTodos = async () => {
            const data = await fetchTodos()
            setTodos(data);
            setLoading(false);
        }

        // Call the fetchAndSetTodos function
        fetchAndSetTodos();
    }, [router]);

    // Function to Add a New TodoItem
    const handleAddTodo = async () => {
        // Check if title and description are empty
        if (!newTodo.title || !newTodo.description) {
            return;
        }

        // Create a new todoItem with the current title and description
        const data = await createTodo({
            ...newTodo,
            completed: false,
        });

        // Add the new todoItem to the list of todos and reset the newTodo state content
        setTodos([...todos, data]);
        setNewTodo({ title: "", description: "" });
    };

    // Function to handle the change in the input fields
    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Update the newTodo state with the new value from the input fields
        setNewTodo({
            ...newTodo,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <AuthWrapper>
            <h1 className="text-2xl font-bold text-center mb-4">
                Welcome, {user?.username ?? "User"} 👋
            </h1>

            <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center ">

                    {/* Title Input Field */}
                    <input
                        type="text"
                        name="title"
                        onChange={handleTodoChange}
                        value={newTodo.title}
                        placeholder="Add a new todo..."
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />

                    {/* Add Button */}
                    <button
                        onClick={handleAddTodo}
                        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Add
                    </button>
                </div>

                {/* Description Input Field */}
                {newTodo.title && <textarea
                    name="description"
                    className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a description..."
                    onChange={handleTodoChange}
                    value={newTodo.description}
                />}
            </div>

            {/* List of Todos */}
            <div className="space-y-3">
                {loading && <p className="text-center text-gray-500">Loading todos...</p>}
                {!loading && todos.length === 0 && <p className="text-center text-gray-500">No todos found.</p>}
                {!loading && todos.length > 0 && todos.map((todo) => (
                    <TodoItem key={todo.id} todoObject={todo} />
                ))}
            </div>
        </AuthWrapper>
    )
}

export default TodosList