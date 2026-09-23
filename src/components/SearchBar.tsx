import { useState } from "react";
import { Link } from "react-router";

import { notes } from "../data/Notes";
import {searchNotes} from "../utils/search";
import {categories} from "../data/Categories";

function SearchBar() {
    const [query, setQuery] = useState("");

    const searchResults = searchNotes(query, notes);

    return (
        <div className="search">
            <input
                className="search-input"
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                }}
                placeholder="Szukaj notatki..."
            />

            {
                query && (
                    <div className="search-results">
                        {
                            searchResults.length > 0
                                ? searchResults.map((result) => {
                                    const category = categories.find((category) => {
                                        return category.slug === result.note.categorySlug;
                                    });

                                    return (
                                        <Link
                                            className="search-result"
                                            key={result.note.id}
                                            to={`/category/${result.note.categorySlug}/${result.note.slug}`}
                                            onClick={() => setQuery("")}
                                        >
                                            <span>
                                                {result.note.title} ({category?.title})
                                            </span>
                                            <span>→</span>
                                        </Link>
                                    );
                                })
                                : (
                                    <p className="search-empty">
                                        Brak wyników
                                    </p>
                                )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default SearchBar;