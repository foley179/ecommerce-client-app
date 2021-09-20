import { Link } from "react-router-dom";

export default function Complete() {
    return (
        <div className="block col-2 text-center">
            <h2>Something went wrong</h2>
            <h2>Please try again</h2>
            <Link to="/" >Home</Link>
        </div>
    )
}
