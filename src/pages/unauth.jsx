
import { Shield, ArrowLeft, Lock } from "lucide-react";

export default function UnauthorizedPage() {
    const handleGoBack = () => {
        window.history.back();
    };

    const handleLogin = () => {
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Animated icon */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Shield className="w-12 h-12 text-red-400" />
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                        <Lock className="w-6 h-6 text-red-300 animate-bounce" />
                    </div>
                </div>

                {/* Error code */}
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-red-400 mb-2">401</h1>
                    <h2 className="text-2xl font-semibold text-gray-200 mb-2">Unauthorized Access</h2>
                    <p className="text-gray-400 leading-relaxed">
                        You don't have permission to access this page because you are not authorized. Please log in to continue.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-4">
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Sign In
                    </button>


                </div>

                {/* Additional info */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                    <p className="text-sm text-gray-500">
                        Error Code: AUTH_REQUIRED_001
                    </p>
                    <p className="text-s text-gray-600 mt-2">
                        If you believe this is an error, please contact
                    </p>
                    <a href="mailto:imransyedhere@gmail.com" className="text-blue-500 hover:underline">imransyedhere@gmail.com</a>
                </div>
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}