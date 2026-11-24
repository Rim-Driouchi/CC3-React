export function libraryReducer(state,action){
    switch(action.type){
        case 'CHARGER':
            return action.payload;
        case 'AJOUTER_LIVRE':
            return [...state,{...action.payload,id:Date.now(),disponible:true,prets:[]}];
        case 'SUPPRIMER_LIVRE':
            return state.filter(l=>l.id!==action.payload);
        case 'PRETER':
            return state.map(l=>l.id===action.payload.id?{...l,disponible:false,prets:[...l.prets,{eleve:action.payload.eleve,dateSortie:new Date().toISOString().slice(0,10),dateRetourPrevue:action.payload.dateRetourPrevue,rendu:false}]}:l);
        case 'RENDRE':
            return state.map(l=>l.id===action.payload?{...l,disponible:true,prets:l.prets.map((p,i)=>i===l.prets.length-1?{...p,rendu:true}:p)}:l);
        default:
            return state;
    }
}