import {createContext,useContext,useState} from 'react';
const CurrencyContext=createContext(null);
const taux={MAD:1,EUR:0.092,USD:0.10};
export function CurrencyProvider({children}){
    const [devise,setDevise]=useState('MAD');
    const formatPrix=montant=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:devise}).format(montant*taux[devise]);
    return (
        <CurrencyContext.Provider value={{devise,setDevise,formatPrix}}>
            {children}
        </CurrencyContext.Provider>
    );
}
export function useCurrency(){
    const c=useContext(CurrencyContext);
    if(!c)throw new Error('useCurrency doit être utilisé dans CurrencyProvider');
    return c
}
