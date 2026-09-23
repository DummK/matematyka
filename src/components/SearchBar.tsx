import { useEffect, useState } from "react";

import SearchPalette from "./SearchPalette";

function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.ctrlKey && event.key.toLowerCase() === "k") {
                event.preventDefault();
                setIsOpen(true);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="search">
            <button
                className="search-trigger"
                onClick={() => setIsOpen(true)}
                type="button"
            >
                <span className="search-trigger-label">
                    Szukaj notatki...
                </span>

                <span className="search-trigger-shortcut">
                    Ctrl K
                </span>
            </button>

            <SearchPalette
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
}

export default SearchBar;