import Main from "../components/Main";
import CategoryCard from "../components/CategoryCard";
import NoteCard from "../components/NoteCard";

import type {Note} from "../types/Note";

import {categories} from "../data/Categories";


function HomePage() {
    const recentNotesJson = localStorage.getItem("recentNotes");
    let recentNotes: Note[] = [];

    if(recentNotesJson) {
        recentNotes = JSON.parse(recentNotesJson);
    }

    return (
        <main className="container">
            <Main />
            <section className="categories-grid">
                {
                    categories.map((category) => {
                        return (
                            <CategoryCard id={category.id} title={category.title} slug={category.slug} key={category.id} />
                        )
                    })
                }
            </section>
            <h2 className="section-title">Ostatnio otwierane</h2>

            <section className="recent-notes">
                {
                    recentNotes.length > 0 ? recentNotes.map((note) => {
                        return (
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                slug={note.slug}
                                categorySlug={note.categorySlug}
                                files={note.files}
                                key={note.id}
                            />
                        )
                    }) : <p className="empty-message">Brak ostatnich notatek</p>
                }
            </section>
        </main>
    )
}

export default HomePage