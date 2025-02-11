import { Todo, updateTodo } from '@/lib/services/todoService'
import { Button, Description, Dialog, DialogBackdrop, DialogPanel, Field, Input } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

interface ItemEditModalProps {
    todoItem: Todo,
    formData: Todo,
    isEditing: boolean,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    setFormData: React.Dispatch<React.SetStateAction<Todo>>,
    setCurrentTodo: React.Dispatch<React.SetStateAction<Todo>>,
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const ItemEditModal = ({ todoItem, formData, isEditing, setIsEditing, setFormData, setCurrentTodo, handleFormChange }: ItemEditModalProps) => {
    const handleSaveFormData = async () => {
        if (!todoItem) return;

        const newTodo = { ...todoItem, ...formData };
        const data = await updateTodo(todoItem.id, newTodo);
        setCurrentTodo({ ...data});
        setFormData({ ...data })
        setIsEditing(false);
    }

    return (
        <>
            {formData && <Dialog open={isEditing} as="div" className="relative z-10 focus:outline-none" onClose={() => { setIsEditing(false) }}>
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <div className="space-y-4">
                                <Field>
                                    <Description className="mb-[-8px]">Title</Description>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleFormChange}
                                        className={clsx(
                                            'mt-3 block w-full rounded-md border-none py-1.5 px-3 text-sm/6 bg-gray-200',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/20'
                                        )}
                                    />
                                </Field>
                                <Field>
                                    <Description className="mb-[-8px]">Description</Description>
                                    <textarea
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        className={clsx(
                                            'mt-3 block w-full rounded-md border-none py-1.5 px-3 text-sm/6 bg-gray-200',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/20'
                                        )} name="description"></textarea>
                                </Field>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <Button
                                    className="flex-grow items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={() => {
                                        setIsEditing(false)
                                        handleSaveFormData()
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="flex-grow items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={() => {
                                        setIsEditing(false)
                                        setFormData({ ...todoItem })
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>}
        </>
    )
}

export default ItemEditModal