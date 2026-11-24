import {memo} from 'react';
function ProductRow({produit,favori,onToggleFavori,compact}){
    console.log('Rendu ligne',produit.id);
    return (
    <article style={{padding:compact?4:10,borderBottom:'1px solid #ddd'}}>
        <button onClick={()=>onToggleFavori(produit.id)}>{favori?'★':'☆'}</button> 
        {produit.nom} — {produit.categorie} — {produit.prix} DH — {produit.stock?'En stock':'Rupture'}
    </article>
    );
}
export default memo(ProductRow);
/*
import {useCallback,useMemo,useState} from 'react';
import {produits} from './data/produits';
import ProductRow from './components/ProductRow';
export default function App(){
    const [categorie,setCategorie]=useState('Toutes'),
    [prixMax,setPrixMax]=useState(5000),
    [stockOnly,setStockOnly]=useState(false),
    [compact,setCompact]=useState(false),
    [favoris,setFavoris]=useState([]);
    const filtres=useMemo(()=>{console.time('Filtrage mémoïsé');
        const r=produits.filter(p=>(categorie==='Toutes'||p.categorie===categorie)&&p.prix<=prixMax&&(!stockOnly||p.stock));
        console.timeEnd('Filtrage mémoïsé');
        return r},[categorie,prixMax,stockOnly]);
        const stats=useMemo(()=>({moyenne:filtres.length?filtres.reduce((s,p)=>s+p.prix,0)/filtres.length:0,
            cher:filtres.reduce((a,p)=>p.prix>a.prix?p:a,
            {prix:0,nom:'—'}),
            valeur:filtres.reduce((s,p)=>s+(p.stock?p.prix:0),0)}),
            [filtres]);
        const onToggleFavori=useCallback(id=>setFavoris(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]),[]);
        return( 
        <main style={{padding:20,fontFamily:'Arial'}}>
            <h1>Catalogue de produits</h1>
            <label>Catégorie 
                <select value={categorie} onChange={e=>setCategorie(e.target.value)}>
                    {['Toutes','Informatique','Maison','Sport','Livres','Mode'].map(c=>
                    <option key={c}>{c}</option>
                )}
                </select>
                </label>
                <p>Prix maximum : {prixMax} DH 
                    <input type="range" min="10" max="5000" step="10" value={prixMax} 
                    onChange={e=>setPrixMax(+e.target.value)}/>
                    </p>
                    <label>
                        <input type="checkbox" checked={stockOnly} onChange={e=>setStockOnly(e.target.checked)}/>
                         En stock uniquement</label> 
                         <button onClick={()=>setCompact(v=>!v)}>Mode compact : {compact?'Activé':'Désactivé'}</button>
                         <p>{filtres.length} produits · Prix moyen 
                            {stats.moyenne.toFixed(2)} DH · Plus cher : 
                            {stats.cher.nom} ({stats.cher.prix} DH) · Valeur du stock filtré : 
                            {stats.valeur} DH · Favoris : {favoris.length}</p>
                            <section>{filtres.slice(0,100).map(p=>
                                <ProductRow key={p.id} produit={p} 
                                favori={favoris.includes(p.id)} 
                                onToggleFavori={onToggleFavori} 
                                compact={compact}/>)}
                            </section>
                            <small>Affichage des 100 premiers résultats pour garder l'interface fluide.</small>
                            </main>
                            );
                        }

*/