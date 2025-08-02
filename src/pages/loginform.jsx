import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
    const [disableLogin, setDisableLogin] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const { setUser } = UseUserContext();
    // Handle rate limiting and unlock logic
    useEffect(() => {
        const checkRateLimit = () => {
            const data = JSON.parse(localStorage.getItem("blockedInfo") || "{}");
            if (!data?.unlockTime) {
                setDisableLogin(false);
                setError("");
                return;
            }
            const unlockTime = Number(data.unlockTime);
            const now = Date.now();

            if (now >= unlockTime) {
                localStorage.removeItem("blockedInfo");
                setDisableLogin(false);
                setError("");
            } else {
                const secondsLeft = Math.ceil((unlockTime - now) / 1000);
                setError(`Too many login attempts. Try again in ${secondsLeft}s`);
                setDisableLogin(true);
            }
        };

        // Check immediately
        checkRateLimit();

        // Then check every second
        const interval = setInterval(checkRateLimit, 1000);
        return () => clearInterval(interval);
    }, []);
    const handleLogin = async () => {
        if (!email || !pass) {
            setError("Both fields are required");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`, {
                EmailorUsername: email,
                Password: pass,
            });

            if (response?.data?.success && response?.data?.user) {
                console.log('Login successful:', response.data.user);
                // setUser(response.data.user);
                navigate("/dashboard");

            }
        } catch (error) {
            console.error('Login error:', error);
            const status = error?.response?.status;

            if (status === 429) {
                setError("Too many login attempts. Try again after a minute.");
                setDisableLogin(true);
                const data = {
                    status: "blocked",
                    unlockTime: Date.now() + 60000
                };
                localStorage.setItem("blockedInfo", JSON.stringify(data));
            } else {
                setError(error?.response?.data?.message || "Login failed. Please check your credentials.");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="relative min-h-screen w-full bg-black">
            {/* Blurred Background */}
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

                {/* Login Form */}
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="bg-white/5 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[90%] max-w-md">
                        <h2 className="text-2xl text-white font-semibold text-center mb-6">
                            Login to your account
                        </h2>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Email Or Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFD1] placeholder:text-gray-300"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    className="w-full px-4 py-2 pr-10 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFD1] placeholder:text-gray-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-[#00FFD1] text-sm"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            <div className="text-right text-sm">
                                <Link to="/forgotpassword" className="text-[#00FFD1] hover:underline hover:text-white">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={disableLogin || loading}
                                className={`w-full py-2 font-semibold rounded-md transition-all ${disableLogin
                                    ? "bg-[#00FFD1]/30 text-black cursor-not-allowed"
                                    : loading
                                        ? "bg-[#00FFD1]/50 text-black cursor-not-allowed"
                                        : "bg-[#00FFD1] text-black hover:bg-white"
                                    }`}
                            >
                                {loading ? "Logging in..." : disableLogin ? "Please wait..." : "Login"}
                            </button>

                            {error && (
                                <div className="text-sm text-red-500 font-medium text-center animate-fade-shake mt-2">
                                    {error}
                                </div>
                            )}
                        </form>

                        <p className="mt-6 text-sm text-gray-300 text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#00FFD1] hover:underline hover:text-white"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}