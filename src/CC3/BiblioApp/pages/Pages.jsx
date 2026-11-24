
import { useMemo, useRef, useCallback, useStat } from "react";
import { Link, Outlet, useLocation, useNavigate, useParam } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import { useTheme } from "../context/ThemeContext";
import BookCard from "../components/BookCard";
import StatCard from "../components/StatCard";
import GenreBadge from "../components/GenreBadge";

export function Layout() {
    const { theme, setTheme } = useTheme();
    const { livres } = useLibrary();

    const [recherche, setRecherche] = useState("");
    const searchRef = useRef(null);

    const nombreResultats = livres.filter(livre =>
        (livre.titre + " " + livre.auteur)
            .toLowerCase()
            .includes(recherche.toLowerCase())
    ).length;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: theme === "sombre" ? "#222" : "#fff",
                color: theme === "sombre" ? "#fff" : "#222",
                fontFamily: "Arial"
            }}
        >
            <nav
                style={{
                    display: "flex",
                    gap: 14,
                    padding: 16,
                    background: theme === "sombre" ? "#333" : "#eee",
                    flexWrap: "wrap"
                }}
            >
                <Link to="/">Tableau de bord</Link>

                <Link to="/livres">Catalogue</Link>

                <Link to="/livres/nouveau">
                    Ajouter un livre
                </Link>

                <button
                    onClick={() =>
                        setTheme(t =>
                            t === "clair" ? "sombre" : "clair"
                        )
                    }
                >
                    Thème {theme === "clair" ? "sombre" : "clair"}
                </button>

                <button
                    onClick={() => searchRef.current?.focus()}
                >
                    Focus recherche
                </button>

                <input
                    ref={searchRef}
                    placeholder="Recherche titre/auteur..."
                    value={recherche}
                    onChange={e => setRecherche(e.target.value)}
                />

                <span>{nombreResultats} résultats</span>
            </nav>

            <main style={{ padding: 20 }}>
                <OutletWrapper />
            </main>
        </div>
    );
}

function OutletWrapper() {
    const loc = useLocation();

    return (
        <>
            {loc.state?.flash && (
                <p style={{ color: "green" }}>
                    {loc.state.flash}
                </p>
            )}

            <Outlet />
        </>
    );
}

export function Dashboard() {
    const { livres } = useLibrary();

    const stats = useMemo(
        () => ({
            total: livres.length,

            pretes: livres.filter(
                livre => !livre.disponible
            ).length,

            retard: livres.reduce(
                (n, livre) =>
                    n +
                    livre.prets.filter(
                        pret =>
                            !pret.rendu &&
                            pret.dateRetourPrevue <
                                new Date().toISOString().slice(0, 10)
                    ).length,
                0
            ),

            genre: livres.length
                ? Object.entries(
                      livres.reduce(
                          (obj, livre) => ({
                              ...obj,
                              [livre.genre]:
                                  (obj[livre.genre] || 0) + 1
                          }),
                          {}
                      )
                  ).sort((a, b) => b[1] - a[1])[0][0]
                : "—"
        }),
        [livres]
    );

    return (
        <>
            <h1>Tableau de bord</h1>

            <div
                style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap"
                }}
            >
                <StatCard
                    titre="Total livres"
                    valeur={stats.total}
                />

                <StatCard
                    titre="Livres prêtés"
                    valeur={stats.pretes}
                />

                <StatCard
                    titre="Prêts en retard"
                    valeur={stats.retard}
                />

                <StatCard
                    titre="Genre principal"
                    valeur={stats.genre}
                />
            </div>

            <p>
                <Link to="/livres">
                    Ouvrir le catalogue →
                </Link>
            </p>
        </>
    );
}

