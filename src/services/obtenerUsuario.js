import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useObtenerToken } from "./obtenerToken";

export const useObtenerUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const { usuarioInfo } = useObtenerToken();
  const id = usuarioInfo?.id;

  useEffect(() => {
    if (!id) return;

    const fetchUsuario = async () => {
      try {
        const response = await clientAxios.get(`/usuarios/${id}`);
        if (response.data) {
          setUsuario(response.data.datos);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUsuario();
  }, [id]);

  return { usuario };
};
