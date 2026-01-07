import { jwtDecode } from "jwt-decode";

export const useObtenerToken = () => {
  const tokenCompleto = localStorage.getItem("TokenStremuGames");

  const token =
    tokenCompleto && typeof tokenCompleto === "string"
      ? tokenCompleto.replace("Bearer ", "")
      : null;

  if (!token) {
    return null;
  }

  const usuarioInfo = jwtDecode(token);

  return { usuarioInfo };
};
