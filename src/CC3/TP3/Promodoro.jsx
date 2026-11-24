import { useEffect, useRef, useState } from 'react';
export default function Pomodoro(){
    const [seconds,setSeconds]=useState(25*60),
    [pauseMode,setPauseMode]=useState(false),
    [sessions,setSessions]=useState(0),
    [running,setRunning]=useState(false);
    const intervalRef=useRef(null),soundRef=useRef(null);
 // La ref conserve l'identifiant sans provoquer de nouveau rendu à chaque changement.
 useEffect(()=>{if(!running)return;
    intervalRef.current=setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000);
    return()=>clearInterval(intervalRef.current)},[running]);
 useEffect(()=>{if(seconds===0){setRunning(false);
    if(!pauseMode){setSessions(n=>n+1);setPauseMode(true);
        setSeconds(5*60)}else{setPauseMode(false);
            setSeconds(25*60)}soundRef.current?.play().catch(()=>{})}},[seconds,pauseMode]);
 useEffect(()=>()=>clearInterval(intervalRef.current),[]);
 const format=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
 return (
 <section>
    <h2>Minuteur Pomodoro</h2>
    <h3>{pauseMode?'Pause':'Travail'}</h3>
    <strong style={{fontSize:42}}>
        {format(seconds)}
    </strong>
        <p>
            <button onClick={()=>setRunning(true)} disabled={running}>Démarrer</button> 
            <button onClick={()=>setRunning(false)} disabled={!running}>Pause</button> 
            <button onClick={()=>{setRunning(false);setPauseMode(false);setSeconds(25*60)}}>Réinitialiser</button>
        </p>
        <p>Sessions terminées : {sessions}</p>
        <audio ref={soundRef} src="/audio.mp3"/>
        </section>
        );
    }