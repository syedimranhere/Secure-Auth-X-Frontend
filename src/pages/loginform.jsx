import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import API from "../../utils/axiosInstance";
import { UseUserContext } from "../context/UserContext";
import { useAuth } from "../hooks/useAuth.js";

export default function Login() {
    const [disableLogin, setDisableLogin] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser, setIsAuthenticated } = UseUserContext();

    // Redirect if already authenticated
    useAuth(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const data = JSON.parse(localStorage.getItem("blockedInfo") || "{}");
            if (!data?.unlockTime) return;

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
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !pass) {
            setError("Both fields are required");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await API.post("/user/login", {
                EmailorUsername: email,
                Password: pass,
            });

            if (response?.data?.success) {
                const userData = {
                    email: response.data.email,
                    username: response.data.username,
                    fullname: response.data.fullname,
                };

                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/dashboard");
            }
        } catch (error) {
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
            <div className="absolute inset-0">
                <img
                    src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"
                    alt="Login Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            </div>

            <div className="relative z-10">
                <nav className="flex justify-between items-center px-8 py-6">
                    <Link to="/" className="text-2xl font-bold tracking-wider group">
                        <span className="text-white">Secure</span>
                        <span className="text-[#00FFD1] group-hover:text-white transition-colors">A</span>
                        <span className="text-white">uth</span>
                        <span className="text-[#0773df] group-hover:text-[#00FFD1] transition-colors">X</span>
                    </Link>

                    <div className="flex gap-6 text-sm font-medium">
                        <Link to="/" className="text-gray-300 hover:text-[#00FFD1] transition-colors">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-300 hover:text-[#00FFD1] transition-colors">
                            About
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-[90%] max-w-md hover:bg-white/15 transition-all duration-300">
                        <div className="text-center mb-8">
                            <div className="bg-[#00FFD1]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogIn className="w-8 h-8 text-[#00FFD1]" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-gray-400">Sign in to your account</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email or Username</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent placeholder:text-gray-400 transition-all"
                                    placeholder="Enter your email or username"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent placeholder:text-gray-400 transition-all"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00FFD1] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-right">
                                <Link
                                    to="/forgotpassword"
                                    className="text-sm text-[#00FFD1] hover:text-white transition-colors hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                                    <p className="text-sm text-red-300 text-center">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={disableLogin || loading}
                                className={`w-full py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${disableLogin || loading
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-[#00FFD1] to-[#0773df] text-black hover:from-[#00FFD1]/90 hover:to-[#0773df]/90 hover:shadow-lg hover:shadow-[#00FFD1]/25"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Signing in...
                                    </>
                                ) : disableLogin ? (
                                    "Please wait..."
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-[#00FFD1] hover:text-white transition-colors font-medium hover:underline"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}