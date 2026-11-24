
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Liste des produits
const produits = [
    { id: 1, nom: 'Casque', prix: 900 },
    { id: 2, nom: 'Sac', prix: 250 },
    { id: 3, nom: 'Chaussures', prix: 600 }
];

// Page Boutique
export function Boutique() {
    const nav = useNavigate();

    return (
        <>
            <h1>Boutique</h1>

            {produits.map(produit => (
                <article key={produit.id}>
                    <p>
                        {produit.nom} — {produit.prix} DH

                        <button
                            onClick={() =>
                                nav('/commande/livraison', {
                                    state: { produit }
                                })
                            }
                        >
                            Commander
                        </button>
                    </p>
                </article>
            ))}
        </>
    );
}

// Composant Stepper
function Stepper({ etape }) {
    return (
        <p>
            {['Livraison', 'Paiement', 'Confirmation'].map((x, i) => (
                <b
                    key={x}
                    style={{
                        marginRight: 14,
                        color: i + 1 === etape ? '#c22' : '#777'
                    }}
                >
                    {i + 1}. {x}
                </b>
            ))}
        </p>
    );
}

// Page Livraison
export function Livraison() {
    const loc = useLocation();
    const nav = useNavigate();
    const produit = loc.state?.produit;

    const [adresse, setAdresse] = useState('');

    useEffect(() => {
        if (!produit) {
            nav('/boutique', { replace: true });
        }
    }, [produit, nav]);

    if (!produit) {
        return null;
    }

    return (
        <>
            <Stepper etape={1} />

            <h1>Livraison</h1>

            <p>Produit : {produit.nom}</p>

            <label>
                Adresse :
                <input
                    value={adresse}
                    onChange={e => setAdresse(e.target.value)}
                />
            </label>

            <p>
                <button onClick={() => nav(-1)}>
                    Retour
                </button>

                <button
                    disabled={!adresse.trim()}
                    onClick={() =>
                        nav('/commande/paiement', {
                            state: { produit, adresse }
                        })
                    }
                >
                    Continuer
                </button>
            </p>
        </>
    );
}

// Page Paiement
export function Paiement() {
    const loc = useLocation();
    const nav = useNavigate();

    const { produit, adresse } = loc.state || {};

    const [modePaiement, setModePaiement] = useState('Carte');

    useEffect(() => {
        if (!produit || !adresse) {
            nav('/boutique', { replace: true });
        }
    }, [produit, adresse, nav]);

    if (!produit || !adresse) {
        return null;
    }

    return (
        <>
            <Stepper etape={2} />

            <h1>Paiement</h1>

            <p>
                {produit.nom} — livraison à {adresse}
            </p>

            <label>
                Mode :

                <select
                    value={modePaiement}
                    onChange={e => setModePaiement(e.target.value)}
                >
                    <option>Carte</option>
                    <option>À la livraison</option>
                </select>
            </label>

            <p>
                <button onClick={() => nav(-1)}>
                    Retour
                </button>

                <button
                    onClick={() =>
                        nav('/commande/confirmation', {
                            replace: true,
                            state: { produit, adresse, modePaiement }
                        })
                    }
                >
                    Confirmer
                </button>
            </p>
        </>
    );
}

// Page Confirmation
export function Confirmation() {
    const loc = useLocation();
    const nav = useNavigate();

    const data = loc.state;

    const [count, setCount] = useState(5);

    useEffect(() => {
        if (!data) {
            nav('/boutique', { replace: true });
            return;
        }

        const id = setInterval(() => {
            setCount(c => Math.max(0, c - 1));
        }, 1000);

        const timeout = setTimeout(() => {
            nav('/boutique', { replace: true });
        }, 5000);

        return () => {
            clearInterval(id);
            clearTimeout(timeout);
        };
    }, [data, nav]);

    if (!data) {
        return null;
    }

    return (
        <>
            <Stepper etape={3} />

            <h1>Commande confirmée !</h1>

            <p>Produit : {data.produit.nom}</p>
            <p>Prix : {data.produit.prix} DH</p>
            <p>Adresse : {data.adresse}</p>
            <p>Paiement : {data.modePaiement}</p>

            <p>
                Retour à la boutique dans {count} secondes…
            </p>

            <Link to="/boutique">
                Retour immédiat
            </Link>
        </>
    );
}
/*import ReservationForm from './components/ReservationForm';
export default function App(){
return 
<main style={{padding:20,fontFamily:'Arial'}}>
<h1>Réservation d'hôtel</h1>
<ReservationForm/>
</main>}
*/ 