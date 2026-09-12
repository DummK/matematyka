import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router";
import CategoryPage from "./pages/CategoryPage";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
            </Routes>
        </>
    )
}

export default App