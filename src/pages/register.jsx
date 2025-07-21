import React, { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        if (!fullname || !email || !username || !password) {
            setError("All fields are required");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        const data = {
            Fullname: fullname,
            Email: email,
            Username: username,
            Password: password,
        };

        try {
            const response = await axios.post("api/v1/user/register", data);
            console.log("Registration successful:", response.data);

            setSuccessMessage("Account created! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Registration failed");
            } else if (error.request) {
                setError("Network error. Please check your connection.");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-black">
            <div className="absolute inset-0">
                <img src="/assets/bg.png" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            </div>

            <div className="relative z-10">
                <nav className="flex justify-between items-center px-8 py-4 bg-transparent">
                    <Link to="/" className="text-white text-2xl font-bold tracking-wider">
                        <span className="text-white">Secure</span>
                        <span className="text-[#00FFD1]">A</span>
                        <span className="text-white">uth</span>
                        <span className="text-[#0773df]">X</span>
                    </Link>
                    <div className="flex gap-6 text-white text-sm font-medium">
                        <Link to="/" className="hover:text-[#00FFD1] transition">Home</Link>
                        <Link to="/about" className="hover:text-[#00FFD1] transition">About</Link>
                    </div>
                </nav>

                <div className="flex items-center justify-center min-h-[80vh]">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/5 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[90%] max-w-md space-y-6"
                    >
                        <h2 className="text-3xl text-white font-semibold text-center mb-2">
                            Create Account
                        </h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full px-4 py-2 bg-white/10 text-white rounded-md placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-white/10 text-white rounded-md placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-white/10 text-white rounded-md placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
                            required
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-12 bg-white/10 text-white rounded-md placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#00FFD1] transition"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.115 8.115m1.763 1.763L19.5 19.5" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#00FFD1] hover:bg-white text-black font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating Account..." : "Register"}
                        </button>

                        {error && (
                            <p className="text-red-500 text-sm font-medium text-center -mt-3">
                                {error}
                            </p>
                        )}

                        {successMessage && (
                            <p className="text-green-400 text-sm font-medium text-center -mt-3">
                                {successMessage}
                            </p>
                        )}

                        <p className="text-sm text-gray-300 text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#00FFD1] hover:underline hover:text-white">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
