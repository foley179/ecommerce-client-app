import { Link } from "react-router-dom";

export default function Complete() {
    return (
        <div className="block col-2 text-center">
            <h2>Your purchase is complete</h2>
            <h2>Check your emails</h2>
            <Link to="/" >Home</Link>
        </div>
    )
}
