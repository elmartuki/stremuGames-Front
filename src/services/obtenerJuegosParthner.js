import { useState, useEffect } from "react";
import clientAxios from "../utils/clientAxios";
import { eliminarUnJuego } from "../services/eliminarUnJuego";
import { useMessageStore } from "./MessageModal";

export const useObtenerJuegosParthner = () => {
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(true);

  const recargarJuegos = async () => {
    const { showMessage } = useMessageStore.getState();
    try {
      const response = await clientAxios.get("/juegos/juegos-subidos");
      setListado(response.data.datos);
    } catch (error) {
      showMessage(error.response?.data?.message, "error");
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
