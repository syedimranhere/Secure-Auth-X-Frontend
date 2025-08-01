import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">

      {/* Top Right About Button */}
      <div className="absolute top-4 right-4 z-50">
        <motion.a
          href="/about"
          whileHover={{ scale: 1.08 }}
          className="px-5 py-1.5 text-sm rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-900 text-white font-semibold shadow-md shadow-cyan-700/30 hover:shadow-gray-700/90 transition-all"
        >
          About
        </motion.a>
      </div>

      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/bg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 text-center space-y-4">

        {/* Logo */}
        <motion.img
          src="/assets/real-bg.png"
          alt="SecureAuthX Logo"
          className="h-36 md:h-44 lg:h-52 mb-2"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/" className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-white">Secure</span>
            <span className="text-[#00FFD1]">A</span>
            <span className="text-white">uth</span>
            <span className="text-[#0773df]">X</span>
          </Link>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-[#e4e4e7] text-base md:text-xl font-medium tracking-tight drop-shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Scalable. Secure. Engineered for impact.
        </motion.p>

        {/* Subtext */}
        <motion.p
          className="text-gray-300 text-sm md:text-lg font-normal tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Create an account or log in to get started.
        </motion.p>

        {/* Auth Buttons */}
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-3"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.07 }}
            className="px-5 py-1.5 text-sm rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-900 text-white font-semibold shadow-md hover:shadow-cyan-400/60 transition-all"
          >
            Login
          </motion.a>

          <motion.a
            href="/register"
            whileHover={{ scale: 1.07 }}
            className="px-5 py-1.5 text-sm rounded-lg border border-cyan-400 text-cyan-300 font-semibold hover:bg-cyan-400 hover:text-black hover:shadow-md transition-all"
          >
            Register
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
