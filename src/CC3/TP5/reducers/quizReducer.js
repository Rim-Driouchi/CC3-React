export const initialState={statut:'accueil',index:0,reponseChoisie:null,score:0,historique:[]};
export default function quizReducer(state,action){
    switch(action.type){
        case 'DEMARRER':
            return {...initialState,statut:'en_cours'};
            case 'REPONDRE':
                if(state.reponseChoisie!==null)
                    return state;
                return {...state,reponseChoisie:action.payload.choix,score:state.score+(action.payload.choix===action.payload.bonneReponse?1:0),
                    historique:[...state.historique,
                        {questionId:action.payload.questionId,choix:action.payload.choix,bonneReponse:action.payload.bonneReponse}]};
                    case 'SUIVANTE':
                        return state.index>=action.payload.total-1?
                        {...state,statut:'termine'}:
                        {...state,index:state.index+1,reponseChoisie:null};
                        case 'RECOMMENCER':
                            return {...initialState};
                            default:throw new Error(`Action inconnue : ${action.type}`)}}
