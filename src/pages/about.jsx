import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";


export default function About() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden text-white font-sans">
            {/* 🖼️ Background */}
            <div className="absolute inset-0">
                <img
                    src="/assets/bg2.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            </div>

            {/* 🧭 Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-transparent z-50 relative">
                <Link to="/" className="text-white text-2xl font-bold tracking-wider">
                    <span className="text-white">Secure</span>
                    <span className="text-[#00FFD1]">A</span>
                    <span className="text-white">uth</span>
                    <span className="text-[#0773df]">X</span>
                </Link>
                <div className="flex gap-6 text-white text-sm font-medium">
                    <Link to="/" className="hover:text-[#00FFD1] transition">Home</Link>
                    <Link to="/login" className="hover:text-[#00FFD1] transition">Login</Link>
                </div>
            </nav>

            {/* 📄 Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
                {/* 🧠 Image */}
                {/* 🧠 Image & Name */}
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }} W
                    transition={{ duration: 1 }}
                >
                    <div className="relative w-30 h-30 md:w-40 md:h-40 lg:w-45lg:h-45 rounded-full border border-gray-300/30 bg-white/5 shadow-lg overflow-hidden">
                        <img
                            src="/assets/imran.png"
                            alt="Developer"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <h1 className="mt-4 text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow-sm">
                        Syed Imran
                    </h1>
                </motion.div>


                {/* 🧾 Bio */}
                <motion.div
                    className="mt-6 max-w-xl text-[#e4e4e7] text-sm md:text-base leading-relaxed font-normal"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <p>
                        I’m a self-taught developer currently focused on mastering full-stack
                        technologies. This project — <strong>SecureAuthX</strong> — is a learning-based
                        authentication system built using React, TailwindCSS, Node.js, and Express.
                    </p>
                    <p className="mt-3 text-gray-300 italic font-medium">
                        SecureAuthX: Authentication system coded from ground up.


                    </p>
                </motion.div>

                {/* 🌐 Social Icons */}
                <motion.div
                    className="mt-6 flex gap-6 text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <a
                        href="https://github.com/syedimranhere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#294453] transition hover:scale-110"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=imransyedhere@gmail.com&su=Let%27s%20Connect&body=Hey%20Imran,%20I%20checked%20out%20SecureAuthX!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#ff6464] transition hover:scale-110"
                    >
                        <FaEnvelope />
                    </a>



                    <a
                        href="https://www.linkedin.com/in/syed-imran-111538372/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#466fa5] transition hover:scale-110"
                    >
                        <FaLinkedin />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
