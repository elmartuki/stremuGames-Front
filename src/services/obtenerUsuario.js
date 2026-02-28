import { useEffect } from "react";
import { useObtenerToken } from "./obtenerToken";
import { useUsuarioStore } from "./usuarioStore";

export const useObtenerUsuario = (usuarioExterno = null) => {
  const { usuario, obtenerUsuario } = useUsuarioStore();
  const { usuarioInfo } = useObtenerToken();

  const usuarioParaBuscar = usuarioExterno || usuarioInfo?.nombreUsuario;

  useEffect(() => {
    if (usuarioParaBuscar) {
      obtenerUsuario(usuarioParaBuscar);
    }
  }, [usuarioParaBuscar, obtenerUsuario]);

  return { usuario };
};
