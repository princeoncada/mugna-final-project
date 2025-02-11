import TodosList from "@/components/TodosList";


export default async function TodosPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <TodosList />
            </div>
        </div>
    );
}
