import { useState, useEffect } from "react";

export default function FichaTecnica({
  obra,
  todasLasObras = [],
  onVolver,
  onSeleccionarObra,
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [obra]);

  const listaFotos = obra.imagenesDetalle || [
    { url: obra.imagen, label: "Vista general" },
    ...(obra.imagenes || []).map((img, i) => ({
      url: img,
      label: `Detalle ${i + 1}`,
    })),
  ];

  const [fotoActiva, setFotoActiva] = useState(0);
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(
    obra.formatos?.[1]?.nombre || "90 x 195 cm (Estándar Confort)"
  );
  const [espesorSeleccionado, setEspesorSeleccionado] = useState(
    obra.espesores?.[0] || "8MM TEMPLADO NCH135"
  );

  // Mensaje dinámico sin código de referencia
  const mensajeWhatsApp = encodeURIComponent(
    `Hola Norma Matheus / Alu Vidrios Briceño, me interesa cotizar la obra "${obra.nombre}". Formato: ${formatoSeleccionado}, Espesor: ${espesorSeleccionado}. ¿Podría brindarme asesoría técnica y coordinar una visita para toma de medidas en mi domicilio?`
  );
  const urlWhatsApp = `https://wa.me/584120000000?text=${mensajeWhatsApp}`;

  const obrasRelacionadas = todasLasObras
    .filter((item) => item.id !== obra.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-slate-800">
      {/* 1. Breadcrumbs limpios */}
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <nav aria-label="Ruta de navegación" className="flex items-center flex-wrap gap-1.5 font-medium text-slate-500">
            <button
              onClick={onVolver}
              className="cursor-pointer hover:text-avb-blue transition-colors uppercase"
            >
              Inicio
            </button>
            <span>/</span>
            <button
              onClick={onVolver}
              className="cursor-pointer hover:text-avb-blue transition-colors uppercase"
            >
              Catálogo de Obras
            </button>
            <span>/</span>
            <span className="uppercase text-slate-600">{obra.categoria}</span>
            <span>/</span>
            <span className="font-bold text-slate-900 uppercase">
              {obra.nombre}
            </span>
          </nav>

          <div className="flex items-center gap-4 text-slate-600 font-semibold text-[11px] tracking-wide uppercase">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>NORMA NCH 135 OF.2001</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-avb-blue" />
              <span>A MEDIDA & TALLER CNC</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cuerpo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* COLUMNA IZQUIERDA: Galería */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-4/3 w-full bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <img
                src={listaFotos[fotoActiva]?.url || obra.imagen}
                alt={obra.nombre}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                  OBRA REAL TALLER AVB
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  GARANTÍA CERTIFICADA 2 AÑOS
                </span>
              </div>

              <div className="absolute bottom-3 right-4 bg-slate-900/70 backdrop-blur-md text-white/90 text-xs px-3 py-1 rounded-md">
                Espesor Cristal: {obra.especificaciones?.vidrio || "8mm / 10mm Templado"}
              </div>
            </div>

            {/* Fila de Miniaturas */}
            <div className="grid grid-cols-4 gap-3">
              {listaFotos.map((foto, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFotoActiva(index)}
                  className={`cursor-pointer group relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all ${
                    fotoActiva === index
                      ? "border-avb-blue ring-2 ring-avb-blue/20"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={foto.url}
                    alt={foto.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] py-1 text-center font-medium truncate px-1">
                    {foto.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Certificación de Taller */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-avb-blue shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Fabricación y Montaje Certificado por AVB
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Todos nuestros cristales templados son procesados térmicamente con horno horizontal de última generación, garantizando planimetría óptica y resistencia 5 veces superior al vidrio común.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Ficha & Cotizador */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1.5 border-b border-slate-200 pb-5">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                {obra.linea || "LÍNEA ARQUITECTÓNICA A MEDIDA"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {obra.nombre}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {obra.descripcion}
              </p>
            </div>

            {/* Selector: Formato de Panel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
                <span>FORMATO DE PANEL SOLICITADO</span>
                <span className="text-avb-blue">{formatoSeleccionado}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {(
                  obra.formatos || [
                    { nombre: "80 x 190 cm", sub: "Espacio Compacto" },
                    { nombre: "90 x 195 cm", sub: "Más Elegido ★" },
                    { nombre: "100 x 200 cm", sub: "Gran Formato Hotel" },
                    { nombre: "A Medida Libre", sub: "Toma en Terreno" },
                  ]
                ).map((fmt) => {
                  const esActivo =
                    formatoSeleccionado === fmt.nombre ||
                    formatoSeleccionado.includes(fmt.nombre);
                  return (
                    <button
                      key={fmt.nombre}
                      type="button"
                      onClick={() => setFormatoSeleccionado(fmt.nombre)}
                      className={`cursor-pointer text-left p-3 rounded-xl border text-xs transition-all ${
                        esActivo
                          ? "border-avb-blue bg-blue-50/50 ring-2 ring-avb-blue/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <strong className="block font-bold text-slate-800">
                        {fmt.nombre}
                      </strong>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {fmt.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector: Espesor */}
            <div className="space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                ESPESOR & CALIDAD ÓPTICA
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {(
                  obra.espesores || [
                    "8MM TEMPLADO NCH135",
                    "10MM DIAMANT ANTI-CAL",
                  ]
                ).map((esp) => {
                  const esActivo = espesorSeleccionado === esp;
                  return (
                    <button
                      key={esp}
                      type="button"
                      onClick={() => setEspesorSeleccionado(esp)}
                      className={`cursor-pointer p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                        esActivo
                          ? "border-avb-blue bg-blue-50/50 text-avb-blue ring-2 ring-avb-blue/20"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {esp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cotización Directa con WhatsApp */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-800">
                  Cotización Directa con Norma Matheus
                </h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Al presionar el botón se abrirá WhatsApp con un mensaje prediseñado dirigido a Norma Matheus para una cotización inmediata y coordinación técnica.
              </p>

              {/* Mensaje Automático en Vivo */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                  // Mensaje automático para taller AVB:
                </span>
                <p className="text-xs italic text-slate-700 leading-relaxed">
                  "Hola Norma Matheus / Alu Vidrios Briceño, me interesa cotizar la obra {obra.nombre}. Formato: {formatoSeleccionado}, Espesor: {espesorSeleccionado}. ¿Podría brindarme asesoría técnica y coordinar una visita para toma de medidas en mi domicilio?"
                </p>
              </div>

              {/* Botón WhatsApp */}
              <a
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 bg-avb-blue hover:bg-blue-800 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>COTIZAR POR WHATSAPP AHORA</span>
              </a>

              {/* Botón Descargar Ficha */}
              <button
                type="button"
                onClick={() => window.print()}
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>DESCARGAR FICHA TÉCNICA OFICIAL PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Catálogo Complementario */}
        {obrasRelacionadas.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs uppercase font-mono font-bold text-slate-400">
                  // Catálogo Complementario
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Obras Relacionadas del Taller
                </h3>
              </div>

              <button
                type="button"
                onClick={onVolver}
                className="cursor-pointer text-xs font-bold uppercase tracking-wider text-avb-blue hover:underline flex items-center gap-1"
              >
                <span>VER TODO EL CATÁLOGO</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {obrasRelacionadas.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden relative">
                    <img
                      src={rel.imagen}
                      alt={rel.nombre}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {rel.categoria}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {rel.nombre}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {rel.descripcion}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-medium text-slate-500">
                        Fabricación a Medida
                      </span>
                      <button
                        type="button"
                        onClick={() => onSeleccionarObra(rel)}
                        className="cursor-pointer font-bold text-avb-blue hover:underline"
                      >
                        Ver Ficha ›
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
