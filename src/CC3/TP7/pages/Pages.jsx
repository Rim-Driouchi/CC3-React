
import { Link, useParams } from 'react-router-dom';
import { articles, auteurs } from '../data/blog';

export function Accueil() {
    return (
        <div>
            <h1>Bienvenue sur notre blog</h1>
            <p>Découvrez nos derniers articles.</p>
            <Link to="/articles">Voir les articles</Link>
        </div>
    );
}

export function ListeArticles() {
    return (
        <div>
            <h1>Liste des articles</h1>

            {articles.map(article => (
                <div key={article.slug}>
                    <h2>{article.titre}</h2>
                    <p>{article.date}</p>
                    <Link to={`/articles/${article.slug}`}>
                        Lire l'article
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function Article() {
    const { slug } = useParams();
    const article = articles.find(a => a.slug === slug);

    if (!article) return <h2>Article introuvable</h2>;

    const auteur = auteurs.find(a => a.id === article.auteurId);

    return (
        <div>
            <h1>{article.titre}</h1>
            <p>{article.date}</p>
            <p>{article.contenu}</p>

            {auteur && (
                <p>
                    Auteur : <Link to={`/auteurs/${auteur.id}`}>
                        {auteur.nom}
                    </Link>
                </p>
            )}

            <Link to="/articles">Retour aux articles</Link>
        </div>
    );
}

export function Auteur() {
    const { id } = useParams();
    const auteur = auteurs.find(a => String(a.id) === id);

    if (!auteur) return <h2>Auteur introuvable</h2>;

    return (
        <div>
            <h1>{auteur.nom}</h1>
            <p>{auteur.bio}</p>
        </div>
    );
}

export function Tag() {
    const { tag } = useParams();

    const articlesTag = articles.filter(a =>
        a.tags.includes(tag)
    );

    return (
        <div>
            <h1>Articles du tag : {tag}</h1>

            {articlesTag.map(article => (
                <div key={article.slug}>
                    <Link to={`/articles/${article.slug}`}>
                        {article.titre}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function NotFound() {
    return (
        <div>
            <h1>404 - Page introuvable</h1>
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
}
