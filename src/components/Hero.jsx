export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-avb-bg py-16 md:py-24 border-b border-slate-200"
    >
      {/* Contenedor principal centrado */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Mensaje y Propuesta de Valor (7 columnas en desktop) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Insignia / Badge Superior */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-avb-blue text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Especialistas en Vidrio Templado y Aluminio
            </div>

            {/* Titular Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-avb-dark leading-[1.15]">
              Transformamos espacios con{" "}
              <span className="text-avb-blue">obras arquitectónicas</span> a
              medida
            </h1>

            {/* Subtítulo / Propuesta de Valor */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Diseño, fabricación e instalación de fachadas integrales,
              ventanales corredizos y divisiones comerciales de alta
              resistencia. Calidad y precisión para tus proyectos.
            </p>

            {/* Botones de Acción (CTAs) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Botón Principal: Conversión WhatsApp */}
              <a
                href="https://wa.me/584120000000?text=Hola,%20deseo%20solicitar%20asesoría%20para%20un%20proyecto%20arquitectónico%20a%20medida"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Solicitar Asesoría</span>
              </a>

              {/* Botón Secundario: Explorar Catálogo */}
              <a
                href="#catalogo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200 shadow-xs"
              >
                <span>Ver Catálogo</span>
                <svg
                  className="w-4 h-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>

            {/* Pilares Técnicos de Confianza */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-avb-blue">
                  100%
                </p>
                <p className="text-xs text-slate-500 font-medium">A Medida</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-avb-blue">
                  Templado
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Vidrio de Seguridad
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-avb-blue">
                  Garantía
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Perfilería de Aluminio
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Visual Arquitectónica (5 columnas en desktop) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Fondo decorativo con gradiente y sombra */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-avb-blue to-emerald-500 rounded-3xl opacity-20 blur-xl" />

              {/* Tarjeta principal */}
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
                {/* Cabecera de la tarjeta */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-avb-blue flex items-center justify-center text-white font-bold text-sm">
                      AVB
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-tight">
                        Obras a Medida
                      </h4>
                      <p className="text-xs text-slate-500">
                        Fabricación e Instalación
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Activo
                  </span>
                </div>

                {/* Lista de especialidades */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Fachadas Integrales
                    </span>
                    <span className="text-xs font-semibold text-avb-blue bg-blue-50 px-2 py-0.5 rounded">
                      Templado 10mm
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Ventanales Corredizos
                    </span>
                    <span className="text-xs font-semibold text-avb-blue bg-blue-50 px-2 py-0.5 rounded">
                      Línea Europea
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Divisiones de Oficina
                    </span>
                    <span className="text-xs font-semibold text-avb-blue bg-blue-50 px-2 py-0.5 rounded">
                      Vidrio Acústico
                    </span>
                  </div>
                </div>

                {/* Pie de la tarjeta */}
                <div className="bg-avb-bg rounded-xl p-4 border border-slate-200 text-center">
                  <p className="text-xs text-slate-600">
                    ¿Tienes un plano o diseño previo? Recibe asesoramiento
                    técnico directo con nuestro equipo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
