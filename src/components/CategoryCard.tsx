import {Link} from "react-router";

import type {Category} from "../types/Category";


function CategoryCard(props: Category) {
    const { title, slug } = props;

    return (
        <Link to={`/category/${slug}`} className="category-card">
            <span className="category-card-title">{title}</span>
            <span className="category-card-arrow">→</span>
        </Link>
    )
}

export default CategoryCard