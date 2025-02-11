"use client";

import { deleteTodo, partialUpdateTodo, Todo } from '@/lib/services/todoService';
import Link from 'next/link';
import React, { useState } from 'react';

const TodoItem = ({ todoObject }: { todoObject: Todo }) => {
    const [currentTodo, setCurrentTodo] = useState(todoObject);
    const [isDeleted, setIsDeleted] = useState(false);

    const toggleTodo = async (id: number, completed: boolean) => {
        // Toggle TodoCompletion and Update State Accordingly
        await partialUpdateTodo(id, { completed: !completed });
        setCurrentTodo({ ...currentTodo, completed: !completed });
    };

    const deleteCurrentTodo = async (id: number, e: React.MouseEvent) => {
        // Prevent Default and Stop Propagation to prevent navigation on button click
        e.preventDefault();
        e.stopPropagation();

        // Delete TodoItem and Update State Accordingly
        await deleteTodo(id);
        setIsDeleted(true);
    };

    if (isDeleted) {
        return null;
    }

    return (
        <Link href={`/todos/${currentTodo.id}`} className="flex items-center justify-between p-3 border rounded-md bg-gray-50 relative">
            <div className="flex items-center">
                {/* Toggle Button */}
                <input
                    type="checkbox"
                    checked={currentTodo.completed}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggleTodo(currentTodo.id, currentTodo.completed)}
                    className="mr-2 relative z-10"
                />
                <span className={currentTodo.completed ? "line-through text-gray-500" : ""}>
                    {currentTodo.title}
                </span>
            </div>
            {/* Delete Button */}
            <button
                onClick={(e) => deleteCurrentTodo(currentTodo.id, e)}
                className="text-red-500 hover:text-red-700"
            >
                ❌
            </button>
        </Link>
    );
};

export default TodoItem;
