
import { useEffect, useState } from 'react';

const regions=['africa','europe','asia','americas','oceania'];

export default function CountryList(){
 const [pays,setPays]=useState([]),
 [loading,setLoading]=useState(true),
 [error,setError]=useState(null),
 [region,setRegion]=useState('africa'),
 [slideshow,setSlideshow]=useState(false),
 [index,setIndex]=useState(0);

 useEffect(()=>{let ignore=false;
    setLoading(true);setError(null);

    fetch(`https://countries.dev/region/${region}`)
    .then(r=>{if(!r.ok)throw new Error('Impossible de charger cette région.');
        return r.json()})
    .then(data=>{if(!ignore){
        setPays(data.sort((a,b)=>a.name.localeCompare(b.name)));
        setIndex(0);
    }})
    .catch(e=>{if(!ignore){setError(e.message);setPays([])}})
    .finally(()=>{
        if(!ignore)setLoading(false)
    });

    return()=>{ignore=true}
 },[region]);

 useEffect(()=>{document.title=`${pays.length} pays — ${region}`},[pays.length,region]);

 useEffect(()=>{if(!slideshow||!pays.length)return;
    const id=setInterval(()=>setIndex(i=>(i+1)%pays.length),3000);
    return()=>clearInterval(id)
 },[slideshow,pays.length]);

 return (
 <section>
    <label>Région :
        <select value={region} onChange={e=>setRegion(e.target.value)}>
            {regions.map(r=><option key={r}>{r}</option>)}
        </select>
    </label>

    <button onClick={()=>setSlideshow(s=>!s)}>
        {slideshow?'Arrêter':'Mode diaporama'}
    </button>

 {loading&&
 <p>Chargement…</p>
 }

 {error&&
 <p role="alert">Erreur : {error}</p>
 }

 {!loading&&!error&&slideshow&&pays[index]&&
 <article>
    <img width="120" src={pays[index].flags?.png || pays[index].flags?.svg} alt="Drapeau"/>
    <h2>{pays[index].name}</h2>
    <p>{pays[index].capital||'Capitale inconnue'}</p>
 </article>
 }

 {!loading&&!error&&!slideshow&&
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12}}>
    {pays.map(p=>
    <article key={p.alpha2Code} style={{border:'1px solid #ddd',padding:12,borderRadius:8}}>
        <img src={p.flags?.png || p.flags?.svg} alt={`Drapeau ${p.name}`} style={{width:90}}/>
        <h3>{p.name}</h3>
        <p>Capitale : {p.capital||'—'}</p>
        <p>Population : {(p.population||0).toLocaleString('fr-FR')}</p>
    </article>)}
 </div>
 }

 </section>
 );
}
/*
import CountryList from './CC3/TP2/CountryList';

export default function App() {
  return (
    <main style={{ padding: 20 }}>
      <h1>TP2 — Exploration des pays</h1>
      <CountryList />
    </main>
  );
}

*/