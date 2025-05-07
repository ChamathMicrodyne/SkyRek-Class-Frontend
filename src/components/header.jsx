import { Link } from "react-router-dom";

export default function Header() {
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </div>
    )
}