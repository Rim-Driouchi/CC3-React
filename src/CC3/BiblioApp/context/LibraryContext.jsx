import {createContext,useContext,useEffect,useReducer} from 'react';
import {libraryReducer} from '../reducers/libraryReducer';
import {initialBooks} from '../data/initialBooks';
const LibraryContext=createContext(null);
export function LibraryProvider({children}){
    const [livres,dispatch]=useReducer(libraryReducer,initialBooks,initial=>{
        try{
            return JSON.parse(localStorage.getItem('biblio-livres'))||initial}
            catch{return initial}});
                useEffect(()=>{localStorage.setItem('biblio-livres',JSON.stringify(livres));
                    document.title='BiblioApp — Gestion de bibliothèque'},[livres]);
                    return 
                    <LibraryContext.Provider value={{livres,dispatch}}>{children}</LibraryContext.Provider>
                }
                export function useLibrary(){
                    const c=useContext(LibraryContext);
                    if(!c)throw new Error('useLibrary doit être utilisé dans LibraryProvider');
                    return c
}
