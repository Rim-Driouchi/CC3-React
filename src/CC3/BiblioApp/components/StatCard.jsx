export default function StatCard({titre,valeur}){
    return (
    <article style={{padding:14,border:'1px solid #ccc',borderRadius:8,minWidth:120}}>
        <p>{titre}</p>
        <strong style={{fontSize:24}}>{valeur}</strong>
    </article>
    );
}