import { Route, Routes } from "react-router-dom";
import ParthnersPage from "../pages/ParthnersPage.jsx";
import EditarJuego from "../componets/partners/EditarJuego.jsx";
import SubirJuego from "../componets/partners/SubirJuego.jsx";
import ExplorarPage from "../pages/ExplorarPage.jsx";
import CategoriasPage from "../pages/CategoriasPage.jsx";
import CategoriaSeleccionadaPage from "../pages/CategoriaSeleccionadaPage.jsx";
import Footer from "../componets/footer/FooterPhone.jsx";
import PerfilPage from "../pages/PerfilPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/parthner"
        element={
          <>
            <ParthnersPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/categorias"
        element={
          <>
            <CategoriasPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/categorias/:id"
        element={
          <>
            <CategoriaSeleccionadaPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/explorar"
        element={
          <>
            <ExplorarPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/perfil/"
        element={
          <>
            <PerfilPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/parthner/crear-juego/"
        element={
          <>
            <SubirJuego />
            <Footer />
          </>
        }
      />

      <Route
        path="/parthner/editar-juego/:id"
        element={
          <>
            <EditarJuego />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}
