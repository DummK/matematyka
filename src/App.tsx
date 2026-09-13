import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router";
import CategoryPage from "./pages/CategoryPage";
import NotePage from "./pages/NotePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Analytics } from "@vercel/analytics/react"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/category/:categorySlug/:noteSlug" element={<NotePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Analytics/>
        </>
    )
}

export default App