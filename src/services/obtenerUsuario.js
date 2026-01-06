import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useObtenerToken } from "./obtenerToken";

export const useObtenerUsuario = () => {
  const [usuario, setUsuario] = useState([]);

  const { usuarioInfo } = useObtenerToken();

  const { id } = usuarioInfo;

  useEffect(() => {
    const usuarioFetch = async () => {
      try {
        const response = await clientAxios.get(`/usuarios/${id}`);

        if (response) {
          setUsuario(response.data.datos);
        }
      } catch (error) {
        console.log(error);
      }
    };

    usuarioFetch();
  }, [id]);

  return { usuario };
};
