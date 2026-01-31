import { Route, Routes, Outlet, useLocation } from "react-router-dom";
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
import CarritoPage from "../pages/CarritoPage.jsx";
import PerfilConfigPage from "../pages/PerfilConfigPage.jsx";
import EditarPerfil from "../componets/perfil/EditarPerfil.jsx";
import AdminRouter from "./AdminRouter.jsx";
import AdminPanelPage from "../pages/AdminPanelPage.jsx";
import Usuarios from "../componets/admin/Usuarios.jsx";
import Empresas from "../componets/admin/Empresas.jsx";
import Juegos from "../componets/admin/Juegos.jsx";
import PerfilEmpresaPage from "../pages/PerfilEmpresaPage.jsx";
import BibliotecaPage from "../pages/BibliotecaPage.jsx";
import useMediaQuery from "../utils/changeDesk.js";
import DetallesJuegoPage from "../pages/DetallesJuegoPage.jsx";
import StudioPage from "../pages/StudioPage.jsx";
import NavBar from "../componets/navbar/NavBar.jsx";
import InitPage from "../pages/InitPage.jsx";
import FooterWeb from "../componets/footer/FooterWeb.jsx";
import ComunidadPage from "../pages/ComunidadPage.jsx";

export default function AppRouter() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const LayoutConNavbar = () => {
    const location = useLocation();

    const mostrarNavbar =
      isDesktop ||
      (location.pathname !== "/perfil" &&
        location.pathname !== "/carrito" &&
        location.pathname !== "/perfil/editar-perfil");

    return (
      <>
        {mostrarNavbar && <NavBar />}
        <Outlet />
      </>
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <InitPage />
            <FooterWeb />
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

      <Route element={<LayoutConNavbar />}>
        <Route
          path="/explorar"
          element={
            <>
              <ExplorarPage />
              <Footer />
              {isDesktop ? <FooterWeb /> : <></>}
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
          path="/juego/:id"
          element={
            <>
              <DetallesJuegoPage />
              {isDesktop ? <FooterWeb /> : <Footer />}
            </>
          }
        />

        <Route
          path="/comunidad"
          element={
            <>
              <ComunidadPage />
              {isDesktop ? (
                <FooterWeb />
              ) : (
                <>
                  <Footer />
                </>
              )}
            </>
          }
        />

        <Route
          path="/comunidad/estudio/:id"
          element={
            <>
              <PerfilEmpresaPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/comunidad/usuario/:id"
          element={
            <>
              <PerfilPage />
              <Footer />
            </>
          }
        />

        <Route element={<UsserRouter />}>
          <Route
            path="/perfil"
            element={
              <>
                <PerfilConfigPage />
                <Footer />
              </>
            }
          />

          <Route
            path="/perfil/editar-perfil"
            element={
              <>
                <EditarPerfil />
                <Footer />
              </>
            }
          />

          <Route
            path="/biblioteca"
            element={
              <>
                <BibliotecaPage />
                <Footer />
              </>
            }
          />

          <Route
            path="/carrito"
            element={
              <>
                <CarritoPage />
                {isDesktop ? <></> : <Footer />}
              </>
            }
          />
        </Route>
      </Route>

      <Route element={<AdminRouter />}>
        <Route
          path="/admin-panel"
          element={
            <>
              <AdminPanelPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin-panel/usuarios"
          element={
            <>
              <Usuarios />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin-panel/empresas"
          element={
            <>
              <Empresas />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin-panel/juegos"
          element={
            <>
              <Juegos />
              <Footer />
            </>
          }
        />
      </Route>

      <Route element={<StudioRouter />}>
        <Route
          path="/studio-panel"
          element={
            <>
              <NavBar />
              <StudioPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/studio-panel/crear-juego"
          element={
            <>
              <NavBar />
              <SubirJuego />
              <Footer />
            </>
          }
        />
        <Route
          path="/studio-panel/editar-juego/:id"
          element={
            <>
              <NavBar />
              <EditarJuego />
              <Footer />
            </>
          }
        />
      </Route>
    </Routes>
  );
}
