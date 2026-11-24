import { useRef, useState } from 'react';
export default function AudioPlayer(){
    const audioRef=useRef(null);
    const [volume,setVolume]=useState(0.7);
    function vol(v){setVolume(v);if(audioRef.current)audioRef.current.volume=Number(v)}
    return (
    <section>
        <h2>Lecteur audio</h2>
        <audio ref={audioRef} src="/audio.mp3"/>
        <button onClick={()=>audioRef.current?.play()}>Lecture</button>
        <button onClick={()=>audioRef.current?.pause()}>Pause</button> 
        <button onClick={()=>{if(audioRef.current){audioRef.current.pause();
        audioRef.current.currentTime=0}}}>Stop</button>
        <label> Volume 
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={e=>vol(e.target.value)}/>
        </label>
        <p>Ajoutez public/audio.mp3 pour tester la lecture.</p>
        </section>
        );
    }
/*
import AudioPlayer from './AudioPlayer';
import Pomodoro from './Pomodoro';
export default function App(){
    return (
    <main style={{padding:20,fontFamily:'Arial'}}>
        <h1>Pomodoro et lecteur audio</h1>
        <AudioPlayer/>
        <hr/><Pomodoro/>
    </main>
    );
}

*/
