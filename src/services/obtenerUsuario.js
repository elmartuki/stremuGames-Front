import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useObtenerToken } from "./obtenerToken";
import { useMessageStore } from "./MessageModal";

export const useObtenerUsuario = (usuarioExterno = null) => {
  const [usuario, setUsuario] = useState(null);
  const { usuarioInfo } = useObtenerToken();

  const usuarioParaBuscar = usuarioExterno || usuarioInfo?.nombreUsuario;

  useEffect(() => {
    if (!usuarioParaBuscar) return;

    const fetchUsuario = async () => {
      const { showMessage } = useMessageStore.getState();
      try {
        const response = await clientAxios.get(
          `/usuarios/${usuarioParaBuscar}`,
        );

        if (response.data) {
          setUsuario(response.data.datos);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error al obtener usuario",
          "error",
        );
      }
    };

    fetchUsuario();
  }, [usuarioParaBuscar]);

  return { usuario };
};
