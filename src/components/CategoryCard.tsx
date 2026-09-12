import type {Category} from "../types/Category";

function CategoryCard(props: Category) {
    const { title } = props;

    return (
        <section>
            <p>{title}</p>
        </section>
    )
}

export default CategoryCard