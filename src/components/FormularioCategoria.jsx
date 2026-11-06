import { useState, useEffect } from "react";

export default function FormularioCategoria({
  categoriaAEditar = null,
  categoriasExistentes = [],
  onGuardar,
  onCerrar,
}) {
  const esModoEdicion = Boolean(categoriaAEditar);

  // 1. Estado de los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    activa: true,
  });

  // 2. Estado para almacenar errores de validación por campo
  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});

  // 3. Precargar datos si estamos en modo edición
  useEffect(() => {
    if (categoriaAEditar) {
      setFormData({
        nombre: categoriaAEditar.nombre || "",
        descripcion: categoriaAEditar.descripcion || "",
        activa: categoriaAEditar.activa ?? true,
      });
    }
  }, [categoriaAEditar]);

  // 4. Función de validación
  const validar = (datos = formData) => {
    const nuevosErrores = {};
    const nombreLimpio = datos.nombre.trim();
    const descripcionLimpia = datos.descripcion.trim();

    // Validación del nombre
    if (!nombreLimpio) {
      nuevosErrores.nombre = "El nombre de la categoría es obligatorio.";
    } else if (nombreLimpio.length < 3) {
      nuevosErrores.nombre = "Debe tener al menos 3 caracteres.";
    } else if (nombreLimpio.length > 60) {
      nuevosErrores.nombre = "No puede exceder los 60 caracteres.";
    } else {
      // Verificar si ya existe otra categoría con el mismo nombre (insensible a mayúsculas)
      const nombreDuplicado = categoriasExistentes.some(
        (cat) =>
          cat.nombre.trim().toLowerCase() === nombreLimpio.toLowerCase() &&
          (!esModoEdicion || cat.id !== categoriaAEditar.id)
      );
      if (nombreDuplicado) {
        nuevosErrores.nombre = "Ya existe una categoría con este nombre.";
      }
    }

    // Validación de la descripción técnica
    if (!descripcionLimpia) {
      nuevosErrores.descripcion = "La descripción técnica es obligatoria.";
    } else if (descripcionLimpia.length < 10) {
      nuevosErrores.descripcion = "Debe tener al menos 10 caracteres técnicos.";
    } else if (descripcionLimpia.length > 200) {
      nuevosErrores.descripcion = "No puede superar los 200 caracteres.";
    }

    return nuevosErrores;
  };

  // Manejador de cambios en los inputs
  const handleChange = (campo, valor) => {
    const nuevosDatos = { ...formData, [campo]: valor };
    setFormData(nuevosDatos);

    // Validar en tiempo real si el campo ya fue interactuado
    if (tocado[campo]) {
      const errs = validar(nuevosDatos);
      setErrores(errs);
    }
  };

  const handleBlur = (campo) => {
    setTocado((prev) => ({ ...prev, [campo]: true }));
    const errs = validar();
    setErrores(errs);
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setTocado({ nombre: true, descripcion: true });

    const errs = validar();
    setErrores(errs);

    if (Object.keys(errs).length === 0) {
      if (onGuardar) {
        onGuardar({
          id: esModoEdicion ? categoriaAEditar.id : Date.now(),
          nombre: formData.nombre.trim(),
          descripcion: formData.descripcion.trim(),
          activa: formData.activa,
        });
      }
      onCerrar();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">

        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-avb-blue bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
              {esModoEdicion ? "Edición de Categoría" : "Nueva Línea Arquitectónica"}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {esModoEdicion ? `Editar: ${categoriaAEditar.nombre}` : "Registrar Categoría"}
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
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* Campo: Nombre */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="nombreCat" className="block text-xs font-bold text-slate-700">
                Nombre de la Categoría <span className="text-rose-500">*</span>
              </label>
              <span className={`text-[10px] font-semibold ${formData.nombre.length > 60 ? "text-rose-500" : "text-slate-400"}`}>
                {formData.nombre.length} / 60
              </span>
            </div>
            <input
              id="nombreCat"
              type="text"
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              onBlur={() => handleBlur("nombre")}
              placeholder="Ej: Fachadas Comerciales & Piel de Vidrio"
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

          {/* Campo: Descripción Técnica */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="descCat" className="block text-xs font-bold text-slate-700">
                Descripción Técnica de la Línea <span className="text-rose-500">*</span>
              </label>
              <span className={`text-[10px] font-semibold ${formData.descripcion.length > 200 ? "text-rose-500" : "text-slate-400"}`}>
                {formData.descripcion.length} / 200
              </span>
            </div>
            <textarea
              id="descCat"
              rows="3"
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              onBlur={() => handleBlur("descripcion")}
              placeholder="Describe las especificaciones de vidrios templados, espesores y perfiles de aluminio..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-hidden resize-none transition-all ${
                errores.descripcion && tocado.descripcion
                  ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200"
                  : "border-slate-300 bg-slate-50/50 text-slate-800 focus:border-avb-blue focus:bg-white focus:ring-2 focus:ring-avb-blue/20"
              }`}
            />
            {errores.descripcion && tocado.descripcion && (
              <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                <span>⚠</span> {errores.descripcion}
              </p>
            )}
          </div>

          {/* Campo: Switch Toggle de Visibilidad Inicial */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Visibilidad Pública</span>
              <span className="text-[11px] text-slate-500">
                {formData.activa
                  ? "Visible en los filtros y catálogo web"
                  : "Oculta temporalmente en el sitio público"}
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.activa}
              onClick={() => handleChange("activa", !formData.activa)}
              className={`cursor-pointer relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                formData.activa ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                  formData.activa ? "translate-x-6" : "translate-x-1"
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
              {esModoEdicion ? "Guardar Cambios" : "Crear Categoría"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
