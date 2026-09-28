import { useState } from "react";
import logoAvb from "../assets/logo-avb.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Catálogo de Obras", href: "#catalogo" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. Logotipo AVB */}
          <a
            href="#inicio"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Contenedor con fondo azul de la marca */}
            <div className="bg-avb-blue p-1.5 rounded-xl shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <img
                src={logoAvb}
                alt="Alu Vidrios Briceno"
                className="h-10 w-auto object-contain rounded-lg"
              />
            </div>

            {/* Texto de Identidad de Marca */}
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-avb-blue leading-tight">
                Alu Vidrios Briceño
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                Vidrio Templado y Aluminio
              </span>
            </div>
          </a>

          {/* 2. Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-avb-blue transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {/* CTA WhatsApp Desktop */}
            <a
              href="https://wa.me/584120000000?text=Hola,%20deseo%20solicitar%20información%20sobre%20sus%20obras"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>Consultar</span>
            </a>
          </nav>

          {/* 3. Botón Hamburguesa Móvil con animación de líneas a X */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2.5 rounded-lg text-slate-700 hover:text-avb-blue hover:bg-slate-100 transition-colors focus:outline-none flex flex-col justify-center items-center gap-1.5 w-10 h-10"
              aria-label="Alternar menú de navegación"
              aria-expanded={isOpen}
            >
              {/* Línea Superior */}
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              {/* Línea Central */}
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              {/* Línea Inferior */}
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Menú Desplegable Móvil con Animación Fluida */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 border-t border-slate-200"
            : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-avb-blue hover:bg-slate-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Botón CTA WhatsApp Móvil */}
          <div className="pt-2">
            <a
              href="https://wa.me/584120000000?text=Hola,%20deseo%20solicitar%20información%20sobre%20sus%20obras"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
