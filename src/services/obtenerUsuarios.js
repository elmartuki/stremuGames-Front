import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";

export const useObtenerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await clientAxios.get("/usuarios");

        setUsuarios(response.data.datos || []);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchUsuarios();
  }, []);

  const usuariosComunes = usuarios.filter((usuario) => {
    return usuario.rol === "user";
  });

  const empresas = usuarios.filter((usuario) => {
    return usuario.rol === "empresa";
  });

  return { usuarios, cargando, usuariosComunes, empresas };
};
