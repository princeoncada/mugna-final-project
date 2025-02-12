import TodosList from "@/components/TodosList";
import Link from "next/link";

export const runtime = "edge";

export default async function TodosPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 gap-3">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <TodosList />
            </div>
            <Link className="w-full max-w-2xl rounded-lg shadow-md bg-blue-600" href="/">
                <div className="p-6 py-3 text-center text-white">
                    Go back to Home
                </div>
            </Link>
        </div>
    );
}
