import {Link} from "react-router";

import type {Note} from "../types/Note";


function NoteCard(props: Note) {
    const { title, slug, categorySlug } = props;

    return (
        <Link
            to={`/category/${categorySlug}/${slug}`}
            className="note-card"
        >
            <span>{title}</span>
            <span className="note-card-arrow">→</span>
        </Link>
    )
}

export default NoteCard;