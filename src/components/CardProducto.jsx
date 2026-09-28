export default function CardProducto({
  nombre,
  categoria,
  referencia,
  imagen,
  descripcion,
}) {
  // Construcción del mensaje precargado dinámico para WhatsApp (Regla de negocio AVB)
  const mensajeWhatsApp = encodeURIComponent(
    `Hola, deseo solicitar información y asesoría sobre la obra: ${nombre} (Código: ${referencia})`,
  );
  const urlWhatsApp = `https://wa.me/584120000000?text=${mensajeWhatsApp}`;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col h-full">
      {/* 1. Contenedor de Imagen con Efecto Zoom Hover */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge Flotante de Categoría */}
        {categoria && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-avb-blue text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200/80 shadow-xs">
            {categoria}
          </span>
        )}
      </div>

      {/* 2. Cuerpo de la Tarjeta */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Código de Referencia Técnico */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {referencia}
            </span>
          </div>

          {/* Nombre de la Obra */}
          <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-avb-blue transition-colors">
            {nombre}
          </h3>

          {/* Breve descripción o detalle técnico si existe */}
          {descripcion && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {descripcion}
            </p>
          )}
        </div>

        {/* 3. Botón de Conversión WhatsApp (Click-to-Chat) */}
        <div className="pt-2 border-t border-slate-100">
          <a
            href={urlWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all duration-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>Consultar Obra</span>
          </a>
        </div>
      </div>
    </article>
  );
}
