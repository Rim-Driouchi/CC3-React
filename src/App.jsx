import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';

import {
    Boutique,
    Livraison,
    Paiement,
    Confirmation
} from './CC3/TP8/CheckoutPages.jsx';

export default function App(){
    return (
        <BrowserRouter>
            <nav>
                <Link to="/boutique">Boutique</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Boutique/>}/>
                <Route path="/boutique" element={<Boutique/>}/>
                <Route path="/commande/livraison" element={<Livraison/>}/>
                <Route path="/commande/paiement" element={<Paiement/>}/>
                <Route path="/commande/confirmation" element={<Confirmation/>}/>
            </Routes>
        </BrowserRouter>
    );
}
