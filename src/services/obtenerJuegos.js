import { useState, useEffect } from "react";
import clientAxios from "../utils/clientAxios";
import { eliminarUnJuego } from "../services/eliminarUnJuego";
import { useMessageStore } from "./MessageModal";

export const useObtenerJuegos = () => {
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(true);
  const showMessage = useMessageStore((state) => state.showMessage);

  const recargarJuegos = async () => {
    try {
      const response = await clientAxios.get("/juegos/");
      setListado(response.data.datos);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error al cargar juegos",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarUnJuego(id);
      await recargarJuegos();
      showMessage("Juego eliminado correctamente", "success");
    } catch (error) {
      showMessage("Error al eliminar el juego", "error");
    }
  };

  useEffect(() => {
    recargarJuegos();
  }, []);

  return { listado, loading, recargarJuegos, handleEliminar };
};
