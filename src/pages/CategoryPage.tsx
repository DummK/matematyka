import {useParams} from "react-router";
import {categories} from "../data/Categories";



function CategoryPage() {
    const params = useParams();

    const category = categories.find((category)=> {
        return category.slug === params.slug;
    })

    if(!category) {
        return (
            <>
                <h1>Nie znaleziono</h1>
            </>
        )
    }

    return (
        <>
            <h1>{category.title}</h1>
        </>
    )
}

export default CategoryPage