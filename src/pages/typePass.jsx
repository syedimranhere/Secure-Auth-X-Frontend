import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const isValidPassword = (password) => {
        const bannedPasswords = ["123456", "password", "qwerty", "123456789", "111111", "abc123", "123123"];
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const isLengthValid = password.length >= 8;
        return isLengthValid && hasUpper && hasLower && hasDigit && !bannedPasswords.includes(password.toLowerCase());
    };

    const navigate = useNavigate();

    const handleReset = async () => {
        if (password !== confirm) {
            setMessage("Passwords do not match!");
            return;
        }
        if (!isValidPassword(confirm)) {
            setMessage("Password must have 1 upper, 1 lower case letter, 1 digit and minimum 8 characters.");
            return;
        }

        try {
            setLoading(true);
            setMessage("Resetting Password...");
            const resp = await axios.post("/api/v1/user/reset-password", { password: confirm });
            if (resp?.data?.success) {
                setMessage("Reset Successful | Redirecting");
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setMessage("Password reset failed | Try Again");
            }
        } catch (error) {
            setMessage("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-black">
            {/* Background */}
            <div className="absolute inset-0">
                <img src="/assets/bg.png" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            </div>

            <div className="relative z-10">
                {/* Navbar */}
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

                {/* Form */}
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="bg-white/5 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[90%] max-w-md">
                        <h2 className="text-2xl text-white font-semibold text-center mb-6">Set New Password</h2>

                        {/* Password Field */}
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFD1] placeholder:text-gray-300 pr-10"
                            />
                            <span
                                className="absolute right-3 top-3 text-white cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Confirm Field */}
                        <div className="relative mb-4">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFD1] placeholder:text-gray-300 pr-10"
                            />
                            <span
                                className="absolute right-3 top-3 text-white cursor-pointer"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button
                            onClick={handleReset}
                            disabled={loading}
                            className={`w-full py-2 font-semibold rounded-md transition ${loading
                                ? "bg-[#00FFD1]/50 text-black cursor-not-allowed"
                                : "bg-[#00FFD1] hover:bg-white text-black"
                                }`}
                        >
                            {loading ? "Processing..." : "Reset Password"}
                        </button>

                        {message && (
                            <p className="text-sm text-red-500 text-center mt-4">{message}</p>
                        )}

                        <p className="mt-6 text-sm text-gray-300 text-center">
                            Back to{" "}
                            <Link to="/login" className="text-[#00FFD1] hover:underline hover:text-white">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
