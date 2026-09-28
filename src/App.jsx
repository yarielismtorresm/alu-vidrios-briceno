import ObraDestacada from "./ObraDestacada";

function App() {
  return (
    <main className="min-h-screen bg-avb-bg text-avb-dark font-sans p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Encabezado con Tipografía Inter y Azul Corporativo */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-avb-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Identidad Visual
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-avb-blue mt-3 mb-2">
            Alu Vidrios Briceño
          </h1>
          <p className="text-slate-600 font-normal">
            Vidrio templado para obras arquitectónicas a medida.
          </p>
        </div>

        {/* Muestrario de Paleta de Colores Institucional (3 Colores Principales) */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Paleta de Colores Institucional
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {/* 1. Azul Corporativo */}
            <div className="p-3 bg-avb-blue text-white rounded-xl shadow-xs">
              <div className="h-8 w-full bg-white/20 rounded-md mb-2 flex items-center justify-center font-bold text-xs">
                #0D47A1
              </div>
              <span className="text-xs font-medium">Azul Corporativo</span>
            </div>

            {/* 2. Perfilería / Texto */}
            <div className="p-3 bg-avb-dark text-white rounded-xl shadow-xs">
              <div className="h-8 w-full bg-white/20 rounded-md mb-2 flex items-center justify-center font-bold text-xs">
                #1F2937
              </div>
              <span className="text-xs font-medium">Perfilería / Texto</span>
            </div>

            {/* 3. Fondo Neutro */}
            <div className="p-3 bg-avb-bg border border-slate-300 text-avb-dark rounded-xl shadow-xs">
              <div className="h-8 w-full bg-slate-200 rounded-md mb-2 flex items-center justify-center font-bold text-xs text-slate-700">
                #F8FAFC
              </div>
              <span className="text-xs font-medium">Fondo Neutro</span>
            </div>
          </div>
        </section>

        {/* Muestrario de Componente con Tokens AVB */}
        <section className="border-t border-slate-100 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Ejemplo de Obras con Tokens AVB
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
        </section>
      </div>
    </main>
  );
}

export default App;
