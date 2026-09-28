import Navbar from "./components/Navbar";
import ObraDestacada from "./ObraDestacada";

function App() {
  return (
    <div className="min-h-screen bg-avb-bg text-avb-dark font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 md:p-12 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
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
    </div>
  );
}

export default App;
