export default function DureeBadge({ minutes }) {
  const rapide = minutes < 20;

  return (
    <span
      style={{
        background: rapide ? "#d8f5df" : "#ffe5c2",
        color: rapide ? "#176b2c" : "#9a4b00",
        padding: "4px 9px",
        borderRadius: 12
      }}
    >
      {rapide ? "Rapide" : "Long"} · {minutes} min
    </span>
  );
}
/*
import { useState } from "react";

import { recettes } from "./CC3/TP1/data/Recettes";
import RecipeCard from "./CC3/TP1/components/RecipeCard";

export default function App() {
  const [notes, setNotes] = useState({});

  function enregistrerNote(id, note) {
    setNotes(prev => ({
      ...prev,
      [id]: note
    }));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🍽️ Mes Recettes</h1>

      <p>Découvrez nos délicieuses recettes !</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 15
        }}
      >
        {recettes.map(recette => (
          <RecipeCard
            key={recette.id}
            recette={recette}
            onNote={enregistrerNote}
          />
        ))}
      </div>

      <hr />

      <h2>Mes notes</h2>

      {Object.entries(notes).length === 0 ? (
        <p>Aucune recette notée.</p>
      ) : (
        Object.entries(notes).map(([id, note]) => {
          const recette = recettes.find(r => r.id === Number(id));

          return (
            <p key={id}>
              {recette.titre} : {note}/5 ⭐
            </p>
          );
        })
      )}
    </div>
  );
}
*/