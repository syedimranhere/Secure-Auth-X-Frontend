import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPass1() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpform, setOtpForm] = useState(false);



    const [otp, setOtp] = useState("");
    const [send, setsend] = useState(false);

    const navigate = useNavigate();
    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage("Please enter your email.");
            return;
        }

        setLoading(true);
        setMessage("");
        try {
            const response = await axios.post("/api/v1/user/send-otp", { email });
            if (response?.data?.success) {
                setMessage("OTP has been sent to your email.");
                setOtpForm(true);
                setsend(true);
            } else {
                setMessage("Failed to send OTP. Try again.");
                setOtpForm(false);
            }
        } catch (err) {
            setMessage("Enter valid email & try again.");
            setOtpForm(false);


        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!email) return;
        setMessage("Resending OTP...");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/send-otp`, { email });
            if (response?.data?.success) {
                setMessage("OTP resent successfully.");
                setOtpForm(true);
            } else {
                setMessage("Failed to resend OTP.");
            }
        } catch {
            setMessage("Resend failed. Check your email.");
        }
    };
    const handleOTP = async () => {
        setMessage(""); // Clear previous messages
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/verifyotp`, { otp });

            if (response?.data?.success) {
                navigate("/resetpassword");
            } else {
                setMessage("Invalid OTP. Try again.");
            }
        } catch (err) {
            console.error("OTP error:", err?.response || err);
            // Check if backend sends a useful message

            setMessage("Invalid OTP | Try Again");
        }
    };


    return (
        <div className="relative min-h-screen w-full bg-black">
            {/* Background Blur Layer */}
            <div className="absolute inset-0">
                <img
                    src="/assets/bg.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            </div>

            {/* Foreground Content */}
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

                {/* Form Card */}
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="bg-white/5 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[90%] max-w-md">
                        <h2 className="text-2xl text-white font-semibold text-center mb-6">
                            Forgot Password
                        </h2>

                        {/* Email Form */}
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFD1] placeholder:text-gray-300"
                            />

                            <button
                                type="submit"
                                disabled={send}
                                className={`w-full py-2 font-semibold rounded-md transition-all ${loading
                                    ? "bg-[#00FFD1]/50 text-black cursor-not-allowed"
                                    : "bg-[#00FFD1] hover:bg-white text-black"
                                    }`}
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        </form>

                        {/* OTP Input */}
                        <div
                            className={`mt-6 transition-all duration-300 ${otpform ? "opacity-100" : "opacity-40 pointer-events-none"
                                }`}
                        >
                            <input
                                type="text"
                                maxLength="4"
                                placeholder="Enter 4-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFD1] placeholder:text-gray-300"
                            />

                            {/* Submit OTP */}
                            <button
                                type="button"
                                onClick={handleOTP}
                                disabled={otp.length !== 4}
                                className={`mt-4 w-full py-2 font-semibold rounded-md transition-all ${otp.length !== 4
                                    ? "bg-[#00FFD1]/40 text-black cursor-not-allowed"
                                    : "bg-[#00FFD1] hover:bg-white text-black"
                                    }`}
                            >
                                Submit OTP
                            </button>

                            {/* Resend OTP */}
                            <button
                                onClick={handleResendOtp}
                                type="button"
                                className="mt-3 text-sm text-[#00FFD1] hover:underline"
                            >
                                Resend OTP
                            </button>
                        </div>

                        {/* Message */}
                        {message && (
                            <p className="text-sm text-red-700 text-center mt-4 animate-fade-shake">
                                {message}
                            </p>
                        )}

                        {/* Back to login */}
                        <p className="mt-6 text-sm text-gray-300 text-center">
                            Remembered password?{" "}
                            <Link
                                to="/login"
                                className="text-[#00FFD1] hover:underline hover:text-white"
                            >
                                Back to login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
