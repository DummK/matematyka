import type {Category} from "../types/Category";
import {Link} from "react-router";

function CategoryCard(props: Category) {
    const { title, slug } = props;

    return (
        <Link to={`/category/${slug}`}>
            <section>
                <p>{title}</p>
            </section>
        </Link>
    )
}

export default CategoryCard