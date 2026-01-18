import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ROLES_PERMITIDOS = ["user", "admin", "empresa"];

export default function UsserRouter() {
  const navigate = useNavigate();
  const tokenCompleto = localStorage.getItem("TokenStremuGames");

  const token =
    typeof tokenCompleto === "string"
      ? tokenCompleto.replace("Bearer ", "")
      : null;

  let rolUsuario = null;

  if (token) {
    try {
      const usuarioInfo = jwtDecode(token);
      rolUsuario = usuarioInfo.rol;
    } catch (error) {

    }
  }

  const tieneAcceso = ROLES_PERMITIDOS.includes(rolUsuario);

  useEffect(() => {
    if (!token || !tieneAcceso) {
      navigate("/login");
    }
  }, [token, rolUsuario, navigate, tieneAcceso]);

  if (!token || !tieneAcceso) {
    return null;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
