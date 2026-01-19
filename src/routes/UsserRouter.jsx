import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ROLES_PERMITIDOS = ["user", "admin", "empresa"];

export default function UsserRouter() {
  const navigate = useNavigate();
  const tokenLocalStorage = localStorage.getItem("TokenStremuGames");

  const token =
    tokenLocalStorage && typeof tokenLocalStorage === "string"
      ? tokenLocalStorage.replace("Bearer ", "").trim()
      : null;

  const datosUsuario = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }, [token]);

  const tieneRol = datosUsuario && ROLES_PERMITIDOS.includes(datosUsuario.rol);
  const tokenNoExpirado = datosUsuario
    ? datosUsuario.exp * 1000 > Date.now()
    : false;

  const tieneAcceso = tieneRol && tokenNoExpirado;

  useEffect(() => {
    if (!token || !tieneAcceso) {
      if (token && !tokenNoExpirado) {
        localStorage.removeItem("TokenStremuGames");
      }
      navigate("/login", { replace: true });
    }
  }, [token, tieneAcceso, navigate, tokenNoExpirado]);

  if (!token || !tieneAcceso) {
    return null;
  }

  return <Outlet />;
}
