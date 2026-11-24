import {useForm} from 'react-hook-form';
import {useNavigate,useParams} from 'react-router-dom';
import {useLibrary} from '../context/LibraryContext';
export default function LoanForm(){
    const {id}=useParams();
    const {livres,dispatch}=useLibrary();
    const nav=useNavigate();
    const livre=livres.find(l=>String(l.id)===id);
    const {register,handleSubmit,formState:{errors}}=useForm();
    if(!livre)return 
    <p>Livre introuvable.</p>;
    function submit(d){dispatch({type:'PRETER',payload:{id:livre.id,...d}});
    nav(`/livres/${livre.id}`,{state:{flash:`Livre prêté à ${d.eleve}`}})}
    return (
    <form onSubmit={handleSubmit(submit)} style={{display:'grid',gap:10,maxWidth:400}}>
        <h1>Prêt : {livre.titre}</h1>
        <label>Nom de l’élève <input {...register('eleve',{required:'Nom obligatoire',minLength:{value:2,message:'2 caractères minimum'}})}/>
        </label>{errors.eleve&&
        <small>{errors.eleve.message}</small>}
        <label>Date de retour prévue 
            <input type="date" min={new Date().toISOString().slice(0,10)} 
            {...register('dateRetourPrevue',{required:'Date obligatoire',validate:v=>v>new Date().toISOString().slice(0,10)||'Choisissez une date future'})}/>
        </label>
            {errors.dateRetourPrevue&&
            <small>{errors.dateRetourPrevue.message}</small>}
            <button disabled={!livre.disponible}>Enregistrer le prêt</button>
            {!livre.disponible&&
            <p>Ce livre est déjà emprunté.</p>
            }
            </form>
        );
        }
