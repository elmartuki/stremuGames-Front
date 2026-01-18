import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useObtenerToken } from "./obtenerToken";
import { useMessageStore } from "./MessageModal";

export const useObtenerUsuario = (idExterno = null) => {
  const [usuario, setUsuario] = useState(null);
  const { usuarioInfo } = useObtenerToken();

  const idParaBuscar = idExterno || usuarioInfo?.id;

  useEffect(() => {
    if (!idParaBuscar) return;

    const fetchUsuario = async () => {
      const { showMessage } = useMessageStore.getState();
      try {
        const response = await clientAxios.get(`/usuarios/${idParaBuscar}`);

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
  }, [idParaBuscar]);

  return { usuario };
};
