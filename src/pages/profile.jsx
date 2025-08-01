// profile.jsx
import { User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UseUserContext } from '../context/UserContext';
import { useEffect } from 'react'; // FIXED: Added missing import

export default function Profile() {
    const { user, loading, isAuthenticated } = UseUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [loading, isAuthenticated, navigate]); // FIXED: Added navigate to dependency array

    const HandleMe = () => {
        navigate("/dashboard")
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading your profile...
            </div>
        );
    }

    // FIXED: Added check for user data
    if (!user) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="mb-4">Unable to load profile data</p>
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

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/anotherbg.jpg"
                    alt="Profile Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            </div>

            {/* Main Content Overlay */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center px-8 py-4 bg-transparent border-b border-gray-800">
                    <div className="flex items-center space-x-6">
                        <div className="text-2xl font-bold tracking-wider">
                            <span className="text-white">Secure</span>
                            <span className="text-[#00FFD1]">A</span>
                            <span className="text-white">uth</span>
                            <span className="text-[#0773df]">X</span>
                        </div>
                    </div>

                    <button
                        onClick={HandleMe}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Dashboard</span>
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center p-4">
                    {/* Glass container */}
                    <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-8 text-white">

                        {/* Profile Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-gray-900 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
                                <User className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-8 text-center">Your Profile</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg text-lg border border-white/20">
                                    {user.username}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg text-lg border border-white/20">
                                    {user.fullname}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg text-lg border border-white/20">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}