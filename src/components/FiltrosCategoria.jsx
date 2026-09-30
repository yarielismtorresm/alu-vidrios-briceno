export default function FiltrosCategoria({
  categorias,
  categoriaSeleccionada,
  onSeleccionarCategoria,
}) {
  return (
    <nav
      aria-label="Filtros de obras por categoría"
      className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10 px-2"
    >
      {categorias.map((categoria) => {
        const estaActivo = categoriaSeleccionada === categoria;

        return (
          <button
            key={categoria}
            type="button"
            onClick={() => onSeleccionarCategoria(categoria)}
            className={`cursor-pointer px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none ${
              estaActivo
                ? "bg-avb-blue text-white shadow-sm ring-2 ring-avb-blue/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {categoria}
          </button>
        );
      })}
    </nav>
  );
}
