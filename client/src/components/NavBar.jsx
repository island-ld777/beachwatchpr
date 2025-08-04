import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav className="navbar fixed relative top-0 flex justify-between mb-3">
            <h1 className="text-3xl font-bold underline ml-3">BeachWatchPR</h1>
            <div className="navbar-btns flex justify-between mt-3">
            <Link to="/admin" className="mr-3">
                <button>Sign In</button>
            </Link>
            <Link to="/" className="mr-3">
                <button>Sign Out</button>
            </Link>
            </div>
        </nav>
    );
}