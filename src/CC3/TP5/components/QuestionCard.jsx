export default function QuestionCard({question,reponseChoisie,dispatch}){
    return (
    <section>
        <h2>{question.question}</h2>
        {question.choix.map((choix,i)=>{
            let style={display:'block',margin:'8px 0',padding:10,cursor:reponseChoisie===null?'pointer':'default'};
        if(reponseChoisie!==null&&i===question.bonneReponse)style.background='#b9efc4';
        else if(reponseChoisie===i&&i!==question.bonneReponse)style.background='#ffc5c5';
        return (
        <button key={choix} disabled={reponseChoisie!==null} style={style} 
        onClick={()=>dispatch({type:'REPONDRE',payload:{questionId:question.id,choix:i,bonneReponse:question.bonneReponse}})}>{choix}
        </button>
        );
    }
    )
    }
        </section>
    );
    }
/*
import {useReducer} from 'react';
import quizReducer,{initialState} from './reducers/quizReducer';
import {questions} from './data/questions';
import QuestionCard from './components/QuestionCard';
export default function App(){
    const [state,dispatch]=useReducer(quizReducer,initialState);
    const q=questions[state.index];
    const ratées=state.historique.filter(h=>h.choix!==h.bonneReponse);
    return (
    <main style={{maxWidth:650,margin:'30px auto',fontFamily:'Arial'}}>
        <h1>Quiz JavaScript</h1>
        {state.statut==='accueil'&&
        <>
        <p>8 questions pour tester vos connaissances.</p>
        <button onClick={()=>dispatch({type:'DEMARRER'})}>Démarrer</button>
        </>
        }
        {state.statut==='en_cours'&&
        <>
        <p>Question {state.index+1} / {questions.length}</p>
        <progress value={state.index+1} max={questions.length}/>
        <QuestionCard question={q} reponseChoisie={state.reponseChoisie} dispatch={dispatch}/>
        {state.reponseChoisie!==null&&
        <button onClick={()=>dispatch({type:'SUIVANTE',payload:{total:questions.length}})}>
            {state.index===questions.length-1?'Voir le résultat':'Suivante'}
            </button>}
            </>
            }{state.statut==='termine'&&
            <>
            <h2>Résultat : {state.score}/{questions.length}</h2>
            <p>{state.score/questions.length>=.75?'Excellent !':state.score/questions.length>=.5?'Bien joué !':'Continuez à vous entraîner.'}</p>
            <h3>Questions ratées</h3>
            {ratées.length?ratées.map(h=><p key={h.questionId}>
                {questions.find(x=>x.id===h.questionId)?.question}</p>):
                <p>Aucune erreur !</p>}
                <button onClick={()=>dispatch({type:'RECOMMENCER'})}>Recommencer</button>
                </>}
                </main>
                );
            }

*/