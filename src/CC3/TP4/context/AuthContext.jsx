import {createContext,useContext,useState} from 'react';
const AuthContext=createContext(null);
export function AuthProvider({children}){
    const [user,setUser]=useState(null);
    const login=nom=>setUser({nom,role:nom.toLowerCase()==='admin'?'admin':'client'});
    const logout=()=>setUser(null);
    return (
    <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
);
}
export function useAuth(){
    const c=useContext(AuthContext);
    if(!c)throw new Error('useAuth doit être utilisé dans AuthProvider');
    return c
}