export function Catalogue() {
    const { livres, dispatch } = useLibrary();

    const [recherche, setRecherche] = useState("");
    const [genre, setGenre] = useState("Tous");
    const [dispo, setDispo] = useState("Tous");

    const nav = useNavigate();

    const onPreter = useCallback(
        id => {
            const livre = livres.find(l => l.id === id);

            if (livre?.disponible) {
                nav(`/livres/${id}/preter`);
            } else {
                nav(`/livres/${id}`);
            }
        },
        [livres, nav]
    );

    const onSupprimer = useCallback(
        id => {
            if (confirm("Supprimer ce livre ?")) {
                dispatch({
                    type: "SUPPRIMER_LIVRE",
                    payload: id
                });
            }
        },
        [dispatch]
    );

    const filtres = useMemo(
        () =>
            livres.filter(
                livre =>
                    (livre.titre + " " + livre.auteur)
                        .toLowerCase()
                        .includes(recherche.toLowerCase()) &&
                    (genre === "Tous" || livre.genre === genre) &&
                    (
                        dispo === "Tous" ||
                        (
                            dispo === "Disponible"
                                ? livre.disponible
                                : !livre.disponible
                        )
                    )
            ),
        [livres, recherche, genre, dispo]
    );

    return (
        <>
            <h1>Catalogue</h1>

            <label>
                Recherche{" "}
                <input
                    value={recherche}
                    onChange={e => setRecherche(e.target.value)}
                />
            </label>

            <label>
                Genre{" "}
                <select
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                >
                    {[
                        "Tous",
                        ...new Set(livres.map(l => l.genre))
                    ].map(g => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Disponibilité{" "}
                <select
                    value={dispo}
                    onChange={e => setDispo(e.target.value)}
                >
                    {["Tous", "Disponible", "Emprunté"].map(x => (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
            </label>

            <p>
                <Link to="/livres/nouveau">
                    + Ajouter un livre
                </Link>
            </p>

            {filtres.map(livre => (
                <BookCard
                    key={livre.id}
                    livre={livre}
                    onPreter={onPreter}
                    onSupprimer={onSupprimer}
                />
            ))}

            {!filtres.length && (
                <p>Aucun livre trouvé.</p>
            )}
        </>
    );
}


export function FicheLivre() {
    const { id } = useParams();

    const { livres, dispatch } = useLibrary();

    const nav = useNavigate();

    const livre = livres.find(
        l => String(l.id) === id
    );

    if (!livre) {
        return (
            <>
                <h1>Livre introuvable</h1>

                <Link to="/livres">
                    Retour au catalogue
                </Link>
            </>
        );
    }

    return (
        <>
            <h1>{livre.titre}</h1>

            <p>Auteur : {livre.auteur}</p>

            <p>
                Genre : <GenreBadge genre={livre.genre} />
            </p>

            <p>Année : {livre.annee}</p>

            <p>
                Statut :{" "}
                {livre.disponible ? "Disponible" : "Emprunté"}
            </p>

            <h2>Historique des prêts</h2>

            {livre.prets.length ? (
                livre.prets.map((pret, i) => (
                    <p key={i}>
                        {pret.eleve}
                        {" — sorti le "}
                        {pret.dateSortie}
                        {" — retour prévu le "}
                        {pret.dateRetourPrevue}
                        {" — "}
                        {pret.rendu
                            ? "Rendu"
                            : pret.dateRetourPrevue <
                                new Date().toISOString().slice(0, 10)
                              ? "EN RETARD"
                              : "En cours"}
                    </p>
                ))
            ) : (
                <p>Aucun prêt enregistré.</p>
            )}

            {livre.disponible ? (
                <button
                    onClick={() =>
                        nav(`/livres/${livre.id}/preter`)
                    }
                >
                    Prêter
                </button>
            ) : (
                <button
                    onClick={() =>
                        dispatch({
                            type: "RENDRE",
                            payload: livre.id
                        })
                    }
                >
                    Rendre le livre
                </button>
            )}

            <button
                onClick={() => {
                    if (confirm("Supprimer ce livre ?")) {
                        dispatch({
                            type: "SUPPRIMER_LIVRE",
                            payload: livre.id
                        });

                        nav("/livres", { replace: true });
                    }
                }}
            >
                Supprimer
            </button>

            <button onClick={() => nav(-1)}>
                Retour
            </button>
        </>
    );
}

export function NotFound() {
    return (
        <>
            <h1>404 — Page introuvable</h1>

            <Link to="/">
                Retour à l’accueil
            </Link>
        </>
    );
}
