"use client";

import { useEffect, useState } from "react";
import { fetchTodo, partialUpdateTodo, Todo, updateTodo } from "@/lib/services/todoService";
import { useRouter } from "next/navigation";

const TodoDetails = ({ todoId }: { todoId: string }) => {
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCurrentTodo = async () => {
            const data = await fetchTodo(todoId);

            setCurrentTodo(data);
            if (data) {
                setFormData({ title: data.title, description: data.description });
            }
            setLoading(false);
        };
        
        fetchCurrentTodo();
    }, [todoId]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSaveFormData = async () => {
        if (!currentTodo) return;

        const newTodo = { ...currentTodo, ...formData };
        const data = await updateTodo(currentTodo.id, newTodo);
        setCurrentTodo(data);
        setEditMode(false);
    }

    const handleToggleCompletion = async (id: number, completed: boolean) => {
        if (!currentTodo) return;

        await partialUpdateTodo(id, { completed: !completed });
        setCurrentTodo({ ...currentTodo, completed: !completed });
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Todo Details</h1>

            {/* ✅ Edit Mode Toggle */}
            <div className="mt-4">
                {editMode ? (
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                ) : (
                    <h2 className="text-xl text-center">{currentTodo?.title}</h2>
                )}
            </div>

            <div className="mt-4">
                {editMode ? (
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                ) : (
                    <h3 className="text-xl text-center">{currentTodo?.description}</h3>
                )}
            </div>

            {/* ✅ Completion Toggle */}
            <div className="flex items-center justify-center mt-4">
                <input
                    type="checkbox"
                    checked={currentTodo?.completed}
                    onChange={() => currentTodo && handleToggleCompletion(currentTodo.id, currentTodo.completed)}
                    className="mr-2"
                />
                <span className={currentTodo?.completed ? "line-through text-gray-500" : ""}>
                    {currentTodo?.completed ? "Completed" : "Not Completed"}
                </span>
            </div>

            {/* ✅ Action Buttons */}
            <div className="mt-6 flex flex-col space-y-2">
                <div className="flex gap-2">
                    {editMode ? (
                        <button
                            onClick={() => handleSaveFormData()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
                        >
                            Save Title
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md transition duration-200"
                        >
                            Edit Title
                        </button>
                    )}
                </div>

                <button
                    onClick={() => router.push("/todos")}
                    className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md transition duration-200"
                >
                    Back to Todos
                </button>
            </div>
        </>
    )
}

export default TodoDetails