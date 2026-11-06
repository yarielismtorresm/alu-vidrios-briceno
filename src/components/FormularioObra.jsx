import { useState, useEffect } from "react";

export default function FormularioObra({
  obraAEditar = null,
  categoriasDisponibles = [],
  onGuardar,
  onCerrar,
}) {
  const esModoEdicion = Boolean(obraAEditar);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: categoriasDisponibles[0] || "Puertas de Baño",
    linea: "",
    descripcion: "",
    imagen: "",
    imagenesDetalle: [
      { url: "", label: "Vista general" },
      { url: "", label: "Detalle de anclaje" },
    ],
    espesores: ["8MM TEMPLADO NCH135", "10MM DIAMANT ANTI-CAL"],
    especificaciones: {
      vidrio: "Templado Extra Claro 8mm / 10mm (Norma NCh 135)",
      perfileria: "Perfil Perimetral Aluminio Negro Mate",
      acabado: "Electroestático Microtexturizado",
      instalacion: "Tensor Superior Inox 304 + Perfil U",
    },
    formatos: [
      { nombre: "80 x 190 cm", sub: "Espacio Compacto" },
      { nombre: "90 x 195 cm", sub: "Más Elegido ★" },
      { nombre: "A Medida Libre", sub: "Toma en Terreno" },
    ],
  });

  // Precargar datos si viene una obra para editar
  useEffect(() => {
    if (obraAEditar) {
      setFormData({
        nombre: obraAEditar.nombre || "",
        categoria: obraAEditar.categoria || categoriasDisponibles[0] || "",
        linea: obraAEditar.linea || "",
        descripcion: obraAEditar.descripcion || "",
        imagen: obraAEditar.imagen || "",
        imagenesDetalle: obraAEditar.imagenesDetalle?.length
          ? obraAEditar.imagenesDetalle
          : [{ url: obraAEditar.imagen || "", label: "Vista general" }],
        espesores: obraAEditar.espesores || [""],
        especificaciones: {
          vidrio: obraAEditar.especificaciones?.vidrio || "",
          perfileria: obraAEditar.especificaciones?.perfileria || "",
          acabado: obraAEditar.especificaciones?.acabado || "",
          instalacion: obraAEditar.especificaciones?.instalacion || "",
        },
        formatos: obraAEditar.formatos || [{ nombre: "", sub: "" }],
      });
    }
  }, [obraAEditar, categoriasDisponibles]);

  // Manejadores de cambio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEspecificacionChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      especificaciones: {
        ...prev.especificaciones,
        [campo]: valor,
      },
    }));
  };

  const handleFotoDetalleChange = (index, campo, valor) => {
    const nuevasFotos = [...formData.imagenesDetalle];
    nuevasFotos[index][campo] = valor;
    setFormData((prev) => ({ ...prev, imagenesDetalle: nuevasFotos }));
  };

  // Función para convertir archivo del dispositivo a Base64
  const handleSubirArchivo = (e, callback) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    // Validación básica de tipo de archivo
    if (!archivo.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result); // reader.result es la imagen en base64
    };
    reader.readAsDataURL(archivo);
  };


  const agregarFotoDetalle = () => {
    setFormData((prev) => ({
      ...prev,
      imagenesDetalle: [...prev.imagenesDetalle, { url: "", label: "" }],
    }));
  };

  const eliminarFotoDetalle = (index) => {
    setFormData((prev) => ({
      ...prev,
      imagenesDetalle: prev.imagenesDetalle.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.imagen.trim()) {
      alert("Por favor completa al menos el nombre y la foto principal de la obra.");
      return;
    }

    onGuardar({
      ...formData,
      id: obraAEditar ? obraAEditar.id : Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">

        {/* Cabecera del Modal */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-avb-blue">
              {esModoEdicion ? "Edición de Obra" : "Nuevo Registro"}
            </span>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {esModoEdicion ? `Editar: ${obraAEditar.nombre}` : "Cargar Obra al Catálogo"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="cursor-pointer text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario con Scroll */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* AVISO REGLA DE NEGOCIO */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
            <svg className="w-5 h-5 text-avb-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <strong className="font-bold">Política AVB — Sin Precios:</strong> Este catálogo no publica valores monetarios ni cálculos automáticos. Las cotizaciones se calculan a medida de forma personalizada vía WhatsApp con la administradora.
            </div>
          </div>

          {/* SECCIÓN 1: DATOS BÁSICOS */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avb-blue" />
              1. Identificación del Proyecto
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nombre de la Obra *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Puerta de Baño Fija Negra Mate"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue focus:border-avb-blue outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Categoría *
                </label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  placeholder="Ej: Puertas de Baño, Ventanas Panorámicas..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue focus:border-avb-blue outline-hidden"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Línea Arquitectónica
                </label>
                <input
                  type="text"
                  name="linea"
                  value={formData.linea}
                  onChange={handleChange}
                  placeholder="Ej: LÍNEA PUERTAS DE BAÑO ARQUITECTÓNICAS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue focus:border-avb-blue outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Descripción Técnica y Propuesta de Valor *
                </label>
                <textarea
                  name="descripcion"
                  rows="3"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe la confección en taller, tipos de perfiles y beneficios termoacústicos o estéticos..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue focus:border-avb-blue outline-hidden resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: FOTOS REALES */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avb-blue" />
              2. Galería de Fotos Reales
            </h4>

            {/* Foto Principal con Subida de Archivo */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Foto Principal de la Obra *
                </label>
                <span className="text-[11px] text-slate-500">
                  Sube una foto desde tu equipo o pega un enlace
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Previsualización */}
                {formData.imagen ? (
                  <div className="relative group shrink-0">
                    <img
                      src={formData.imagen}
                      alt="Preview"
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-avb-blue shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, imagen: "" }))}
                      className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600"
                      title="Quitar foto"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-[10px] text-slate-400 text-center p-2 shrink-0">
                    <svg className="w-6 h-6 text-slate-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Sin imagen
                  </div>
                )}

                {/* Controles: Botón Subir Archivo + Input URL */}
                <div className="flex-1 w-full space-y-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs">
                    <svg className="w-4 h-4 text-avb-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Subir desde este dispositivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleSubirArchivo(e, (base64) =>
                          setFormData((prev) => ({ ...prev, imagen: base64 }))
                        )
                      }
                    />
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">o URL:</span>
                    <input
                      type="text"
                      name="imagen"
                      value={formData.imagen.startsWith("data:") ? "(Imagen cargada desde dispositivo)" : formData.imagen}
                      onChange={handleChange}
                      placeholder="https://..."
                      disabled={formData.imagen.startsWith("data:")}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white outline-hidden disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fotos de Detalle con opción de subir desde dispositivo */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Fotos de Detalle (Herrajes, perfiles, anclajes)
                </span>
                <button
                  type="button"
                  onClick={agregarFotoDetalle}
                  className="cursor-pointer text-xs font-bold text-avb-blue hover:underline"
                >
                  + Agregar Foto de Detalle
                </button>
              </div>

              {formData.imagenesDetalle.map((foto, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {/* Etiqueta */}
                  <input
                    type="text"
                    value={foto.label}
                    onChange={(e) => handleFotoDetalleChange(index, "label", e.target.value)}
                    placeholder="Etiqueta (Ej: Canto pulido)"
                    className="w-full sm:w-1/3 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white outline-hidden"
                  />

                  {/* Botón Subir Archivo Individual */}
                  <label className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-300 p-1.5 rounded-lg text-xs flex items-center gap-1 shrink-0 text-slate-700">
                    <svg className="w-3.5 h-3.5 text-avb-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Subir</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleSubirArchivo(e, (base64) =>
                          handleFotoDetalleChange(index, "url", base64)
                        )
                      }
                    />
                  </label>

                  {/* URL / Preview Miniatura */}
                  <input
                    type="text"
                    value={foto.url.startsWith("data:") ? "(Imagen local)" : foto.url}
                    onChange={(e) => handleFotoDetalleChange(index, "url", e.target.value)}
                    placeholder="O pega URL de imagen"
                    disabled={foto.url.startsWith("data:")}
                    className="flex-1 w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white outline-hidden disabled:bg-slate-100"
                  />

                  {foto.url && (
                    <img
                      src={foto.url}
                      alt="Miniatura"
                      className="w-8 h-8 rounded-lg object-cover border border-slate-300 shrink-0"
                    />
                  )}

                  {/* Eliminar fila */}
                  <button
                    type="button"
                    onClick={() => eliminarFotoDetalle(index)}
                    className="cursor-pointer text-slate-400 hover:text-rose-500 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 3: NORMAS TÉCNICAS Y ESPECIFICACIONES */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avb-blue" />
              3. Especificaciones y Normas Técnicas
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tipo de Vidrio y Norma de Seguridad
                </label>
                <input
                  type="text"
                  value={formData.especificaciones.vidrio}
                  onChange={(e) => handleEspecificacionChange("vidrio", e.target.value)}
                  placeholder="Ej: Templado 8mm / 10mm (Norma NCh 135)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Perfilería de Aluminio
                </label>
                <input
                  type="text"
                  value={formData.especificaciones.perfileria}
                  onChange={(e) => handleEspecificacionChange("perfileria", e.target.value)}
                  placeholder="Ej: Serie 80 / Perfil U perimetral"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Acabado de la Perfilería
                </label>
                <input
                  type="text"
                  value={formData.especificaciones.acabado}
                  onChange={(e) => handleEspecificacionChange("acabado", e.target.value)}
                  placeholder="Ej: Electroestático Negro Mate / Anodizado"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Herrajes y Anclajes
                </label>
                <input
                  type="text"
                  value={formData.especificaciones.instalacion}
                  onChange={(e) => handleEspecificacionChange("instalacion", e.target.value)}
                  placeholder="Ej: Tensor Inox 304 / Freno Hidráulico"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-avb-blue outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCerrar}
              className="cursor-pointer px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer px-6 py-2.5 rounded-xl bg-avb-blue hover:bg-blue-800 text-white text-sm font-bold shadow-md shadow-blue-900/20 transition-all"
            >
              {esModoEdicion ? "Guardar Cambios" : "Publicar en Catálogo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
