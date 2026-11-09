import { useState } from "react";
import CardProducto from "./CardProducto";
import FiltrosCategoria from "./FiltrosCategoria";

export default function CatalogoGeneral({
  obras = [],
  categorias = [],
  categoriaSeleccionada = "Todas",
  onSeleccionarCategoria,
  onVerDetalle,
}) {
  // Estado local para el buscador de texto en tiempo real
  const [busqueda, setBusqueda] = useState("");

  // Filtrado reactivo combinado: por Categoría Y por Texto de Búsqueda
  const obrasFiltradas = obras.filter((obra) => {
    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      obra.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase();

    const termino = busqueda.trim().toLowerCase();
    const coincideTexto =
      !termino ||
      obra.nombre.toLowerCase().includes(termino) ||
      obra.descripcion.toLowerCase().includes(termino) ||
      (obra.linea && obra.linea.toLowerCase().includes(termino)) ||
      (obra.especificaciones?.vidrio &&
        obra.especificaciones.vidrio.toLowerCase().includes(termino));

    return coincideCategoria && coincideTexto;
  });

  // Función para resetear todos los filtros
  const handleLimpiarFiltros = () => {
    setBusqueda("");
    if (onSeleccionarCategoria) {
      onSeleccionarCategoria("Todas");
    }
  };

  return (
    <main
      id="catalogo"
      className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
    >
      {/* 1. Miga de Pan (Breadcrumbs) */}
      <nav
        aria-label="Ruta de navegación"
        className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-8 bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl shadow-xs"
      >
        <a
          href="#inicio"
          className="hover:text-avb-blue font-medium transition-colors"
        >
          Inicio
        </a>
        <span className="text-slate-300">/</span>
        <button
          type="button"
          onClick={handleLimpiarFiltros}
          className={`cursor-pointer font-medium hover:text-avb-blue transition-colors ${
            categoriaSeleccionada === "Todas" && !busqueda
              ? "text-slate-900 font-bold"
              : "text-slate-500"
          }`}
        >
          Catálogo General
        </button>

        {categoriaSeleccionada !== "Todas" && (
          <>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">
              {categoriaSeleccionada}
            </span>
          </>
        )}

        {busqueda.trim() && (
          <>
            <span className="text-slate-300">/</span>
            <span className="text-avb-blue font-bold italic truncate max-w-[150px]">
              "{busqueda}"
            </span>
          </>
        )}
      </nav>

      {/* 2. Encabezado del Catálogo */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="text-[11px] uppercase tracking-widest font-extrabold text-avb-blue bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Portafolio de Obras AVB
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2 tracking-tight">
          Obras Arquitectónicas a Medida
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Explora nuestras soluciones en vidrio templado y perfiles de aluminio fabricadas con precisión milimétrica bajo norma NCh 135.
        </p>
      </div>

      {/* 3. Buscador de Texto en Tiempo Real */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          {/* Icono de Lupa */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por obra, tipo de vidrio, línea o perfil..."
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-xs focus:outline-hidden focus:border-avb-blue focus:ring-2 focus:ring-avb-blue/20 transition-all"
          />

          {/* Botón para Limpiar Búsqueda */}
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda("")}
              className="cursor-pointer absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Limpiar búsqueda"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 4. Barra de Filtros por Categoría */}
      <FiltrosCategoria
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        onSeleccionarCategoria={onSeleccionarCategoria}
      />

      {/* 5. Barra de Resultados / Contador */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>
            Mostrando{" "}
            <strong className="text-slate-900 font-bold">
              {obrasFiltradas.length}
            </strong>{" "}
            {obrasFiltradas.length === 1 ? "obra" : "obras"}
            {categoriaSeleccionada !== "Todas" && (
              <> en <span className="text-avb-blue font-semibold">{categoriaSeleccionada}</span></>
            )}
            {busqueda.trim() && (
              <> para "<span className="text-slate-700 font-semibold">{busqueda}</span>"</>
            )}
          </span>
        </div>

        {(categoriaSeleccionada !== "Todas" || busqueda.trim()) && (
          <button
            type="button"
            onClick={handleLimpiarFiltros}
            className="cursor-pointer text-avb-blue hover:text-blue-800 font-semibold text-xs flex items-center gap-1 hover:underline"
          >
            <span>Ver todo</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>

      {/* 6. Cuadrícula de Obras o Estado Vacío */}
      {obrasFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {obrasFiltradas.map((obra) => (
            <CardProducto
              key={obra.id}
              obra={obra}
              onVerDetalle={onVerDetalle}
            />
          ))}
        </div>
      ) : (
        /* Estado Vacío (Empty State) Amigable */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-avb-blue">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            No se encontraron obras
          </h3>
          <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto leading-relaxed">
            No hay proyectos que coincidan con los criterios de búsqueda actuales. Intenta con otros términos o restablece los filtros.
          </p>
          <button
            type="button"
            onClick={handleLimpiarFiltros}
            className="cursor-pointer inline-flex items-center gap-2 bg-avb-blue hover:bg-blue-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <span>Restablecer Filtros y Ver Catálogo</span>
          </button>
        </div>
      )}
    </main>
  );
}
