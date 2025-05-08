import { Link } from "react-router-dom";

export default function Header() {
    return(
        <div className="p-[10px] w-full h-[40px] bg-amber-200 flex gap-7">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </div>
    )
}