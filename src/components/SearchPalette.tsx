import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import { categories } from "../data/Categories";
import { notes } from "../data/Notes";
import { searchNotes } from "../utils/search";

type SearchPaletteProps = {
    isOpen: boolean;
    onClose: () => void;
};

function SearchPalette(props: SearchPaletteProps) {
    const { isOpen, onClose } = props;

    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const searchResults = searchNotes(query, notes);

    function closePalette() {
        setQuery("");
        setActiveIndex(0);
        onClose();
    }

    useEffect(() => {
        const container = resultsRef.current;

        if (!container) {
            return;
        }

        const activeElement = container.querySelector(
            ".search-result.active"
        );

        activeElement?.scrollIntoView({
            block: "nearest"
        });
    }, [activeIndex]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setQuery("");
                setActiveIndex(0);
                onClose();
                return;
            }

            if (event.key === "ArrowDown") {
                if (searchResults.length === 0) {
                    return;
                }

                event.preventDefault();

                setActiveIndex((currentIndex) => {
                    return Math.min(
                        currentIndex + 1,
                        searchResults.length - 1
                    );
                });

                return;
            }

            if (event.key === "ArrowUp") {
                if (searchResults.length === 0) {
                    return;
                }

                event.preventDefault();

                setActiveIndex((currentIndex) => {
                    return Math.max(currentIndex - 1, 0);
                });

                return;
            }

            if (event.key === "Enter") {
                if (searchResults.length === 0) {
                    return;
                }

                const activeResult = searchResults[activeIndex];

                if (!activeResult) {
                    return;
                }

                event.preventDefault();

                navigate(
                    `/category/${activeResult.note.categorySlug}/${activeResult.note.slug}`
                );

                setQuery("");
                setActiveIndex(0);
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose, searchResults, activeIndex, navigate]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="search-overlay"
            onClick={closePalette}
        >
            <div
                className="search-palette"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <div className="search-palette-header">
                    <input
                        ref={inputRef}
                        className="search-input"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActiveIndex(0);
                        }}
                        placeholder="Szukaj notatki..."
                    />
                </div>

                <div className="search-palette-body">
                    {
                        query ? (
                            searchResults.length > 0 ? (
                                <div className="search-results" ref={resultsRef}>
                                    {
                                        searchResults.map((result, index) => {
                                            const category = categories.find((category) => {
                                                return category.slug === result.note.categorySlug;
                                            });

                                            return (
                                                <Link
                                                    key={result.note.id}
                                                    to={`/category/${result.note.categorySlug}/${result.note.slug}`}
                                                    className={
                                                        index === activeIndex
                                                            ? "search-result active"
                                                            : "search-result"
                                                    }
                                                    onClick={closePalette}
                                                    onMouseEnter={() => {
                                                        setActiveIndex(index);
                                                    }}
                                                >
                                                    <div className="search-result-content">
                                                        <span className="search-result-title">
                                                            {result.note.title}
                                                        </span>

                                                        <span className="search-result-category">
                                                            {category?.title}
                                                        </span>
                                                    </div>

                                                    <span className="search-result-arrow">
                                                        →
                                                    </span>
                                                </Link>
                                            );
                                        })
                                    }
                                </div>
                            ) : (
                                <p className="search-empty">
                                    Brak wyników
                                </p>
                            )
                        ) : (
                            <p className="search-empty">
                                Zacznij wpisywać, aby wyszukać notatkę.
                            </p>
                        )
                    }
                </div>

                <div className="search-palette-footer">
                    <div className="search-palette-hints">
                        <span>
                            <kbd>↑↓</kbd>
                            <span>wybór</span>
                        </span>

                        <span>
                            <kbd>Enter</kbd>
                            <span>otwórz</span>
                        </span>

                        <span>
                            <kbd>Esc</kbd>
                            <span>zamknij</span>
                        </span>
                    </div>

                    {query && (
                        <span className="search-palette-count">
                            {searchResults.length} wyników
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPalette;