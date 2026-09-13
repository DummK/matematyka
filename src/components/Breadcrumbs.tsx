import {Link} from "react-router";

import type {BreadcrumbsProps} from "../types/BreadcrumbsProps";


function Breadcrumbs(props: BreadcrumbsProps) {
    const { categoryTitle, categorySlug, noteTitle } = props;

    return (
        <nav className="breadcrumbs">
            <Link to="/" className="breadcrumb-link">
                Matematyka
            </Link>

            <span className="breadcrumb-separator">/</span>

            <Link
                to={`/category/${categorySlug}`}
                className="breadcrumb-link"
            >
                {categoryTitle}
            </Link>

            {
                noteTitle && (
                    <>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">
                        {noteTitle}
                    </span>
                    </>
                )
            }
        </nav>
        )
}

export default Breadcrumbs