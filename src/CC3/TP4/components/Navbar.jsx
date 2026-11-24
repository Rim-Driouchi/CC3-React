import {useAuth} from '../context/AuthContext';
import {useCurrency} from '../context/CurrencyContext';
export default function Navbar(){
    const {user,login,logout}=useAuth();
    const {devise,setDevise}=useCurrency();
    return (
    <nav style={{display:'flex',gap:12,alignItems:'center',padding:12,background:'#eee'}}>
        <b>MiniShop</b>{user?
        <span>Bonjour {user.nom} — 
        <button onClick={logout}>Déconnexion
        </button>
        </span>:
        <button onClick={()=>login('Salma')}>Se connecter</button>
        }{user?.role==='admin'&&
        <a href="#admin">Administration</a>
        }<label>Devise <select value={devise} onChange={e=>setDevise(e.target.value)}>
            {['MAD','EUR','USD'].map(d=>
            <option key={d}>{d}</option>
            )
            }
            </select>
            </label>
            </nav>
            );
        }
/*
import {AuthProvider} from './context/AuthContext';
import {CurrencyProvider} from './context/CurrencyContext';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
export default function App(){
    return (
    <AuthProvider>
        <CurrencyProvider>
            <main style={{fontFamily:'Arial'}}>
                <Navbar/>
                <h1 style={{padding:16}}>Connexion simulée et devise</h1>
                <div style={{display:'flex',gap:12,padding:16,flexWrap:'wrap'}}>
                    <ProductCard nom="Clavier" prix={250}/>
                    <ProductCard nom="Écran" prix={1800}/>
                    <ProductCard nom="Souris" prix={120}/>
                </div>
            </main>
        </CurrencyProvider>
    </AuthProvider>
    );
}

*/