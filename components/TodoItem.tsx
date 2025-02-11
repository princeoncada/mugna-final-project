"use client";

import { deleteTodo, partialUpdateTodo, Todo } from '@/lib/services/todoService';
import React, { useState } from 'react';
import ItemEditModal from './ItemEditModal';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TodoItem = ({ todoObject }: { todoObject: Todo }) => {
    const [currentTodo, setCurrentTodo] = useState(todoObject);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Todo>({ ...todoObject })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleToggleTodo = async (id: number, completed: boolean) => {
        // Toggle TodoCompletion and Update State Accordingly
        await partialUpdateTodo(id, { completed: !completed });
        setCurrentTodo({ ...currentTodo, completed: !completed });
    };

    const handleDeleteCurrentTodo = async (id: number, e: React.MouseEvent) => {
        // Prevent Default and Stop Propagation to prevent navigation on button click
        e.preventDefault();
        e.stopPropagation();

        // Delete TodoItem and Update State Accordingly
        await deleteTodo(id);
        setIsDeleted(true);
    };

    const handleEditCurrentTodo = async (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsEditing(true);
    }

    const handleExpandTodo = () => {
        setIsExpanded(!isExpanded);
    }

    if (isDeleted) {
        return null;
    }

    return (
        <>
            <button className="flex flex-col p-3 border rounded-md bg-gray-50 relative w-full" onClick={handleExpandTodo}>
                <div className='flex items-center justify-between w-full'>
                    <div className="flex items-center">
                        {/* Toggle Button */}
                        <input
                            type="checkbox"
                            checked={currentTodo.completed}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => handleToggleTodo(currentTodo.id, currentTodo.completed)}
                            className="mr-2 relative z-10 cursor-pointer"
                        />
                        <span className={`flex gap-1 ${currentTodo.completed ? "line-through text-gray-500" : ""}`}>
                            <div>
                                {currentTodo.title}
                            </div>
                            <div className='flex items-center justify-center'>
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </span>
                    </div>
                    {/* Delete Button */}
                    <input type="button"
                        onClick={(e) => handleDeleteCurrentTodo(currentTodo.id, e)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        value={'❌'}
                    />
                </div>
                <div className={`overflow-hidden w-full ${isExpanded ? 'max-h-20 mt-2' : 'max-h-0 mt-0'} flex justify-between items-start transition-[max-height_margin-top] duration-300 ease-in-out max-w-full`}>
                    <div className="flex-grow text-start break-words whitespace-normal max-w-[90%]">
                        {currentTodo.description}
                    </div>
                    <input type='button' onClick={(e) => handleEditCurrentTodo(currentTodo.id, e)} className="text-blue-500 hover:text-blue-700 cursor-pointer" value={isEditing ? '' : '✏️'} />
                </div>
            </button>
            <ItemEditModal todoItem={currentTodo} formData={formData} isEditing={isEditing} setCurrentTodo={setCurrentTodo} setIsEditing={setIsEditing} handleFormChange={handleFormChange} setFormData={setFormData} />
        </>
    );
};

export default TodoItem;
