import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import EditarJuego from "../components/partners/EditarJuego.jsx";
import SubirJuego from "../components/partners/SubirJuego.jsx";
import ExplorarPage from "../pages/ExplorarPage.jsx";
import CategoriasPage from "../pages/CategoriasPage.jsx";
import CategoriaSeleccionadaPage from "../pages/CategoriaSeleccionadaPage.jsx";
import Footer from "../components/footer/FooterPhone.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import PerfilPage from "../pages/PerfilPage.jsx";
import UsserRouter from "./UsserRouter.jsx";
import StudioRouter from "./StudioRouter.jsx";
import RegistroEmpresaPage from "../pages/RegistroEmpresaPage.jsx";
import CarritoPage from "../pages/CarritoPage.jsx";
import PerfilConfigPage from "../pages/PerfilConfigPage.jsx";
import EditarPerfil from "../components/perfil/EditarPerfil.jsx";
import AdminRouter from "./AdminRouter.jsx";
import AdminPanelPage from "../pages/AdminPanelPage.jsx";
import Usuarios from "../components/admin/Usuarios.jsx";
import Empresas from "../components/admin/Empresas.jsx";
import Juegos from "../components/admin/Juegos.jsx";
import PerfilEmpresaPage from "../pages/PerfilEmpresaPage.jsx";
import BibliotecaPage from "../pages/BibliotecaPage.jsx";
import useMediaQuery from "../utils/changeDesk.js";
import DetallesJuegoPage from "../pages/DetallesJuegoPage.jsx";
import StudioPage from "../pages/StudioPage.jsx";
import NavBar from "../components/navbar/NavBar.jsx";
import InitPage from "../pages/InitPage.jsx";
import FooterWeb from "../components/footer/FooterWeb.jsx";
import ComunidadPage from "../pages/ComunidadPage.jsx";
import Exitoso from "../components/payments/Exitoso.jsx";
import Fallido from "../components/payments/Fallido.jsx";
import Pendiente from "../components/payments/Pendiente.jsx";
import RecuperarContraseña from "../components/auth/RecuperarContraseña.jsx";
import RecoverPassword from "../components/auth/RecuperarContraseña.jsx";
import FavoritosPage from "../pages/FavoritosPage.jsx";
import SoportePage from "../pages/SoportePage.jsx";
import Error404 from "../pages/Error404.jsx";
import SobreNosotrosPage from "../pages/SobreNosotrosPage.jsx";

export default function AppRouter() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const LayoutGlobal = () => {
    const location = useLocation();

    const ocultarEnMovil = [
      "/perfil",
      "/carrito",
      "/perfil/editar-perfil",
      "/login",
      "/registro",
      "/registro-empresa",
      "/pago/exitoso/",
      "/pago/fallido/",
      "/perfil/recuperar",
      "/perfil/favoritos",
      "/login/recuperar",
    ];

    const mostrarNavbar =
      isDesktop || !ocultarEnMovil.includes(location.pathname);

    return (
      <>
        {mostrarNavbar && <NavBar />}
        <main className="main-content">
          <Outlet />
        </main>
      </>
    );
  };

  return (
    <Routes>
      <Route element={<LayoutGlobal />}>
        <Route
          path="/"
          element={
            <>
              <InitPage />
              <FooterWeb />
            </>
          }
        />
        <Route
          path="/explorar"
          element={
            <>
              <ExplorarPage />
              <Footer />
              <FooterWeb />
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
          path="/soporte"
          element={
            <>
              <SoportePage />
              <FooterWeb />
              <Footer />
            </>
          }
        />
        <Route
          path="/comunidad"
          element={
            <>
              <ComunidadPage />
              <FooterWeb />
              <Footer />
            </>
          }
        />
        <Route
          path="/comunidad/estudio/:id"
          element={
            <>
              <PerfilEmpresaPage />
              <FooterWeb />
              <Footer />
            </>
          }
        />
        <Route
          path="/login/recuperar"
          element={
            <>
              <RecoverPassword />
            </>
          }
        />
        <Route
          path="/sobre-nosotros"
          element={
            <>
              <SobreNosotrosPage />
              <FooterWeb />
              <Footer />
            </>
          }
        />
        <Route
          path="/comunidad/usuario/:id"
          element={
            <>
              <PerfilPage />
              <FooterWeb />
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
          />{" "}
          <Route
            path="/perfil/favoritos"
            element={
              <>
                <FavoritosPage />
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
                {!isDesktop && <Footer />}
              </>
            }
          />
          <Route
            path="/pago/exitoso/"
            element={
              <>
                <Exitoso />
              </>
            }
          />
          <Route
            path="/pago/fallido/"
            element={
              <>
                <Fallido />
              </>
            }
          />
          <Route
            path="/pago/pendiente/"
            element={
              <>
                <Pendiente />
              </>
            }
          />
          <Route
            path="/perfil/recuperar"
            element={
              <>
                <RecoverPassword />
              </>
            }
          />
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
                <StudioPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/studio-panel/crear-juego"
            element={
              <>
                <SubirJuego />
                <Footer />
              </>
            }
          />
          <Route
            path="/studio-panel/editar-juego/:id"
            element={
              <>
                <EditarJuego />
                <Footer />
              </>
            }
          />
        </Route>
      </Route>

      <Route
        path="/login"
        element={
          <>
            <LoginPage />
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
        path="/registro-empresa"
        element={
          <>
            <RegistroEmpresaPage />
            <Footer />
          </>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
