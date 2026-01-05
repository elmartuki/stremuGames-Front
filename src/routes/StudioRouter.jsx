import { jwtDecode } from "jwt-decode";
import { Outlet, useNavigate } from "react-router-dom";

const ROLES_PERMITIDOS = ["empresa"];

export default function StudioRouter() {
  const navigate = useNavigate();
  const tokenCompleto = localStorage.getItem("TokenStremuGames");

  const token =
    tokenCompleto && typeof tokenCompleto === "String"
      ? tokenCompleto.replace("Bearer ", "")
      : null;

  let rolUsuario = null;

  if (token) {
    try {
      const usuarioInfo = jwtDecode(token);
      rolUsuario = usuarioInfo.rol;
    } catch (error) {
      console.log(error);
    }
  }

  const tieneAcceso = ROLES_PERMITIDOS.includes(rolUsuario);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (!ROLES_PERMITIDOS.includes(rolUsuario)) {
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
