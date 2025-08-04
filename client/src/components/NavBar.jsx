import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <div className="navbar">
            <Link to="/admin">
                <button>Sign In</button>
            </Link>
            <Link to="/">
                <button>Sign Out</button>
            </Link>
        </div>
    );
}