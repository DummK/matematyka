import Header from "./components/Header"
import Main from "./components/Main"
import CategoryCard from "./components/CategoryCard"
import type {Category} from "./types/Category"

const categories: Category[] = [ {id: 1, title: "Ciągi", slug: "ciagi"},
                                    {id: 2, title: "Kombinatoryka", slug: "kombinatoryka"},
                                    {id: 3, title: "Czworokąty", slug: "czworokaty"}]

function App() {

  return (
      <>
        <Header />
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

export default App
