import { useState } from "react";
import logoAvb from "../assets/logo-avb.png";

export default function LoginAdmin({ onLoginSuccess }) {
  // 1. Estados de campos (Usuario y Contraseña)
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // 2. Estados de validación visual
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [mensajeErrorGlobal, setMensajeErrorGlobal] = useState("");

  // Validación en tiempo real
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!usuario.trim()) {
      nuevosErrores.usuario = "El nombre de usuario es obligatorio.";
    } else if (usuario.trim().length < 3) {
      nuevosErrores.usuario = "El usuario debe tener al menos 3 caracteres.";
    }

    if (!password) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeErrorGlobal("");

    if (!validarFormulario()) return;

    setCargando(true);

    // Simulación de validación de credenciales
    setTimeout(() => {
      setCargando(false);
      // Credenciales de prueba: usuario: "admin", clave: "admin123"
      if (usuario.trim() === "admin" && password === "admin123") {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          alert("¡Acceso autorizado al Panel de Administración AVB!");
        }
      } else {
        setMensajeErrorGlobal(
          "Usuario o contraseña incorrectos. Para pruebas: admin / admin123"
        );
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Fondo con iluminación corporativa */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-avb-blue/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Tarjeta de Acceso */}
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/20 p-8 sm:p-10 relative z-10">
        {/* Cabecera */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center p-2.5 bg-avb-blue rounded-2xl shadow-md mx-auto">
            <img src={logoAvb} alt="Alu Vidrios Briceño" className="h-10 w-auto object-contain" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-avb-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Panel Administrativo
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Gestión de Taller
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Acceso exclusivo para personal autorizado de Alu Vidrios Briceño.
            </p>
          </div>
        </div>

        {/* Alerta de credenciales incorrectas */}
        {mensajeErrorGlobal && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
            <svg className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{mensajeErrorGlobal}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Campo Usuario */}
          <div className="space-y-1.5">
            <label htmlFor="usuario" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Usuario
            </label>
            <div className="relative">
              <input
                id="usuario"
                type="text"
                autoComplete="username"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  if (errores.usuario) setErrores({ ...errores, usuario: null });
                }}
                placeholder="Ingresa tu usuario"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                  errores.usuario
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            {errores.usuario && (
              <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                <span>⚠</span> {errores.usuario}
              </p>
            )}
          </div>

          {/* Campo Contraseña con Toggle de Visibilidad */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errores.password) setErrores({ ...errores, password: null });
                }}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none pr-11 ${
                  errores.password
                    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                aria-label={mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {mostrarPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errores.password && (
              <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                <span>⚠</span> {errores.password}
              </p>
            )}
          </div>

          {/* Botón de Ingreso */}
          <button
            type="submit"
            disabled={cargando}
            className="cursor-pointer w-full mt-2 inline-flex items-center justify-center gap-2 bg-avb-blue hover:bg-blue-800 disabled:bg-slate-400 text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            {cargando ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verificando credenciales...</span>
              </>
            ) : (
              <span>Ingresar al Sistema</span>
            )}
          </button>
        </form>

        {/* Pie informativo de seguridad */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Sesión segura • Sistema interno de Alu Vidrios Briceño</span>
          </p>
        </div>
      </div>
    </div>
  );
}
