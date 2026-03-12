import { useEffect } from "react";
import { eliminarUnJuego } from "../services/eliminarUnJuego";
import { useMessageStore } from "./MessageModal";
import { useJuegoStore } from "../store/juegoStore";

export const useObtenerJuegosParthner = () => {
  const { listado, loading, fetchJuegos, eliminarJuegoDelListado } =
    useJuegoStore();
  const showMessage = useMessageStore((state) => state.showMessage);

  const handleEliminar = async (id) => {
    eliminarJuegoDelListado(id);
    try {
      await eliminarUnJuego(id);
      showMessage("Juego eliminado", "success");
    } catch (error) {
      fetchJuegos();
      showMessage("Error al eliminar", "error");
    }
  };

  useEffect(() => {
    fetchJuegos();
  }, []);

  return { listado, loading, handleEliminar };
};
