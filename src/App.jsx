import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ObraDestacada from "./ObraDestacada";

function App() {
  return (
    <div className="min-h-screen bg-avb-bg text-avb-dark font-sans flex flex-col">
      {/* 1. Barra de Navegación */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Contenido Principal */}
      <main className="flex-1 p-6 md:p-12 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <section className="pt-2">
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
