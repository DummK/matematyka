import Main from "../components/Main";
import CategoryCard from "../components/CategoryCard";
import {categories} from "../data/Categories";

function HomePage() {
    return (
        <>
            <Main />
            {
                categories.map((element) => {
                    return (
                        <CategoryCard id={element.id} title={element.title} slug={element.slug} key={element.id} />
                    )
                })
            }
        </>
    )
}

export default HomePage