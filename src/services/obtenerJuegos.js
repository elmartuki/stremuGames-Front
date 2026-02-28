import { useEffect } from "react";
import { eliminarUnJuego } from "../services/eliminarUnJuego";
import { useMessageStore } from "./MessageModal";
import { useJuegoStore } from "./juegosStore";

export const useObtenerJuegos = () => {
  const { listado, loading, fetchJuegos, actualizarUnJuego } = useJuegoStore();
  const showMessage = useMessageStore((state) => state.showMessage);

  useEffect(() => {
    fetchJuegos();
  }, [fetchJuegos]);

  const handleEliminar = async (id) => {
    try {
      await eliminarUnJuego(id);

      await fetchJuegos(true);
      showMessage("Juego eliminado correctamente", "success");
    } catch (error) {
      showMessage("Error al eliminar el juego", "error");
    }
  };

  return {
    listado,
    loading,
    recargarJuegos: () => fetchJuegos(true),
    handleEliminar,

    setListado: actualizarUnJuego,
  };
};
