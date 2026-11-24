export default function Stars({ valeur, onChange }) {
  return (
    <div aria-label={`Note : ${valeur} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} étoiles`}
          style={{
            border: 0,
            background: "none",
            fontSize: 25,
            cursor: "pointer",
            color: n <= valeur ? "#f5a623" : "#bbb"
          }}
        >
          {n <= valeur ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}