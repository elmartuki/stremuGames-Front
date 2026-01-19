import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRouter() {
  const token = localStorage.getItem("TokenStremuGames");
  let isAuthenticated = false;
  let rol = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 > Date.now()) {
        isAuthenticated = true;
        rol = decoded.rol;
      }
    } catch (error) {
      isAuthenticated = false;
    }
  }

  if (isAuthenticated) {
    if (rol === "empresa") return <Navigate to="/studio-panel" replace />;
    if (rol === "admin") return <Navigate to="/admin-panel" replace />;
    return <Navigate to="/explorar" replace />;
  }

  return <Outlet />;
}
