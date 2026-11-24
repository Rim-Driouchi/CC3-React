import {createContext,useContext,useState} from 'react';
const ThemeContext=createContext(null);
export function ThemeProvider({children}){
    const [theme,setTheme]=useState('clair');
    return (
    <ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>
);
}
export function useTheme(){
    const c=useContext(ThemeContext);
    if(!c)throw new Error('useTheme doit être utilisé dans ThemeProvider');
    return c
}