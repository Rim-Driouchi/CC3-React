
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <nav style={{
                display: 'flex',
                gap: 16,
                padding: 16,
                background: '#eee'
            }}>
                <NavLink to="/">Accueil</NavLink>
                <NavLink to="/articles">Articles</NavLink>
            </nav>

            <main style={{ padding: 20 }}>
                <Outlet />
            </main>
        </>
    );
}
/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './CC3/TP7/components/Layout';

import {
    Accueil,
    ListeArticles,
    Article,
    Auteur,
    Tag,
    NotFound
} from './CC3/TP7/pages/Pages';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/articles" element={<ListeArticles />} />
                    <Route path="/articles/:slug" element={<Article />} />
                    <Route path="/auteurs/:id" element={<Auteur />} />
                    <Route path="/tags/:tag" element={<Tag />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
*/