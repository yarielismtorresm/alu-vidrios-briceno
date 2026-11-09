import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CardProducto from "./components/CardProducto";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import FiltrosCategoria from "./components/FiltrosCategoria";
import FichaTecnica from "./components/FichaTecnica";
import LoginAdmin from "./components/LoginAdmin";
import ResumenAdmin from "./components/ResumenAdmin";
import CatalogoGeneral from "./components/CatalogoGeneral";
import productosData from "./data/productos.json";
import categoriasData from "./data/categorias.json"

// Categorías oficiales de Alu Vidrios Briceño con estado de activación
const categoriasIniciales = [
  {
    id: 1,
    nombre: "Puertas de Baño",
    descripcion:
      "Sistemas fijos, batientes y corredizos con vidrio templado de seguridad de 8mm y 10mm.",
    activa: true,
  },
  {
    id: 2,
    nombre: "Ventanas Panorámicas",
    descripcion:
      "Líneas Serie 80 y muros cortina con doble vidriado hermético (DVH) para aislamiento acústico y térmico.",
    activa: true,
  },
  {
    id: 3,
    nombre: "Espejos Flotantes & LED",
    descripcion:
      "Cristal belga libre de cobre con retroiluminación LED dual, sensor táctil y corte a medida.",
    activa: true,
  },
];

function App() {
  // 1. Estado principal del listado de obras (reactivo para altas y ediciones)
    const [listaObras, setListaObras] = useState(() => {
        const obrasGuardadas = localStorage.getItem("avb_obras_db");
        return obrasGuardadas ? JSON.parse(obrasGuardadas) : productosData;
      });

      // Guardar automáticamente en la BD local cada vez que se cree o edite una obra
      useEffect(() => {
        localStorage.setItem("avb_obras_db", JSON.stringify(listaObras));
      }, [listaObras]);

      // 2. Base de datos de Categorías con persistencia en localStorage
      const [listaCategorias, setListaCategorias] = useState(() => {
        const categoriasGuardadas = localStorage.getItem("avb_categorias_db");
        return categoriasGuardadas ? JSON.parse(categoriasGuardadas) : categoriasData;
      });

      // Guardar automáticamente en la BD local cada vez que cambie una categoría o su switch
      useEffect(() => {
        localStorage.setItem("avb_categorias_db", JSON.stringify(listaCategorias));
      }, [listaCategorias]);

  // 3. Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // 4. Estado para la obra actualmente abierta en el Modal de Ficha Técnica
  const [obraSeleccionada, setObraSeleccionada] = useState(null)

  // 5. Nombres de categorías activas para los filtros del sitio público
  const nombreCategoriasPublicas = [
    "Todas",
    ...listaCategorias.filter((cat) => cat.activa).map((cat) => cat.nombre),
  ];

  const handleVolverAlCatalogo = () => {
    setObraSeleccionada(null);
  };

  // 6. Filtrar obras Filtrar obras visibles al público (solo de categorías con estado activo)
  const obrasVisiblesPublico = listaObras.filter((obra) => {
      const categoriaObj = listaCategorias.find(
        (c) => c.nombre.toLowerCase() === obra.categoria.toLowerCase()
      );
      return categoriaObj ? categoriaObj.activa : true;
    });

    const obrasFiltradas =
      categoriaSeleccionada === "Todas"
        ? obrasVisiblesPublico
        : obrasVisiblesPublico.filter(
            (obra) => obra.categoria === categoriaSeleccionada
          );

  // 7. Detección automática si la URL es /admin o #admin
  const [esRutaAdmin, setEsRutaAdmin] = useState(
    window.location.pathname === "/admin" || window.location.hash === "#admin"
  );

  // 8. Manejador para agregar o editar obras en tiempo real
  const handleGuardarObra = (obraActualizada) => {
    setListaObras((prev) => {
      const existe = prev.some((o) => o.id === obraActualizada.id);
      if (existe) {
        return prev.map((o) => (o.id === obraActualizada.id ? obraActualizada : o));
      }
      return [obraActualizada, ...prev];
    });
  };

  // 9. Manejadores para Categorías (Switch de estado y Crear/Editar)
    const handleToggleEstadoCategoria = (idCategoria) => {
      setListaCategorias((prev) =>
        prev.map((cat) =>
          cat.id === idCategoria ? { ...cat, activa: !cat.activa } : cat
        )
      );
    };

    const handleGuardarCategoria = (categoriaData) => {
      setListaCategorias((prev) => {
        const existe = prev.some((c) => c.id === categoriaData.id);
        if (existe) {
          return prev.map((c) => (c.id === categoriaData.id ? categoriaData : c));
        }
        return [...prev, categoriaData];
      });
    };

  // Estado estaAutenticado
  const [estaAutenticado, setEstaAutenticado] = useState(
    () => localStorage.getItem("avb_admin_auth") === "true"
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
    if (!estaAutenticado) {
    return (
      <LoginAdmin
        onLoginSuccess={() => {
          localStorage.setItem("avb_admin_auth", "true")
          setEstaAutenticado(true);
        }}
      />
    );
  }

  return (
   <ResumenAdmin
     obras={listaObras}
     categorias={listaCategorias}
     onGuardarObra={handleGuardarObra}
     onToggleCategoria={handleToggleEstadoCategoria}
     onGuardarCategoria={handleGuardarCategoria}
     onLogout={() => {
            localStorage.removeItem("avb_admin_auth");
            setEstaAutenticado(false);
          }}
     onVerSitioPublico={() => {
        window.location.hash = "";
        setEsRutaAdmin(false);
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
          todasLasObras={listaObras}
          onVolver={handleVolverAlCatalogo}
          onSeleccionarObra={setObraSeleccionada}
        />
      ) : (
    <>

      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Sección Catálogo de Obras */}
      {/* 4. Sección Catálogo General de Obras (Issue #19) */}
      <CatalogoGeneral
        obras={obrasVisiblesPublico}
        categorias={nombreCategoriasPublicas}
        categoriaSeleccionada={categoriaSeleccionada}
        onSeleccionarCategoria={setCategoriaSeleccionada}
        onVerDetalle={setObraSeleccionada}
      />
    </>
  )}

  {/* 3. Footer Institucional */}
          <Footer />
        </div>
      );
    }

    export default App;
