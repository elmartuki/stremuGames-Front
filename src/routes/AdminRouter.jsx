import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ROLES_PERMITIDOS = ["admin"];

export default function AdminRouter() {
  const navigate = useNavigate();
  const tokenLocalStorage = localStorage.getItem("TokenStremuGames");

  const token =
    tokenLocalStorage && typeof tokenLocalStorage === "string"
      ? tokenLocalStorage.replace("Bearer ", "").trim()
      : null;

  let rolUsuario = null;

  if (token) {
    try {
      const usuarioInfo = jwtDecode(token);
      rolUsuario = usuarioInfo.rol;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  const tieneAcceso = ROLES_PERMITIDOS.includes(rolUsuario);

  useEffect(() => {
    if (!token || !tieneAcceso) {
      navigate("/login-empresa", { replace: true });
    }
  }, [token, tieneAcceso, navigate]);

  if (!token || !tieneAcceso) {
    return null;
  }

  return <Outlet />;
}
