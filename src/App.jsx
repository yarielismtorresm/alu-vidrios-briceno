import { useState } from "react";
import ObraDestacada from "./ObraDestacada";

function App() {
  const [mostrarContacto, setMostrarContacto] = useState(false);
  const toggleContacto = () => setMostrarContacto(!mostrarContacto);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6">
      {/* Tarjeta Principal de Bienvenida */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        {/* Encabezado Corporativo */}
        <h1 className="text-3xl font-bold text-avb-blue mb-2">
          Alu Vidrios Briceño
        </h1>
        <p className="text-slate-600 mb-6">
          Vidrio templado para obras arquitectónicas a medida.
        </p>

        {/* Botón con Estado Interactivo */}
        <button
          type="button"
          onClick={toggleContacto}
          className="bg-avb-blue hover:bg-blue-900 text-white font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          {mostrarContacto ? "Ocultar información" : "Ver canales de atención"}
        </button>

        {/* Bloque Condicional */}
        {mostrarContacto && (
          <div className="mt-6 p-4 bg-slate-50 border border-emerald-500/30 rounded-xl text-left">
            <h3 className="font-semibold text-emerald-600 flex items-center gap-2 mb-1">
              💬 Cotizaciones por WhatsApp
            </h3>
            <p className="text-sm text-slate-600">
              Fabricación a medida sin precios genéricos. Cada proyecto se
              cotiza de forma personalizada según tus planos y medidas.
            </p>
          </div>
        )}

        {/* Sección de Obras Destacadas */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 text-left">
            🏗️ Obras en Exhibición
          </h2>
          <div className="space-y-3">
            <ObraDestacada
              titulo="Fachada Integral Vidrio Templado"
              referencia="AVB-FACH-01"
            />
            <ObraDestacada
              titulo="Ventanal Corredizo Línea Europea"
              referencia="AVB-VENT-02"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
