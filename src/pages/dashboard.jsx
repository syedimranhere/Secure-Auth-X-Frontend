import React, { useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { UseUserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const verifyAccess = async () => {
            try {
                const x = await axios.post('/api/v1/user/get-access');
                console.log(x.data)

                // You can optionally set user state here
            } catch (err) {
                navigate('/unauthorized'); // Redirect if check fails
                console.log("No Joke")
            }
        };
        verifyAccess();
    }, [navigate]);
    const handleME = () => {
        navigate("/myprofile")
    }
    const { user } = UseUserContext();

    const onLogout = async () => {
        // Handle logout: Clear tokens, context, etc.
        try {
            1
            const resp = await axios.post("api/v1/user/logout")

            console.log("Req made mate")
            navigate("/login")
        } catch (error) {
            console.log("Error in logout")
        }
    };
    const goToAbout = () => {
        navigate('/about');
    };

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* 🖼️ Background Image with Blur */}
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
                        <div className="t`ext-2xl font-bold tracking-wider">
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
                            <span>Profile</span>
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
                <main className="p-8 text-white flex-grow">
                    <p className="text-gray-300 mb-4">
                        This page is kept simple on purpose, as the main focus of this project was to demonstrate a secure and reliable authentication system.
                    </p>
                    <p className="text-gray-100">
                        Try registering a new account, testing the login process, and explore features like <strong>OTP verification via "Forgot Password"</strong>.
                    </p>
                </main>

                {/* Bottom About Button */}
                <div className="w-full flex justify-center mb-2">
                    <button
                        onClick={goToAbout}
                        className="px-2 py-2 bg-gray-600 hover:bg-blue-300 text-white rounded-xl transition-all duration-200"
                    >
                        About
                    </button>
                </div>
            </div>
        </div>
    );
};
