import { useState } from "react";
import logoAvb from "../assets/logo-avb.png";
import { WHATSAPP_CONFIG } from "../utils/whatsapp";

export default function ResumenAdmin({
  obras = [],
  onLogout,
  onVerSitioPublico,
}) {
  // Estado para la opción seleccionada del menú lateral
  const [seccionActiva, setSeccionActiva] = useState("dashboard");
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  // Cálculos dinámicos reales del catálogo
  const totalObras = obras.length;
  const listaCategorias = [...new Set(obras.map((o) => o.categoria))];
  const totalCategorias = listaCategorias.length;

  // Opciones del Menú Lateral (Sidebar)
  const menuOpciones = [
    {
      id: "dashboard",
      nombre: "Dashboard / Resumen",
      icono: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: "productos",
      nombre: "Catálogo de Productos",
      icono: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: "categorias",
      nombre: "Categorías",
      icono: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      id: "usuarios",
      nombre: "Usuarios",
      icono: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: "configuracion",
      nombre: "Configuración",
      icono: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  // Tarjetas de Métricas (KPIs)
  const metricasKPI = [
    {
      id: "obras",
      titulo: "Obras Publicadas",
      valor: totalObras.toString(),
      subtexto: "Visibles en catálogo público",
      colorIcono: "text-avb-blue bg-blue-50 border-blue-200",
      icono: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "categorias",
      titulo: "Categorías de Obras",
      valor: totalCategorias.toString(),
      subtexto: listaCategorias.slice(0, 2).join(", ") + "...",
      colorIcono: "text-indigo-600 bg-indigo-50 border-indigo-200",
      icono: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      id: "canal",
      titulo: "Canal de Cotización",
      valor: "WhatsApp",
      subtexto: `${WHATSAPP_CONFIG.contacto} (${WHATSAPP_CONFIG.telefonoVisible})`,
      colorIcono: "text-emerald-600 bg-emerald-50 border-emerald-200",
      icono: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* 1. SIDEBAR / MENÚ LATERAL (Fiel al diseño de la imagen)  */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          menuMovilAbierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Tarjeta Superior Blanca: Logo e Identidad */}
          <div className="bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-md">
            <div className="bg-avb-blue p-1 rounded-lg shrink-0">
              <img
                src={logoAvb}
                alt="Alu Vidrios Briceño"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold text-[#121846] tracking-tight uppercase leading-tight">
                AVB PANEL
              </h2>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                ARQUITECTURA & VIDRIO
              </p>
            </div>
          </div>

          {/* Menú de Opciones */}
          <nav className="space-y-1.5" aria-label="Menú administrativo">
            {menuOpciones.map((opcion) => {
              const estaActivo = seccionActiva === opcion.id;

              return (
                <button
                  key={opcion.id}
                  type="button"
                  onClick={() => {
                    setSeccionActiva(opcion.id);
                    setMenuMovilAbierto(false);
                  }}
                  className={`cursor-pointer w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    estaActivo
                      ? "bg-avb-blue text-white shadow-md shadow-blue-950/40 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className={estaActivo ? "text-white" : "text-slate-400"}>
                    {opcion.icono}
                  </span>
                  <span>{opcion.nombre}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tarjeta Inferior de Perfil de Usuario con Botón de Salida */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            {/* Nombre y Rol */}
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block leading-tight truncate">
                {WHATSAPP_CONFIG.contacto}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                ADMIN AVB
              </span>
            </div>
          </div>

          {/* Botón Salir / Logout */}
          <button
            type="button"
            onClick={onLogout}
            title="Cerrar Sesión"
            className="cursor-pointer text-slate-400 hover:text-rose-400 hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Backdrop oscuro para móvil cuando el sidebar está abierto */}
      {menuMovilAbierto && (
        <div
          onClick={() => setMenuMovilAbierto(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}


      {/* 2. CONTENIDO PRINCIPAL (Derecha)                         */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Barra Superior Móvil / Desktop */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {/* Botón Hamburguesa Móvil */}
            <button
              type="button"
              onClick={() => setMenuMovilAbierto(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                Panel de Administración
              </h1>
              <p className="text-xs text-slate-500">
                Taller Central Valera • Alu Vidrios Briceño
              </p>
            </div>
          </div>

          {/* Botón Ver Sitio Público */}
          <button
            type="button"
            onClick={onVerSitioPublico}
            className="cursor-pointer inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Ver Sitio Público</span>
          </button>
        </header>

        {/* Cuerpo del Dashboard */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full">
          {/* Encabezado de Bienvenida */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-avb-blue">
                Resumen Operativo
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Catálogo y Cotizaciones en Vivo
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Monitoreo del catálogo de obras y canal directo de WhatsApp.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-medium self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Canal WhatsApp Activo</span>
            </div>
          </div>

          {/* Tarjetas de Métricas (KPIs) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {metricasKPI.map((kpi) => (
              <div
                key={kpi.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      {kpi.titulo}
                    </span>
                    <strong className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
                      {kpi.valor}
                    </strong>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${kpi.colorIcono}`}>
                    {kpi.icono}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 truncate">
                  {kpi.subtexto}
                </div>
              </div>
            ))}
          </div>

          {/* Obras Publicadas en el Catálogo */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Obras Publicadas en el Catálogo
                </h3>
                <p className="text-xs text-slate-500">
                  Proyectos visibles para los clientes en el sitio web
                </p>
              </div>
              <span className="text-xs font-bold text-avb-blue bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                {totalObras} Obras
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {obras.map((obra) => (
                <div
                  key={obra.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={obra.imagen}
                      alt={obra.nombre}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {obra.nombre}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Categoría: <span className="font-medium text-slate-700">{obra.categoria}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0">
                    ● En Catálogo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
