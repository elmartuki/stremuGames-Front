import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useObtenerToken } from "./obtenerToken";
import { useMessageStore } from "./MessageModal";

export const useObtenerUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const { usuarioInfo } = useObtenerToken();
  const id = usuarioInfo?.id;

  useEffect(() => {
    if (!id) return;

    const fetchUsuario = async () => {
      const { showMessage } = useMessageStore.getState();
      try {
        const response = await clientAxios.get(`/usuarios/${id}`);

        if (response.data) {
          setUsuario(response.data.datos);
        }
      } catch (error) {
        showMessage(error.response?.data?.message, "error");
      }
    };

    fetchUsuario();
  }, [id]);

  return { usuario };
};
