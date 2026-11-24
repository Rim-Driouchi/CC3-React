import {useForm} from 'react-hook-form';
import {useEffect,useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLibrary} from '../context/LibraryContext';
export default function BookForm(){
    const {register,handleSubmit,formState:{errors}}=useForm();
    const titreRef=useRef(null);const {dispatch}=useLibrary();
    const nav=useNavigate();
    useEffect(()=>{titreRef.current?.focus()},[]);
    function ajouter(data){dispatch({type:'AJOUTER_LIVRE',payload:{...data,annee:Number(data.annee)}});
    nav('/livres',{state:{flash:'Livre ajouté avec succès'}})}
    return (
    <form onSubmit={handleSubmit(ajouter)} style={{display:'grid',gap:10,maxWidth:450}}>
        <label>Titre 
            <input {...register('titre',{required:'Titre obligatoire',minLength:{value:2,message:'2 caractères minimum'}})} ref={e=>{register('titre').ref(e);titreRef.current=e}}/>
        </label>
        {errors.titre&&
        <small>{errors.titre.message}</small>}
        <label>Auteur 
            <input {...register('auteur',{required:'Auteur obligatoire'})}/>
        </label>
        {errors.auteur&&
        <small>{errors.auteur.message}</small>}
        <label>Genre 
            <select {...register('genre')}>
                <option>Roman</option>
                <option>Informatique</option>
                <option>Histoire</option>
                <option>Science</option>
                <option>Autre</option>
            </select>
        </label>
        <label>Année 
            <input type="number" {...register('annee',{required:'Année obligatoire',valueAsNumber:true,validate:v=>v<=new Date().getFullYear()||'L’année ne peut pas être future'})}/>
        </label>
        {errors.annee&&
        <small>{errors.annee.message}</small>}
        <button>Ajouter le livre</button>
    </form>
    );
}
