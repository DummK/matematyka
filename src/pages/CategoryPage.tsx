import {useParams} from "react-router";
import NoteCard from "../components/NoteCard";
import Breadcrumbs from "../components/Breadcrumbs";

import {categories} from "../data/Categories";
import {notes} from "../data/Notes";
import NotFoundPage from "./NotFoundPage.tsx";


function CategoryPage() {
    const params = useParams();

    const category = categories.find((category)=> {
        return category.slug === params.slug;
    })

    if(!category) {
        return (
            <NotFoundPage />
        )
    }

    const filteredNotes = notes.filter((note) => {
        return note.categorySlug === params.slug;
    })

    return (
        <main className="container page">
            <Breadcrumbs
                categoryTitle={category.title}
                categorySlug={category.slug}
            />

            <h1 className="page-title">{category.title}</h1>

            <section className="notes-list">
                {
                    filteredNotes.map((note) => {
                        return (
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                slug={note.slug}
                                categorySlug={note.categorySlug}
                                files={note.files}
                                key={note.id}
                            />
                        );
                    })
                }
            </section>
        </main>
    )
}

export default CategoryPage