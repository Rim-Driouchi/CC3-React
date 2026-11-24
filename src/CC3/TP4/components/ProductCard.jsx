import {useAuth} from '../context/AuthContext';
import {useCurrency} from '../context/CurrencyContext';
export default function ProductCard({nom,prix}){
    const {user}=useAuth();
    const {formatPrix}=useCurrency();
    return (
    <article style={{border:'1px solid #ddd',padding:16,borderRadius:8}}>
        <h3>{nom}</h3>
        <p>{formatPrix(prix)}</p>{user&&
<button onClick={()=>alert(`${nom} ajouté au panier`)}>Ajouter au panier</button>
}
</article>
);
}