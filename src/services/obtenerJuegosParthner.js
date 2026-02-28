import { useEffect } from "react";
import clientAxios from "../utils/clientAxios";
import { eliminarUnJuego } from "../services/eliminarUnJuego";
import { useMessageStore } from "./MessageModal";
import { useJuegoStore } from "../store/juegoStore";

export const useObtenerJuegosParthner = () => {
  const { listado, loading, fetchJuegos, setListado } = useJuegoStore();
  const showMessage = useMessageStore((state) => state.showMessage);

  const recargarJuegos = async () => {
    try {
      await fetchJuegos(true);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error al recargar",
        "error",
      );
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarUnJuego(id);
      await recargarJuegos();
      showMessage("Juego eliminado", "success");
    } catch (error) {
      showMessage("Error al eliminar", "error");
    }
  };

  useEffect(() => {
    fetchJuegos();
  }, [fetchJuegos]);

  return { listado, loading, recargarJuegos, handleEliminar };
};
