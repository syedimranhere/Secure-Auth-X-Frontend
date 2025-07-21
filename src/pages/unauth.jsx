/**
 * Unauthorized Access Page
 * ------------------------
 * - Centers content vertically & horizontally
 * - Uses lucide-react for a crisp icon (install with `npm i lucide-react`)
 * - Gradient text + CTA button for better UX
 * - Full Tailwind styling and clear comments for future maintenance
 */

import React from "react";
import { Link } from "react-router-dom";
import { ShieldOff } from "lucide-react"; // Icon library

export default function Unauth() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-6">
            {/* Icon */}
            <ShieldOff className="w-20 h-20 text-red-500 mb-6" />

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-yellow-400 to-red-500">
                Unauthorized&nbsp;Access
            </h1>

            {/* Sub‑text */}
            <p className="text-lg md:text-xl text-center max-w-md mb-8">
                You cannot access this page without logging. If you don't have an account, create one.
            </p>

            {/* CTA Button */}
            <Link
                to="/"
                className="px-6 py-3 rounded-full bg-orange-600 hover:bg-red-700 active:bg-red-800 transition-colors duration-200 font-semibold"
            >
                Take&nbsp;Me&nbsp;Home
            </Link>

            {/* Decorative image (optional) */}

        </main>
    );
}
