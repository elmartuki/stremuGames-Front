import { Route, Routes } from "react-router-dom";
import ParthnersPage from "../pages/ParthnersPage.jsx";
import EditarJuego from "../componets/partners/EditarJuego.jsx";
import SubirJuego from "../componets/partners/SubirJuego.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/parthner"
        element={
          <>
            <ParthnersPage />
          </>
        }
      />

      <Route
        path="/parthner/crear-juego/"
        element={
          <>
            <SubirJuego />
          </>
        }
      />

      <Route
        path="/parthner/editar-juego/:id"
        element={
          <>
            <EditarJuego />
          </>
        }
      />
    </Routes>
  );
}
