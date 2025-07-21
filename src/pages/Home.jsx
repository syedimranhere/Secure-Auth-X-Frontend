import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      {/* 🔗 Top-Right About Button */}
      <div className="absolute top-6 right-6 z-50">

        <motion.a
          href="/about"
          whileHover={{ scale: 1.1 }}
          className="px-6 py-2 text-base rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-900 text-white font-semibold shadow-lg shadow-cyan-700/30 hover:shadow-gray-700/100 "
        >
          About
        </motion.a>



      </div>

      <div className="absolute inset-0">
        <img
          src="/assets/bg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.img
          src="/assets/mylogo.svg"
          alt="SecureAuthX Logo"
          className="mx-auto h-70 mb-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.p
          className="text-[#e4e4e7] text-2xl md:text-3xl font-semibold tracking-tight mt-4 mb-6 drop-shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Scalable. Secure. Engineered for impact.
        </motion.p>

        <motion.div
          className="mt-6 flex justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.1 }}
            className="px-6 py-2 text-base rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-900 text-white font-semibold shadow-lg shadow-gray-500/30 hover:shadow-cyan-400/60 transition duration-300"
          >
            Login
          </motion.a>

          <motion.a
            href="/register"
            whileHover={{ scale: 1.1 }}
            className="px-6 py-2 text-base rounded-xl border-2 border-cyan-400 text-cyan-300 font-semibold hover:bg-cyan-400 hover:text-black hover:shadow-md transition duration-300"
          >
            Register
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
