import {memo} from 'react';
import {Link} from 'react-router-dom';
export default memo(function BookCard({livre,onPreter,onSupprimer}){
    return (
    <article style={{border:'1px solid #ccc',padding:12,borderRadius:8,margin:'8px 0'}}>
        <h3>
            <Link to={`/livres/${livre.id}`}>{livre.titre}</Link>
        </h3>
            <p>{livre.auteur} · {livre.genre} · {livre.annee}</p>
            <p>{livre.disponible?'Disponible':'Emprunté'}</p>
            {livre.disponible?<button onClick={()=>onPreter(livre.id)}>Prêter

            </button>:<button onClick={()=>onPreter(livre.id)}>Voir prêt</button>} 
            <button onClick={()=>onSupprimer(livre.id)}>Supprimer</button>
        </article>)}
)
/*
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {LibraryProvider} from './context/LibraryContext';
import {ThemeProvider} from './context/ThemeContext';
import {Layout,Dashboard,Catalogue,Ajout,FicheLivre,NotFound} from './pages/Pages';
import LoanForm from './components/LoanForm';
export default function App(){
    return (
    <LibraryProvider>
        <ThemeProvider>
            <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/livres" element={<Catalogue/>}/>
                    <Route path="/livres/nouveau" element={<Ajout/>}/>
                    <Route path="/livres/:id" element={<FicheLivre/>}/>
                    <Route path="/livres/:id/preter" element={<LoanForm/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </LibraryProvider>
);
}
*/