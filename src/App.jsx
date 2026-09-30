import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CardProducto from "./components/CardProducto";
import Footer from "./components/Footer";
import { useState } from "react";
import FiltrosCategoria from "./components/FiltrosCategoria";

// Datos de prueba para mostrar las tarjetas
const obrasEjemplo = [
  {
    id: 1,
    nombre: "Fachada Integral en Vidrio Templado",
    categoria: "Fachadas",
    descripcion:
      "Estructura panorámica con vidrio de 10mm de alta resistencia y perfilería oculta de aluminio.",
    imagen:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    nombre: "Ventanal Corredizo Línea Europea",
    categoria: "Ventanales",
    descripcion:
      "Sistema de deslizamiento suave con doble acristalamiento y aislamiento termoacústico.",
    imagen:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    nombre: "División de Oficina en Vidrio Acústico",
    categoria: "Divisiones",
    descripcion:
      "Mamparas divisorias modulares para oficinas con perfiles anodizados en acabado mate.",
    imagen:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    nombre: "Mampara de Ducha en Vidrio Templado",
    categoria: "Mamparas",
    descripcion:
      "Mampara fija y corrediza con vidrio de seguridad de 8mm y herrajes en acero inoxidable.",
    imagen:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    nombre: "Fachada Integral Panorámica",
    categoria: "Fachadas",
    descripcion:
      "Estructura comercial en vidrio reflectivo de control solar con sistema de fijación spider.",
    imagen:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
];

function App() {
  // 1. Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // 2. Extraer categorias únicas dinámicamente a partir de las obras
  const listaCategorias = [
    "Todas",
    ...new Set(obrasEjemplo.map((obra) => obra.categoria)),
  ];

  // 3. Filtrar obras según la categoría seleccionada
  const obrasFiltradas =
    categoriaSeleccionada === "Todas"
      ? obrasEjemplo
      : obrasEjemplo.filter((obra) => obra.categoria === categoriaSeleccionada);

  return (
    <div className="min-h-screen bg-avb-bg text-avb-dark font-sans flex flex-col">
      {/* 1. Barra de Navegación */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Sección Catálogo de Obras */}
      <main
        id="catalogo"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Encabezado del Catálogo */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-avb-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Portafolio de Obras
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-3 mb-3">
            Obras Arquitectónicas a Medida
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Explora nuestras soluciones en vidrio templado y aluminio fabricadas
            según las especificaciones de cada proyecto.
          </p>
        </div>

        {/* 4. Filtro de Categorías */}
        <FiltrosCategoria
          categorias={listaCategorias}
          categoriaSeleccionada={categoriaSeleccionada}
          onSeleccionarCategoria={setCategoriaSeleccionada}
        />

        {/* Cuadrícula Responsiva de Cards */}
        {obrasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {obrasFiltradas.map((obra) => (
              <CardProducto
                key={obra.id}
                nombre={obra.nombre}
                categoria={obra.categoria}
                descripcion={obra.descripcion}
                imagen={obra.imagen}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              No se encontraron obras disponibles en esta categoría.
            </p>
          </div>
        )}
      </main>

      {/* 4. Footer Institucional */}
      <Footer />
    </div>
  );
}

export default App;
