import { useState } from "react";
import logoAvb from "../assets/logo-avb.png";
import { WHATSAPP_CONFIG } from "../utils/whatsapp";
import FormularioObra from "./FormularioObra";
import FormularioCategoria from "./FormularioCategoria";
import GestionUsuarios from "./GestionUsuarios";

// Abrir el modal y recibir props para crear/editar

export default function ResumenAdmin({
  obras = [],
  categorias = [],
  onGuardarObra,
  onToggleCategoria,
  onGuardarCategoria,
  onLogout,
  onVerSitioPublico,
}) {
  // Estado para la opción seleccionada del menú lateral
  const [seccionActiva, setSeccionActiva] = useState("dashboard");
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  // Estados para el Modal de Formulario
    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [obraEnEdicion, setObraEnEdicion] = useState(null);

  // Estados para Modal de Categoría
  const [modalCategoriaAbierto, setModalCategoriaAbierto] = useState(false);
  const [categoriaEnEdicion, setCategoriaEnEdicion] = useState(null);

  // Estados de Búsqueda y Filtros en la vista de Catálogo
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  // Cálculos dinámicos reales del catálogo
  const totalObras = obras.length;
  const totalCategorias = categorias.length;
  const categoriasActivas = categorias.filter((c) => c.activa).length;
  const categoriasInactivas = totalCategorias - categoriasActivas;
  const listaNombresCategorias = categorias.map((c) => c.nombre);

  // Filtrado de obras para la tabla de productos
  const obrasFiltradas = obras.filter((obra) => {
    const coincideNombre = obra.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaFiltro === "Todas" || obra.categoria === categoriaFiltro;
    return coincideNombre && coincideCategoria;
  });

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
      subtexto: listaNombresCategorias.slice(0, 2).join(", ") + "...",
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

        {/* VISTA 1: CATÁLOGO DE PRODUCTOS (Fiel al Wireframe)   */}

        {seccionActiva === "productos" && (
          <div className="space-y-6">
            {/* Encabezado y Botones de Acción */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-avb-blue text-[11px] font-bold px-3 py-1 rounded-full mb-2 border border-blue-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Inventario General • AVB-PROD-2025</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Catálogo de Productos
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
                  Gestión y control integral de las soluciones arquitectónicas, perfiles y cristales cargados en el catálogo de taller.
                </p>
              </div>

              {/* Botón Agregar Nuevo Producto */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setObraEnEdicion(null);
                    setFormularioAbierto(true);
                  }}
                  className="cursor-pointer bg-avb-blue hover:bg-blue-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-900/20"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>+ Agregar Nuevo Producto</span>
                </button>
              </div>
            </div>

            {/* Tarjeta de Métrica: Total Registrados */}
            <div className="w-full sm:w-64 bg-white p-5 rounded-2xl shadow-xs border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  TOTAL REGISTRADOS
                </span>
                <div className="p-1.5 bg-blue-50 text-avb-blue rounded-lg border border-blue-100">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {totalObras}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  modelos en base de datos
                </span>
              </div>
            </div>

            {/* Barra de Búsqueda y Filtros */}
            <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre, código de referencia o tipo..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 outline-none focus:border-avb-blue focus:ring-1 focus:ring-avb-blue"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
                  className="flex-1 md:flex-none px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none"
                >
                  <option value="Todas">Todas las Categorías</option>
                  {listaNombresCategorias.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  className="flex-1 md:flex-none px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none"
                >
                  <option>Todos los Estados</option>
                  <option>En Catálogo</option>
                </select>
              </div>
            </div>

            {/* Tabla de Productos Estilizada */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">PRODUCTO Y MODELO</th>
                      <th className="py-3.5 px-5">CATEGORÍA</th>
                      <th className="py-3.5 px-5">ESPECIFICACIONES DE CRISTAL</th>
                      <th className="py-3.5 px-5 text-right">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {obrasFiltradas.length > 0 ? (
                      obrasFiltradas.map((obra) => (
                        <tr key={obra.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Producto y Foto */}
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3.5">
                              <img
                                src={obra.imagen}
                                alt={obra.nombre}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <span className="font-bold text-slate-900 text-sm">
                                {obra.nombre}
                              </span>
                            </div>
                          </td>

                          {/* Categoría Badge */}
                          <td className="py-4 px-5">
                            <span className="inline-block bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg text-[11px] border border-slate-200">
                              {obra.categoria}
                            </span>
                          </td>

                          {/* Especificaciones */}
                          <td className="py-4 px-5 max-w-xs">
                            <div className="text-slate-800 font-medium">
                              {obra.especificaciones?.vidrio || "Cristal Templado NCh 135"}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {obra.especificaciones?.perfileria || "Aluminio de Alta Gama"}
                            </div>
                          </td>

                          {/* Botón Editar */}
                          <td className="py-4 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setObraEnEdicion(obra);
                                setFormularioAbierto(true);
                              }}
                              className="cursor-pointer text-xs font-bold text-avb-blue hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-10 text-slate-400 text-xs">
                          No se encontraron productos que coincidan con la búsqueda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pie de Tabla / Paginación */}
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <span>
                  Mostrando 1 a {obrasFiltradas.length} de {totalObras} productos registrados
                </span>
                <div className="flex items-center gap-1.5">
                  <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-50">
                    Anterior
                  </button>
                  <button type="button" className="px-3 py-1 rounded-lg bg-avb-blue text-white font-bold">
                    1
                  </button>
                  <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-50">
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* VISTA 2: DASHBOARD / RESUMEN GENERAL                 */}

        {seccionActiva === "dashboard" && (
          <div className="space-y-8">
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

            {/* Vista rápida de obras en Dashboard */}
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
                {obras.slice(0, 4).map((obra) => (
                  <div
                    key={obra.id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={obra.imagen}
                        alt={obra.nombre}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
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
          </div>
        )}


        {/* VISTA 3:  GESTIÓN DE CATEGORÍAS CON TARJETAS Y SWITCH        */}

        {seccionActiva === "categorias" && (
        <div className="space-y-6">
                    {/* Encabezado y Botón Nueva Categoría */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-avb-blue text-[11px] font-bold px-3 py-1 rounded-full mb-2 border border-blue-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Control de Líneas Arquitectónicas</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                          Gestión de Categorías
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
                          Administra las líneas de productos, su visibilidad en el catálogo web y las especificaciones técnicas asociadas.
                        </p>
                      </div>

                      {/* Botón Crear Categoría */}
                      <button
                        type="button"
                        onClick={() => {
                          setCategoriaEnEdicion(null);
                          setModalCategoriaAbierto(true);
                        }}
                        className="cursor-pointer bg-avb-blue hover:bg-blue-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-900/20"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>+ Nueva Categoría</span>
                      </button>
                    </div>

                    {/* Tarjetas de Métricas de Categorías */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Categorías</span>
                          <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalCategorias}</div>
                        </div>
                        <div className="p-2.5 bg-blue-50 text-avb-blue rounded-xl border border-blue-100">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Activas en Catálogo</span>
                          <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{categoriasActivas}</div>
                        </div>
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Ocultas / Inactivas</span>
                          <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{categoriasInactivas}</div>
                        </div>
                        <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Cuadrícula de Tarjetas de Categorías */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorias.map((cat) => {
                        const obrasAsociadas = obras.filter(
                          (o) => o.categoria.toLowerCase() === cat.nombre.toLowerCase()
                        ).length;

                        return (
                          <div
                            key={cat.id}
                            className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between shadow-xs ${
                              cat.activa
                                ? "border-slate-200 hover:border-avb-blue hover:shadow-md"
                                : "border-slate-200 bg-slate-50/60 opacity-80"
                            }`}
                          >
                            <div>
                              {/* Cabecera de la Tarjeta con Switch */}
                              <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                                      cat.activa
                                        ? "bg-blue-50 text-avb-blue border border-blue-100"
                                        : "bg-slate-200 text-slate-500"
                                    }`}
                                  >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                                      {cat.nombre}
                                    </h3>
                                    <span className="text-[11px] font-bold text-slate-400">
                                      ID: CAT-0{cat.id}
                                    </span>
                                  </div>
                                </div>

                                {/* SWITCH TOGGLE DE ESTADO */}
                                <div className="flex flex-col items-end">
                                  <button
                                    type="button"
                                    role="switch"
                                    aria-checked={cat.activa}
                                    onClick={() => onToggleCategoria && onToggleCategoria(cat.id)}
                                    className={`cursor-pointer relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                                      cat.activa ? "bg-emerald-500" : "bg-slate-300"
                                    }`}
                                  >
                                    <span
                                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                                        cat.activa ? "translate-x-6" : "translate-x-1"
                                      }`}
                                    />
                                  </button>
                                  <span
                                    className={`text-[10px] font-extrabold uppercase tracking-wider mt-1 ${
                                      cat.activa ? "text-emerald-600" : "text-slate-400"
                                    }`}
                                  >
                                    {cat.activa ? "Pública" : "Oculta"}
                                  </span>
                                </div>
                              </div>

                              {/* Descripción */}
                              <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
                                {cat.descripcion}
                              </p>
                            </div>

                            {/* Pie de Tarjeta con Contador de Obras y Botón Editar */}
                            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                <span className="w-2 h-2 rounded-full bg-avb-blue" />
                                <span>{obrasAsociadas} {obrasAsociadas === 1 ? "Obra" : "Obras"} asociadas</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setCategoriaEnEdicion(cat);
                                  setModalCategoriaAbierto(true);
                                }}
                                className="cursor-pointer text-xs font-bold text-avb-blue hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Editar
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              {/* VISTA 4: GESTIÓN DE USUARIOS Y ROLES (ISSUE #22) */}
                {seccionActiva === "usuarios" && <GestionUsuarios />}

         </main>
      </div>

      {/* Modal de Formulario (Crear / Editar) */}
      {formularioAbierto && (
              <FormularioObra
                obraAEditar={obraEnEdicion}
                categoriasDisponibles={listaNombresCategorias}
                onCerrar={() => {
                  setFormularioAbierto(false);
                  setObraEnEdicion(null);
                }}
                onGuardar={(obraGuardada) => {
                  if (onGuardarObra) {
                    onGuardarObra(obraGuardada);
                  }
                  setFormularioAbierto(false);
                  setObraEnEdicion(null);
                }}
              />
            )}

            {/* MODAL PARA AGREGAR / EDITAR CATEGORÍA */}
            {modalCategoriaAbierto && (
              <FormularioCategoria
                        categoriaAEditar={categoriaEnEdicion}
                        categoriasExistentes={categorias}
                        onCerrar={() => {
                          setModalCategoriaAbierto(false);
                          setCategoriaEnEdicion(null);
                        }}
                        onGuardar={(categoriaGuardada) => {
                          if (onGuardarCategoria) {
                            onGuardarCategoria(categoriaGuardada);
                          }
                          setModalCategoriaAbierto(false);
                          setCategoriaEnEdicion(null);
                  }}
                />
             )}
          </div>
        );
      }
