import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CardProducto from "./components/CardProducto";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import FiltrosCategoria from "./components/FiltrosCategoria";
import FichaTecnica from "./components/FichaTecnica";
import LoginAdmin from "./components/LoginAdmin";

// Catálogo de obras oficiales AVB (Sin referencias ni SKUs)
const obrasEjemplo = [
  {
    id: 1,
    nombre: "Puerta de Baño Fija Negra Mate",
    categoria: "Puertas de Baño",
    linea: "LÍNEA PUERTAS DE BAÑO ARQUITECTÓNICAS",
    descripcion:
      "Cerramiento fijo sin marco superior para ducha a ras de suelo y acceso libre. Confección milimétrica en taller con perfil perimetral empotrado o visto en acabado negro mate electroestático.",
    imagen:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    imagenesDetalle: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        label: "Vista general",
      },
      {
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
        label: "Tensor inox 304",
      },
      {
        url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
        label: "Canto pulido CNC",
      },
      {
        url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
        label: "Anclaje a muro",
      },
    ],
    formatos: [
      { nombre: "80 x 190 cm", sub: "Espacio Compacto" },
      { nombre: "90 x 195 cm", sub: "Más Elegido ★" },
      { nombre: "100 x 200 cm", sub: "Gran Formato Hotel" },
      { nombre: "A Medida Libre", sub: "Toma en Terreno" },
    ],
    espesores: ["8MM TEMPLADO NCH135", "10MM DIAMANT ANTI-CAL"],
    especificaciones: {
      vidrio: "Templado Extra Claro 8mm / 10mm",
      perfileria: "Perfil Perimetral Negro Mate",
      acabado: "Electroestático Microtexturizado",
      instalacion: "Tensor Superior Inox 304 + Perfil U",
    },
  },
  {
    id: 2,
    nombre: "Ventanal Corredero Serie 80",
    categoria: "Ventanas Panorámicas",
    linea: "LÍNEA VENTANALES TERMOACÚSTICOS",
    descripcion:
      "Aislamiento termoacústico de alto desempeño con doble vidriado hermético y cierre multipunto para terrazas y balcones residenciales.",
    imagen:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imagenesDetalle: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        label: "Fachada exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
        label: "Cierre multipunto",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        label: "Riel embutido",
      },
    ],
    formatos: [
      { nombre: "200 x 220 cm", sub: "2 Hojas Corredizas" },
      { nombre: "300 x 240 cm", sub: "3 Hojas Triple Riel" },
      { nombre: "400 x 260 cm", sub: "4 Hojas Panorámico" },
      { nombre: "A Medida Libre", sub: "Toma en Terreno" },
    ],
    espesores: ["DVH 4/12/4 TERMOACÚSTICO", "DVH 6/12/6 SEGURIDAD"],
    especificaciones: {
      vidrio: "Doble Vidriado Hermético (DVH)",
      perfileria: "Aluminio Serie 80 Europeo",
      acabado: "Gris Antracita / Anodizado Mate",
      instalacion: "Rodamientos de Acero Inoxidable Sellados",
    },
  },
  {
    id: 3,
    nombre: "Espejo Flotante Orgánico LED",
    categoria: "Espejos Flotantes & LED",
    linea: "LÍNEA ESPEJOS ARQUITECTÓNICOS",
    descripcion:
      "Espejo de cristal belga libre de cobre con retroiluminación perimetral LED dual (cálida/fría), sensor táctil regulable y lámina antivaho.",
    imagen:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    imagenesDetalle: [
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        label: "Luz perimetral",
      },
      {
        url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
        label: "Sensor touch",
      },
    ],
    formatos: [
      { nombre: "60 x 80 cm", sub: "Formato Orgánico S" },
      { nombre: "80 x 100 cm", sub: "Formato Orgánico M" },
      { nombre: "100 x 120 cm", sub: "Formato Gran Espacio" },
      { nombre: "Plantilla a Medida", sub: "Corte CNC Personalizado" },
    ],
    espesores: ["5MM CRISTAL BELGA", "6MM ULTRACLARO DIAMANT"],
    especificaciones: {
      vidrio: "Cristal Belga 5mm Libre de Cobre",
      perfileria: "Chasis Posterior de Aluminio Oculto",
      acabado: "Canto Pulido Diamante",
      instalacion: "Fijación Flotante con Soporte Oculto",
    },
  },
  {
    id: 4,
    nombre: "Puerta Pivotante Cuadriculada",
    categoria: "Puertas de Baño",
    linea: "LÍNEA PUERTAS MONUMENTALES",
    descripcion:
      "Sistema pivotante hidráulico oculto en suelo con palillería negra y cristal templado laminado de máxima atenuación acústica.",
    imagen:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    imagenesDetalle: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        label: "Vista general",
      },
      {
        url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
        label: "Pivote hidráulico",
      },
    ],
    formatos: [
      { nombre: "100 x 240 cm", sub: "Paso Estándar Alto" },
      { nombre: "120 x 260 cm", sub: "Gran Apertura" },
      { nombre: "A Medida Libre", sub: "Toma en Terreno" },
    ],
    espesores: ["10MM TEMPLADO LAMINADO", "12MM CRISTAL ACÚSTICO"],
    especificaciones: {
      vidrio: "Laminado Acústico 5+5mm",
      perfileria: "Aluminio Negro Mate Microtexturado",
      acabado: "Palillería Geométrica Sobrepuesta",
      instalacion: "Caja de Freno Hidráulico en Piso",
    },
  },
  {
    id: 5,
    nombre: "Baranda de Cristal Laminado Empotrado",
    categoria: "Ventanas Panorámicas",
    linea: "LÍNEA BARANDAS ESTRUCTURALES",
    descripcion:
      "Perfil en U inferior embutido en losa sin postes intermedios para máxima transparencia y seguridad certificada para terrazas y balcones.",
    imagen:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imagenesDetalle: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        label: "Vista frontal",
      },
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        label: "Perfil embutido",
      },
    ],
    formatos: [
      { nombre: "Por Metro Lineal (h=100cm)", sub: "Altura Balcón" },
      { nombre: "Por Metro Lineal (h=110cm)", sub: "Norma NCh 135" },
      { nombre: "A Medida Libre", sub: "Toma en Terreno" },
    ],
    espesores: ["10+10 MM TEMPLADO LAMINADO PVB", "12+12 MM ESTRUCTURAL SENTRY"],
    especificaciones: {
      vidrio: "Templado Laminado 10+10mm PVB",
      perfileria: "Perfil Base U Aluminio Estructural",
      acabado: "Tapa Embellecedora Anodizada",
      instalacion: "Anclaje Químico a Losa de Hormigón",
    },
  },
  {
    id: 6,
    nombre: "Puerta Divisoria Loft Industrial",
    categoria: "Puertas de Baño",
    linea: "LÍNEA DIVISIONES CORPORATIVAS",
    descripcion:
      "Cuadrícula geométrica perimetral en aluminio negro mate con aislamiento acústico superior para divisiones de oficina y residencias.",
    imagen:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    imagenesDetalle: [
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        label: "Vista corporativa",
      },
    ],
    formatos: [
      { nombre: "Módulo 200 x 240 cm", sub: "Fijo + Batiente" },
      { nombre: "Módulo 300 x 260 cm", sub: "Fijos + Doble Hoja" },
      { nombre: "A Medida Libre", sub: "Toma en Terreno" },
    ],
    espesores: ["ACÚSTICO LAMINADO 3B08", "8MM TEMPLADO EXTRA CLARO"],
    especificaciones: {
      vidrio: "Acústico Laminado 4+4mm",
      perfileria: "Aluminio Estilo Loft Industrial",
      acabado: "Negro Mate Microtexturado",
      instalacion: "Fijación Perimetral con Sellado Acústico",
    },
  },
];

