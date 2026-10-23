/**
 * Configuración oficial de contacto de Alu Vidrios Briceño (AVB)
 * Taller Central: Valera, Trujillo, Venezuela
 */
export const WHATSAPP_CONFIG = {
  telefono: "584164431719", // Número oficial con código de país
  telefonoVisible: "+58 416 4431719",
  contacto: "Norma Matheus",
  empresa: "Alu Vidrios Briceño",
};

/**
 * Función base para construir enlaces seguros de Click-to-Chat
 */
const construirUrlWhatsApp = (mensaje) => {
  const mensajeCodificado = encodeURIComponent(mensaje.trim());
  return `https://wa.me/${WHATSAPP_CONFIG.telefono}?text=${mensajeCodificado}`;
};

/**
 * 1. Mensaje dinámico para la Ficha Técnica de una obra
 */
export const obtenerMensajeFichaTecnica = (nombreObra, formato, espesor) => {
  let mensaje = `Hola ${WHATSAPP_CONFIG.contacto} / ${WHATSAPP_CONFIG.empresa}, me interesa cotizar la obra "${nombreObra}".`;

  if (formato) {
    mensaje += ` Formato: ${formato}.`;
  }

  if (espesor) {
    mensaje += ` Espesor: ${espesor}.`;
  }

  mensaje +=
    " ¿Podría brindarme asesoría técnica y coordinar una visita para toma de medidas en mi domicilio?";

  return mensaje;
};

export const obtenerUrlWhatsAppFicha = (nombreObra, formato, espesor) => {
  const mensaje = obtenerMensajeFichaTecnica(nombreObra, formato, espesor);
  return construirUrlWhatsApp(mensaje);
};

/**
 * 2. Mensaje para consulta rápida desde las tarjetas del catálogo
 */
export const obtenerUrlWhatsAppConsulta = (nombreObra) => {
  const mensaje = `Hola ${WHATSAPP_CONFIG.contacto} / ${WHATSAPP_CONFIG.empresa}, deseo cotizar la obra "${nombreObra}". ¿Podría brindarme asesoría técnica?`;
  return construirUrlWhatsApp(mensaje);
};

/**
 * 3. Mensaje general de asesoría para Hero y Navbar
 */
export const obtenerUrlWhatsAppAsesoria = () => {
  const mensaje = `Hola ${WHATSAPP_CONFIG.contacto} / ${WHATSAPP_CONFIG.empresa}, deseo solicitar asesoría y presupuesto para un proyecto arquitectónico a medida en vidrio y aluminio.`;
  return construirUrlWhatsApp(mensaje);
};

/**
 * 4. Mensaje para solicitud de visita técnica en terreno (Footer / Secciones de Contacto)
 */
export const obtenerUrlWhatsAppVisitaTerreno = () => {
  const mensaje = `Hola ${WHATSAPP_CONFIG.contacto} / ${WHATSAPP_CONFIG.empresa}, deseo solicitar una visita técnica en terreno con un maestro vidriero especialista para toma de medidas.`;
  return construirUrlWhatsApp(mensaje);
};
