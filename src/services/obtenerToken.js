import { jwtDecode } from "jwt-decode";

export const useObtenerToken = () => {
  const tokenCompleto = localStorage.getItem("TokenStremuGames");

  const token =
    tokenCompleto && typeof tokenCompleto === "string"
      ? tokenCompleto.replace("Bearer ", "")
      : null;

  if (!token) {
    return { usuarioInfo: null, token: null };
  }

  try {
    const usuarioInfo = jwtDecode(token);
    return { usuarioInfo, token };
  } catch (error) {
    console.error("Token inválido:", error);
    return { usuarioInfo: null, token: null };
  }
};
