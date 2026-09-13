import {Link} from "react-router";
import SearchBar from "./SearchBar.tsx";

function Header() {
    return (
        <header className="site-header">
            <div className="container header-content">
                <Link to="/" className="site-logo">
                    Matematyka
                </Link>

                <SearchBar />
            </div>
        </header>
    )
}

export default Header