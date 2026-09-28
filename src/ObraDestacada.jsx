// src/ObraDestacada.jsx

function ObraDestacada({ titulo, referencia }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-left">
      <h4 className="font-semibold text-avb-blue mb-1">{titulo}</h4>
      <p className="text-xs text-slate-500">
        Código de Referencia:{" "}
        <strong className="font-medium text-slate-700">{referencia}</strong>
      </p>
    </div>
  );
}

export default ObraDestacada;
