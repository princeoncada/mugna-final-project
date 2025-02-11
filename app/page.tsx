import Dashboard from "@/components/Dashboard";

export default function HomePage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <Dashboard />
            </div>
        </div>
    );
}
