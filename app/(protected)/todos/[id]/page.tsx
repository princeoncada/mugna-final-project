import TodoDetails from "@/components/TodoDetails";

export default async function TodoDetailPage({ params }: { params: { id: string } }) {
    
    const id = (await params).id;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <TodoDetails id={id} />
            </div>
        </div>
    );
}
