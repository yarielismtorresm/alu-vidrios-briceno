export default function CardProducto({ obra, onVerDetalle }) {
  const { nombre, categoria, imagen, descripcion, especificaciones } = obra;

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, deseo solicitar información sobre la obra: ${nombre}`
  );
  const urlWhatsApp = `https://wa.me/584120000000?text=${mensajeWhatsApp}`;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full">
      {/* 1. Cabecera limpia con Categoría y Tipo de Vidrio */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs font-semibold">
        <span className="text-avb-blue uppercase tracking-wide">
          {categoria}
        </span>
        <span className="text-slate-500 text-[11px] font-medium">
          [ {especificaciones?.vidrio?.split(" ")[0] || "8MM"} / 10MM ]
        </span>
      </div>

      {/* 2. Contenedor de Imagen con Efecto Hover y Trigger a Ficha Técnica */}
      <div
        className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onVerDetalle(obra)}
      >
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge Inferior: Fabricación a Medida */}
        <span className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
          A Medida
        </span>
      </div>

      {/* 3. Cuerpo de la Tarjeta */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            {especificaciones?.vidrio || "Cristal Templado de Seguridad"}
          </span>

          <h3
            onClick={() => onVerDetalle(obra)}
            className="cursor-pointer text-base sm:text-lg font-bold text-slate-800 leading-snug group-hover:text-avb-blue transition-colors line-clamp-1"
          >
            {nombre}
          </h3>

          {descripcion && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {descripcion}
            </p>
          )}
        </div>

        {/* 4. Botones de Acción */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onVerDetalle(obra)}
            className="cursor-pointer inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors duration-200 uppercase"
          >
            <span>VER FICHA</span>
          </button>

          <a
            href={urlWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${nombre} por WhatsApp`}
            className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-avb-blue hover:bg-blue-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs hover:shadow transition-all duration-200 uppercase"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>COTIZAR</span>
          </a>
        </div>
      </div>
    </article>
  );
}
