import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

                <div className="flex flex-col items-center">
                    <h1 className="text-blue-600 text-4xl font-bold">MUGNA</h1>
                    <p className="text-gray-600 text-center mt-2">
                        Where your todos are managed.
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}
