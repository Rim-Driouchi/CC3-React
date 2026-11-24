import { useState } from "react";
import Stars from "./Stars";
import DureeBadge from "./DureeBadge";

export default function RecipeCard({ recette, onNote }) {
  const [note, setNote] = useState(0);
  const [ouvert, setOuvert] = useState(false);

  function changerNote(n) {
    setNote(n);
    onNote(recette.id, n);
  }

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 14,
        margin: 8,
        width: 250
      }}
    >
      <img
        src={recette.image}
        alt={recette.titre}
        style={{
          width: "100%",
          height: 130,
          objectFit: "cover",
          borderRadius: 8
        }}
      />

      <h3>{recette.titre}</h3>

      <DureeBadge minutes={recette.duree} />

      <Stars valeur={note} onChange={changerNote} />

      <button onClick={() => setOuvert(v => !v)}>
        Ingrédients {ouvert ? "▲" : "▼"}
      </button>

      {ouvert && (
        <ul>
          {recette.ingredients.map(i => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </article>
  );
}