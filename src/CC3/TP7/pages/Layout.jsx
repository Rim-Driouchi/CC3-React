
import { Link, useParams } from 'react-router-dom';
import { articles, auteurs } from '../data/blog';

export function Accueil() {
    return (
        <section>
            <h1>Bienvenue sur notre Blog</h1>
            <p>Découvrez nos derniers articles.</p>
            <Link to="/articles">Voir les articles</Link>
        </section>
    );
}

export function ListeArticles() {
    return (
        <section>
            <h1>Liste des articles</h1>

            {articles.map(a => (
                <article key={a.slug} style={{ marginBottom: 20 }}>
                    <h2>
                        <Link to={`/articles/${a.slug}`}>
                            {a.titre}
                        </Link>
                    </h2>

                    <p>Date : {a.date}</p>

                    <p>
                        Auteur : {' '}
                        <Link to={`/auteurs/${a.auteurId}`}>
                            {auteurs.find(au => au.id === a.auteurId)?.nom}
                        </Link>
                    </p>

                    <p>
                        Tags : {' '}
                        {a.tags.map(t => (
                            <Link
                                key={t}
                                to={`/tags/${t}`}
                                style={{ marginRight: 10 }}
                            >
                                #{t}
                            </Link>
                        ))}
                    </p>
                </article>
            ))}
        </section>
    );
}

export function Article() {
    const { slug } = useParams();

    const article = articles.find(a => a.slug === slug);

    if (!article) return <h2>Article introuvable</h2>;

    const auteur = auteurs.find(a => a.id === article.auteurId);

    return (
        <article>
            <h1>{article.titre}</h1>
            <p>Date : {article.date}</p>

            <p>
                Auteur : {' '}
                <Link to={`/auteurs/${article.auteurId}`}>
                    {auteur?.nom}
                </Link>
            </p>

            <p>{article.contenu}</p>

            <h3>Tags :</h3>

            {article.tags.map(t => (
                <Link
                    key={t}
                    to={`/tags/${t}`}
                    style={{ marginRight: 10 }}
                >
                    #{t}
                </Link>
            ))}
        </article>
    );
}

export function Auteur() {
    const { id } = useParams();

    const auteur = auteurs.find(a => a.id === Number(id));

    if (!auteur) return <h2>Auteur introuvable</h2>;

    const sesArticles = articles.filter(a => a.auteurId === auteur.id);

    return (
        <section>
            <h1>{auteur.nom}</h1>
            <p>{auteur.bio}</p>

            <h2>Ses articles :</h2>

            {sesArticles.map(a => (
                <p key={a.slug}>
                    <Link to={`/articles/${a.slug}`}>
                        {a.titre}
                    </Link>
                </p>
            ))}
        </section>
    );
}

export function Tag() {
    const { tag } = useParams();

    const articlesTag = articles.filter(a =>
        a.tags.includes(tag)
    );

    return (
        <section>
            <h1>Articles avec le tag : #{tag}</h1>

            {articlesTag.length === 0 ? (
                <p>Aucun article trouvé.</p>
            ) : (
                articlesTag.map(a => (
                    <p key={a.slug}>
                        <Link to={`/articles/${a.slug}`}>
                            {a.titre}
                        </Link>
                    </p>
                ))
            )}
        </section>
    );
}

export function NotFound() {
    return (
        <section>
            <h1>404 - Page introuvable</h1>
            <Link to="/">Retour à l'accueil</Link>
        </section>
    );
}
