export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Enlace directo a WhatsApp institucional (Regla de negocio AVB)
  const mensajeWhatsApp = encodeURIComponent(
    "Hola, deseo solicitar información sobre sus servicios de fabricación e instalación arquitectónica.",
  );
  const urlWhatsApp = `https://wa.me/584120000000?text=${mensajeWhatsApp}`;

  return (
    <footer id="contacto" className="bg-slate-900 text-slate-300">
      {/* Contenedor Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 1. Columna: Identidad y Conversión */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-avb-blue text-white font-bold text-lg w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
                AVB
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  Alu Vidrios Briceño
                </h3>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                  Obras Arquitectónicas
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Especialistas en diseño, fabricación e instalación de vidrio
              templado y carpintería de aluminio para proyectos a medida de alta
              exigencia.
            </p>

            {/* Botón WhatsApp */}
            <div className="pt-2">
              <a
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Chatear por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 2. Columna: Navegación Rápida */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#inicio"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span className="text-blue-500 font-bold">›</span> Inicio
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span className="text-blue-500 font-bold">›</span> Catálogo de
                  Obras
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span className="text-blue-500 font-bold">›</span> Sobre
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span className="text-blue-500 font-bold">›</span> Contacto y
                  Ubicación
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Columna: Taller y Ubicación */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Taller y Oficina
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Sector el Centro Valera.</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-blue-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+58 (412) 000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-blue-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>contacto@aluvidriosbriceno.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Columna: Horarios de Atención */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Horario de Atención
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Lunes a Viernes:</span>
                <span className="text-slate-200 font-medium">
                  8:00 AM – 5:00 PM
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Sábados:</span>
                <span className="text-slate-200 font-medium">
                  8:00 AM – 1:00 PM
                </span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Domingos y Feriados:</span>
                <span className="text-rose-400 font-medium">Cerrado</span>
              </div>
            </div>

            {/* Badge de Atención en Planta */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-3 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span>
                Atención presencial en taller previa cita o solicitud.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior (Bottom Bar / Copyright) */}
      <div className="border-t border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {currentYear} Alu Vidrios Briceño. Todos los derechos reservados.
          </p>
          <p className="text-center sm:text-right">
            Fabricación de obras arquitectónicas a medida en vidrio templado y
            aluminio.
          </p>
        </div>
      </div>
    </footer>
  );
}
