import { Link } from "react-router-dom";
import { useState } from "react";

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="relative flex flex-col md:flex-row md:items-center md:justify-between mb-3 px-3 py-2">
            <div className="flex items-center justify-between w-full md:w-auto">
                <h1 className="flex-1 text-3xl font-bold underline text-center md:text-left mx-auto md:mx-0 text-sky-400">
                    BeachWatchPR
                </h1>
                <button
                    className="md:hidden p-2 ml-2"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>
            {/* Mobile menu: links under header */}
            <div
                className={`flex-col items-center mt-2 space-y-2 md:space-y-0 md:mt-0 md:flex md:flex-row md:items-center md:space-x-3 ${
                    menuOpen ? "flex" : "hidden"
                } md:flex md:ml-auto`}
            >
                <Link to="/admin" className="w-full md:w-auto">
                    <button className="w-full md:w-auto">Sign In</button>
                </Link>
                <Link to="/" className="w-full md:w-auto">
                    <button className="w-full md:w-auto">Sign Out</button>
                </Link>
            </div>
        </nav>
    );
}