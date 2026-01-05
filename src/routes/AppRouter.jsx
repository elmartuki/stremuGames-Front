import { Route, Routes } from "react-router-dom";
import ParthnersPage from "../pages/ParthnersPage.jsx";
import EditarJuego from "../componets/partners/EditarJuego.jsx";
import SubirJuego from "../componets/partners/SubirJuego.jsx";
import ExplorarPage from "../pages/ExplorarPage.jsx";
import CategoriasPage from "../pages/CategoriasPage.jsx";
import CategoriaSeleccionadaPage from "../pages/CategoriaSeleccionadaPage.jsx";
import Footer from "../componets/footer/FooterPhone.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import PerfilPage from "../pages/PerfilPage.jsx";
import UsserRouter from "./UsserRouter.jsx";
import StudioRouter from "./StudioRouter.jsx";
import RegistroEmpresaPage from "../pages/RegistroEmpresaPage.jsx";
import LoginEmpresaPage from "../pages/LoginEmpresaPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login-empresa"
        element={
          <>
            <LoginEmpresaPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/registro-empresa"
        element={
          <>
            <RegistroEmpresaPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/registro"
        element={
          <>
            <RegisterPage />
            <Footer />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <LoginPage />
            <Footer />
          </>
        }
      />

      <Route element={<UsserRouter />}>
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
          path="/perfil"
          element={
            <>
              <PerfilPage />
              <Footer />
            </>
          }
        />
      </Route>

      <Route element={<StudioRouter />}>
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
          path="/parthner/crear-juego"
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
      </Route>
    </Routes>
  );
}
