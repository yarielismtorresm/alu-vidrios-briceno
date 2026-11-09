import { useState } from "react";

export default function GestionUsuarios({
  usuarios  = [],
  onAbrirCrear,
  onAbrirEditar,
  onToggleEstado,
  }) {
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("Todos");

  // Métricas calculadas en vivo
  const totalUsuarios = usuarios.length;
  const totalAdmins = usuarios.filter((u) => u.rol === "Administrador").length;
  const totalTaller = usuarios.filter((u) => u.rol === "Taller").length;
  const totalActivos = usuarios.filter((u) => u.activo).length;

  // Filtrado de usuarios en tiempo real
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideRol = rolFiltro === "Todos" || u.rol === rolFiltro;
    const termino = busqueda.trim().toLowerCase();
    const coincideTexto =
      !termino ||
      u.nombre.toLowerCase().includes(termino) ||
      u.usuario.toLowerCase().includes(termino) ||
      u.email.toLowerCase().includes(termino) ||
      u.cargo.toLowerCase().includes(termino);

    return coincideRol && coincideTexto;
  });

  return (
    <div className="space-y-6">
      {/* 1. Encabezado y Botón Nuevo Usuario */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-avb-blue text-[11px] font-bold px-3 py-1 rounded-full mb-2 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Control de Accesos y Permisos</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Usuarios y Roles del Sistema
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
            Gestiona los niveles de acceso del personal de taller y administración para la edición de obras y líneas arquitectónicas.
          </p>
        </div>

        <button
          type="button"
          onClick={onAbrirCrear}
          className="cursor-pointer bg-avb-blue hover:bg-blue-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-900/20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>+ Nuevo Usuario</span>
        </button>
      </div>

      {/* 2. Tarjetas de Métricas KPI de Usuarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Usuarios</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalUsuarios}</div>
          </div>
          <div className="p-2.5 bg-blue-50 text-avb-blue rounded-xl border border-blue-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-avb-blue">Administradores</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalAdmins}</div>
          </div>
          <div className="p-2.5 bg-blue-50 text-avb-blue rounded-xl border border-blue-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Personal Taller</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalTaller}</div>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Accesos Activos</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalActivos}</div>
          </div>
          <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl border border-slate-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Barra de Búsqueda y Selector de Roles */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Input Buscador */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, correo, usuario o especialidad..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20 transition-all"
          />
        </div>

        {/* Filtro por Rol */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 shrink-0">Rol:</span>
          <select
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
            className="cursor-pointer bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-hidden focus:border-avb-blue"
          >
            <option value="Todos">Todos los roles</option>
            <option value="Administrador">Administrador</option>
            <option value="Taller">Taller</option>
          </select>
        </div>
      </div>

      {/* 4. Tabla de Usuarios y Roles */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">USUARIO / INTEGRANTE</th>
                <th className="py-3.5 px-5">ROL & PERMISOS</th>
                <th className="py-3.5 px-5">ESPECIALIDAD / CARGO</th>
                <th className="py-3.5 px-5 text-center">ESTADO ACCESO</th>
                <th className="py-3.5 px-5 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((user) => {
                  const iniciales = user.nombre
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Avatar e Identidad */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-avb-blue to-blue-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {iniciales}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 text-sm block">
                              {user.nombre}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Rol Badge */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                            user.rol === "Administrador"
                              ? "bg-blue-50 text-avb-blue border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              user.rol === "Administrador" ? "bg-avb-blue" : "bg-emerald-500"
                            }`}
                          />
                          {user.rol}
                        </span>
                      </td>

                      {/* Cargo / Especialidad */}
                      <td className="py-4 px-5">
                        <span className="font-medium text-slate-700 block">
                          {user.cargo}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Último acceso: {user.ultimoAcceso}
                        </span>
                      </td>

                      {/* Switch de Estado */}
                      <td className="py-4 px-5 text-center">
                        <div className="inline-flex flex-col items-center">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={user.activo}
                            onClick={() => onToggleEstado  && onToggleEstado(user.id)}
                            className={`cursor-pointer relative inline-flex h-5 w-10 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-hidden ${
                              user.activo ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-md transition duration-200 ${
                                user.activo ? "translate-x-5" : "translate-x-1"
                              }`}
                            />
                          </button>
                          <span
                            className={`text-[9px] font-bold uppercase mt-1 ${
                              user.activo ? "text-emerald-600" : "text-slate-400"
                            }`}
                          >
                            {user.activo ? "Activo" : "Bloqueado"}
                          </span>
                        </div>
                      </td>

                      {/* Acciones */}
                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => onAbrirEditar && onAbrirEditar(user)}
                          className="cursor-pointer text-xs font-bold text-avb-blue hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-400 text-xs">
                    No se encontraron usuarios con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