function App() {
  // 1. Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // 2. Estado para la obra actualmente abierta en el Modal de Ficha Técnica
  const [obraSeleccionada, setObraSeleccionada] = useState(null)

  // 3. Extraer categorias únicas dinámicamente a partir de las obras
  const listaCategorias = [
    "Todas",
    ...new Set(obrasEjemplo.map((obra) => obra.categoria)),
  ];

  const handleVolverAlCatalogo = () => {
    setObraSeleccionada(null);
  };

  // 4. Filtrar obras según la categoría seleccionada
  const obrasFiltradas =
    categoriaSeleccionada === "Todas"
      ? obrasEjemplo
      : obrasEjemplo.filter((obra) => obra.categoria === categoriaSeleccionada);

  // Detección automática si la URL es /admin o #admin
  const [esRutaAdmin, setEsRutaAdmin] = useState(
    window.location.pathname === "/admin" || window.location.hash === "#admin"
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setEsRutaAdmin(
        window.location.pathname === "/admin" || window.location.hash === "#admin"
      );
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);


  // Si la URL es /admin o #admin, se muestra exclusivamente la pantalla de Login
  if (esRutaAdmin) {
    return (
      <LoginAdmin
        onLoginSuccess={() => {
          alert("¡Credenciales correctas! Bienvenido al Panel Administrativo.");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-avb-bg text-avb-dark font-sans flex flex-col">
      {/* 1. Barra de Navegación */}
      <Navbar />

      {/* 2. Renderizado Condicional: Si hay obra seleccionada muestra Ficha Técnica, si no muestra Catálogo */}
      {obraSeleccionada ? (
        <FichaTecnica
          obra={obraSeleccionada}
          todasLasObras={obrasEjemplo}
          onVolver={handleVolverAlCatalogo}
          onSeleccionarObra={setObraSeleccionada}
        />
      ) : (
    <>

      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Sección Catálogo de Obras */}
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
                obra={obra}
                onVerDetalle={setObraSeleccionada}
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
    </>
          )}


          {/* 3. Footer Institucional */}
          <Footer />
        </div>
      );
    }

    export default App;
