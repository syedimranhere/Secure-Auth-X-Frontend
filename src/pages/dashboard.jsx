// Dashboard.jsx
import { LogOut } from 'lucide-react';
import { UseUserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export const Dashboard = () => {
    const navigate = useNavigate();
    const { user, loading } = UseUserContext();

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-black">
                <div className="text-white text-3xl font-semibold tracking-wide">
                    Loading Dashboard...
                </div>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-black">
                <div className="text-center text-white">
                    <p className="mb-4">Unable to load user data</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const handleME = () => {
        navigate("/myprofile")
    }

    const onLogout = async () => {
        try {
            await axios.post("/api/v1/user/logout");
        } catch (error) {
            console.error("Logout failed:", error?.response?.data || error.message);
        } finally {
            navigate("/login", { replace: true });
        }
    }

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">

            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/anotherbg.jpg"
                    alt="Dashboard Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            </div>

            {/* Main Content Overlay */}
            <div className="relative z-10 min-h-screen flex flex-col justify-between">
                {/* Header */}
                <header className="flex justify-between items-center px-8 py-4 bg-transparent border-b border-gray-800">
                    <div className="flex items-center space-x-6">
                        <div className="text-2xl font-bold tracking-wider">
                            <span className="text-white">Secure</span>
                            <span className="text-[#00FFD1]">A</span>
                            <span className="text-white">uth</span>
                            <span className="text-[#0773df]">X</span>
                        </div>
                        <div className="text-white text-lg font-medium">
                            Good To See You Again, {user?.username}
                        </div>
                    </div>

                    {/* Button Group */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleME}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>My Profile</span>
                        </button>
                        <button
                            onClick={onLogout}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>
                {/* Main Content */}
                <main className="p-6 md:p-10 text-white flex-grow font-sans">
                    <div className="max-w-3xl mx-auto space-y-6">

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            This page is intentionally kept minimal to emphasize the core objective — building a <strong className="text-white font-semibold">secure and reliable authentication system</strong> that reflects real-world standards.
                        </p>

                        <div className="bg-white/5 border border-cyan-700 rounded-xl p-5 md:p-6 shadow-lg backdrop-blur-sm space-y-3">
                            <p className="text-gray-100 text-sm md:text-base leading-relaxed">
                                Try registering a new account, test the login flow, and explore key features like
                                <strong className="text-cyan-300 font-medium"> OTP verification via "Forgot Password"</strong>.
                            </p>

                            <p className="text-gray-100 text-sm md:text-base leading-relaxed">
                                🔐 <strong className="text-cyan-300 font-medium">Session hijacking prevention</strong> is built-in: even if a token is intercepted,
                                it becomes unusable on another browser or device.
                            </p>

                            <p className="text-gray-100 text-sm md:text-base leading-relaxed">
                                <strong className="text-cyan-300 font-medium">Refresh tokens auto-rotate every 5 minutes via interceptors</strong>,
                                so even advanced interceptors can't reuse or replay them. Every session is isolated and short-lived by design.
                            </p>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
};