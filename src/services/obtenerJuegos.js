import { useState, useEffect } from "react";
import clientAxios from "../utils/clientAxios";
import { eliminarUnJuego } from "../services/eliminarUnJuego";

export const useObtenerJuegos = () => {
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(true);

  const recargarJuegos = async () => {
    try {
      const response = await clientAxios.get("/juegos/");
      setListado(response.data.datos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarUnJuego(id);

      await recargarJuegos();
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  useEffect(() => {
    recargarJuegos();
  }, []);

  return { listado, loading, recargarJuegos, handleEliminar };
};
