import { useEffect } from "react";
import { useParams } from "react-router";

import Breadcrumbs from "../components/Breadcrumbs";
import NotFoundPage from "./NotFoundPage";

import type { Note } from "../types/Note";

import { notes } from "../data/Notes";
import { categories } from "../data/Categories";

function NotePage() {
    const params = useParams();

    const category = categories.find((category) => {
        return category.slug === params.categorySlug;
    });

    const note = notes.find((note) => {
        return (
            note.categorySlug === params.categorySlug &&
            note.slug === params.noteSlug
        );
    });

    useEffect(() => {
        if (!note) {
            return;
        }

        let recentNotes: Note[] = [];

        const recentNotesJson = localStorage.getItem("recentNotes");

        if (recentNotesJson) {
            recentNotes = JSON.parse(recentNotesJson);
        }

        const filteredRecentNotes = recentNotes.filter((recentNote) => {
            return !(
                recentNote.slug === note.slug &&
                recentNote.categorySlug === note.categorySlug
            );
        });

        const updatedNotes = [
            note,
            ...filteredRecentNotes
        ].slice(0, 5);

        localStorage.setItem(
            "recentNotes",
            JSON.stringify(updatedNotes)
        );
    }, [note]);

    if (!category || !note) {
        return <NotFoundPage />;
    }

    return (
        <main className="container page note-page">
            <Breadcrumbs
                categoryTitle={category.title}
                categorySlug={category.slug}
                noteTitle={note.title}
            />

            <h1 className="page-title">{note.title}</h1>

            <section className="pdf-list">
                {
                    note.files.map((file, index) => {
                        return (
                            <div className="pdf-container" key={file}>
                                {
                                    note.files.length > 1 && (
                                        <p className="pdf-label">
                                            Strona {index + 1}
                                        </p>
                                    )
                                }

                                <iframe
                                    className="pdf-viewer"
                                    src={file}
                                    title={`${note.title} — strona ${index + 1}`}
                                />
                            </div>
                        );
                    })
                }
            </section>
        </main>
    );
}

export default NotePage;