import { useState, useEffect } from "react";

export default function FormularioUsuario({
  usuarioAEditar = null,
  usuariosExistentes = [],
  onGuardar,
  onCerrar,
}) {
  const esModoEdicion = Boolean(usuarioAEditar);

  // 1. Estado de los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    cargo: "",
    usuario: "",
    email: "",
    password: "",
    rol: "Taller",
    activo: true,
    permisos: {
      obras: true,
      categorias: false,
      usuarios: false,
    },
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});

  // 2. Precargar datos si estamos en modo edición
  useEffect(() => {
    if (usuarioAEditar) {
      setFormData({
        nombre: usuarioAEditar.nombre || "",
        cargo: usuarioAEditar.cargo || "",
        usuario: usuarioAEditar.usuario || "",
        email: usuarioAEditar.email || "",
        password: usuarioAEditar.password || "",
        rol: usuarioAEditar.rol || "Taller",
        activo: usuarioAEditar.activo ?? true,
        permisos: usuarioAEditar.permisos || {
          obras: true,
          categorias: usuarioAEditar.rol === "Administrador",
          usuarios: usuarioAEditar.rol === "Administrador",
        },
      });
    }
  }, [usuarioAEditar]);

  // 3. Sincronizar permisos por defecto al cambiar de rol
  const handleCambioRol = (nuevoRol) => {
    const esAdmin = nuevoRol === "Administrador";
    setFormData((prev) => ({
      ...prev,
      rol: nuevoRol,
      permisos: {
        obras: true,
        categorias: esAdmin,
        usuarios: esAdmin,
      },
    }));
  };

  // 4. Función de validación
  const validar = (datos = formData) => {
    const nuevosErrores = {};
    const nombreLimpio = datos.nombre.trim();
    const usuarioLimpio = datos.usuario.trim().toLowerCase();
    const emailLimpio = datos.email.trim();

    if (!nombreLimpio) {
      nuevosErrores.nombre = "El nombre completo es obligatorio.";
    } else if (nombreLimpio.length < 3) {
      nuevosErrores.nombre = "Debe tener al menos 3 caracteres.";
    }

    if (!datos.cargo.trim()) {
      nuevosErrores.cargo = "El cargo o especialidad técnica es obligatorio.";
    }

    if (!usuarioLimpio) {
      nuevosErrores.usuario = "El nombre de usuario es obligatorio.";
    } else if (usuarioLimpio.length < 3) {
      nuevosErrores.usuario = "Debe tener al menos 3 caracteres.";
    } else {
      const usuarioDuplicado = usuariosExistentes.some(
        (u) =>
          u.usuario.trim().toLowerCase() === usuarioLimpio &&
          (!esModoEdicion || u.id !== usuarioAEditar.id)
      );
      if (usuarioDuplicado) {
        nuevosErrores.usuario = "Este nombre de usuario ya está registrado.";
      }
    }

    if (emailLimpio && !/\S+@\S+\.\S+/.test(emailLimpio)) {
          nuevosErrores.email = "Ingresa un formato de correo electrónico válido.";
    }

    if (!esModoEdicion && !datos.password) {
      nuevosErrores.password = "La contraseña es obligatoria para nuevos usuarios.";
    } else if (datos.password && datos.password.length < 4) {
      nuevosErrores.password = "La contraseña debe tener al menos 4 caracteres.";
    }

    return nuevosErrores;
  };

  const handleChange = (campo, valor) => {
    const nuevosDatos = { ...formData, [campo]: valor };
    setFormData(nuevosDatos);

    if (tocado[campo]) {
      setErrores(validar(nuevosDatos));
    }
  };

  const handleTogglePermiso = (permiso) => {
    setFormData((prev) => ({
      ...prev,
      permisos: {
        ...prev.permisos,
        [permiso]: !prev.permisos[permiso],
      },
    }));
  };

  const handleBlur = (campo) => {
    setTocado((prev) => ({ ...prev, [campo]: true }));
    setErrores(validar());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTocado({
      nombre: true,
      cargo: true,
      usuario: true,
      email: true,
      password: true,
    });

    const errs = validar();
    setErrores(errs);

    if (Object.keys(errs).length === 0) {
      if (onGuardar) {
        onGuardar({
          id: esModoEdicion ? usuarioAEditar.id : Date.now(),
          nombre: formData.nombre.trim(),
          cargo: formData.cargo.trim(),
          usuario: formData.usuario.trim().toLowerCase(),
          email: formData.email.trim(),
          password: formData.password || (esModoEdicion ? usuarioAEditar.password : "admin123"),
          rol: formData.rol,
          activo: formData.activo,
          permisos: formData.permisos,
          ultimoAcceso: esModoEdicion ? usuarioAEditar.ultimoAcceso : "Recién registrado",
        });
      }
      onCerrar();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">

        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-avb-blue bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
              {esModoEdicion ? "Edición de Integrante" : "Registro de Usuario & Permisos"}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {esModoEdicion ? `Editar: ${usuarioAEditar.nombre}` : "Registrar Usuario"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="cursor-pointer text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* Nombre y Cargo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombreUser" className="block text-xs font-bold text-slate-700 mb-1.5">
                Nombre Completo <span className="text-rose-500">*</span>
              </label>
              <input
                id="nombreUser"
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                onBlur={() => handleBlur("nombre")}
                placeholder="Ej: Norma Matheus"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-hidden transition-all ${
                  errores.nombre && tocado.nombre
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
                }`}
              />
              {errores.nombre && tocado.nombre && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                  <span>⚠</span> {errores.nombre}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cargoUser" className="block text-xs font-bold text-slate-700 mb-1.5">
                Cargo / Especialidad <span className="text-rose-500">*</span>
              </label>
              <input
                id="cargoUser"
                type="text"
                value={formData.cargo}
                onChange={(e) => handleChange("cargo", e.target.value)}
                onBlur={() => handleBlur("cargo")}
                placeholder="Ej: Maestro Vidriero CNC"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-hidden transition-all ${
                  errores.cargo && tocado.cargo
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
                }`}
              />
              {errores.cargo && tocado.cargo && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                  <span>⚠</span> {errores.cargo}
                </p>
              )}
            </div>
          </div>

          {/* Usuario y Correo Electrónico */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="usuarioUser" className="block text-xs font-bold text-slate-700 mb-1.5">
                Nombre de Usuario <span className="text-rose-500">*</span>
              </label>
              <input
                id="usuarioUser"
                type="text"
                value={formData.usuario}
                onChange={(e) => handleChange("usuario", e.target.value)}
                onBlur={() => handleBlur("usuario")}
                placeholder="Ej: norma.matheus"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-hidden transition-all ${
                  errores.usuario && tocado.usuario
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
                }`}
              />
              {errores.usuario && tocado.usuario && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                  <span>⚠</span> {errores.usuario}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="emailUser" className="block text-xs font-bold text-slate-700 mb-1.5">
                Correo Electrónico <span className="text-rose-500">(Opcional)</span>
              </label>
              <input
                id="emailUser"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="Ej: usuario@aluvidrios.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-hidden transition-all ${
                  errores.email && tocado.email
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
                }`}
              />
              {errores.email && tocado.email && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                  <span>⚠</span> {errores.email}
                </p>
              )}
            </div>
          </div>

          {/* Contraseña y Rol */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="passwordUser" className="block text-xs font-bold text-slate-700 mb-1.5">
                Contraseña {!esModoEdicion && <span className="text-rose-500">*</span>}
              </label>
              <div className="relative">
                <input
                  id="passwordUser"
                  type={mostrarPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder={esModoEdicion ? "•••••••• (Sin cambios)" : "Mínimo 4 caracteres"}
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border text-sm outline-hidden transition-all ${
                    errores.password && tocado.password
                      ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                      : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label={mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {mostrarPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errores.password && tocado.password && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                  <span>⚠</span> {errores.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="rolUser" className="block text-xs font-bold text-slate-700 mb-1.5">
                Rol de Acceso <span className="text-rose-500">*</span>
              </label>
              <select
                id="rolUser"
                value={formData.rol}
                onChange={(e) => handleCambioRol(e.target.value)}
                className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:border-avb-blue focus:ring-2 focus:ring-avb-blue/20 outline-hidden"
              >
                <option value="Administrador">Administrador (Control Total)</option>
                <option value="Taller">Taller (Operaciones y Montaje)</option>
              </select>
            </div>
          </div>

          {/* Matriz Granular de Asignación de Permisos */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Matriz de Permisos del Usuario
              </span>
              <span className="text-[11px] font-bold text-avb-blue">
                {formData.rol === "Administrador" ? "Perfil Administrador" : "Perfil Técnico"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label
                className={`cursor-pointer p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  formData.permisos.obras
                    ? "bg-white border-avb-blue ring-1 ring-avb-blue/20 shadow-xs"
                    : "bg-slate-100/70 border-slate-200 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-800">Catálogo Obras</span>
                  <input
                    type="checkbox"
                    checked={formData.permisos.obras}
                    onChange={() => handleTogglePermiso("obras")}
                    className="cursor-pointer rounded text-avb-blue focus:ring-avb-blue"
                  />
                </div>
                <span className="text-[10px] text-slate-500">Crear y editar obras</span>
              </label>

              <label
                className={`cursor-pointer p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  formData.permisos.categorias
                    ? "bg-white border-avb-blue ring-1 ring-avb-blue/20 shadow-xs"
                    : "bg-slate-100/70 border-slate-200 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-800">Categorías</span>
                  <input
                    type="checkbox"
                    checked={formData.permisos.categorias}
                    onChange={() => handleTogglePermiso("categorias")}
                    className="cursor-pointer rounded text-avb-blue focus:ring-avb-blue"
                  />
                </div>
                <span className="text-[10px] text-slate-500">Activar/Ocultar líneas</span>
              </label>

              <label
                className={`cursor-pointer p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  formData.permisos.usuarios
                    ? "bg-white border-avb-blue ring-1 ring-avb-blue/20 shadow-xs"
                    : "bg-slate-100/70 border-slate-200 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-800">Usuarios</span>
                  <input
                    type="checkbox"
                    checked={formData.permisos.usuarios}
                    onChange={() => handleTogglePermiso("usuarios")}
                    className="cursor-pointer rounded text-avb-blue focus:ring-avb-blue"
                  />
                </div>
                <span className="text-[10px] text-slate-500">Gestionar accesos</span>
              </label>
            </div>
          </div>

          {/* Switch de Estado de Acceso */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Estado del Acceso</span>
              <span className="text-[11px] text-slate-500">
                {formData.activo ? "Permite iniciar sesión en el panel" : "Acceso bloqueado temporalmente"}
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.activo}
              onClick={() => handleChange("activo", !formData.activo)}
              className={`cursor-pointer relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                formData.activo ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                  formData.activo ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Botones de Acción */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCerrar}
              className="cursor-pointer px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer px-5 py-2.5 rounded-xl bg-avb-blue hover:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-900/20 transition-all"
            >
              {esModoEdicion ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
