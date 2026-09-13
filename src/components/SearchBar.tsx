import { useState } from "react";
import { Link } from "react-router";
import { notes } from "../data/Notes";

function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function levenshteinDistance(first: string, second: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= second.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= first.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= second.length; i++) {
        for (let j = 1; j <= first.length; j++) {
            if (second[i - 1] === first[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[second.length][first.length];
}

function wordsMatch(queryWord: string, targetWord: string): boolean {
    if (targetWord.includes(queryWord)) {
        return true;
    }

    const allowedErrors = queryWord.length >= 7 ? 2 : 1;

    return levenshteinDistance(queryWord, targetWord) <= allowedErrors;
}

function SearchBar() {
    const [query, setQuery] = useState("");

    const normalizedQuery = normalizeText(query);

    const filteredNotes = notes.filter((note) => {
        if (!normalizedQuery) {
            return false;
        }

        const searchableText = normalizeText(
            [
                note.title,
                note.slug,
                ...(note.keywords ?? [])
            ].join(" ")
        );

        const queryWords = normalizedQuery.split(" ");
        const searchableWords = searchableText.split(" ");

        return queryWords.every((queryWord) => {
            return searchableWords.some((targetWord) => {
                return wordsMatch(queryWord, targetWord);
            });
        });
    });

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
                normalizedQuery && (
                    <div className="search-results">
                        {
                            filteredNotes.length > 0
                                ? filteredNotes.map((note) => {
                                    return (
                                        <Link
                                            className="search-result"
                                            key={note.id}
                                            to={`/category/${note.categorySlug}/${note.slug}`}
                                        >
                                            <span>{note.title}</span>
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