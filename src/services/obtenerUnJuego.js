import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";
import { useJuegoStore } from "../services/juegosStore";

const cacheJuegos = {};

export const useObtenerUnJuego = (slugOrId) => {
  const juegoDelStore = useJuegoStore((state) =>
    state.listado.find((j) => j._id === slugOrId || j.slug === slugOrId),
  );

  const [juego, setJuego] = useState(
    juegoDelStore || cacheJuegos[slugOrId] || null,
  );
  const [loading, setLoading] = useState(
    !juegoDelStore && !cacheJuegos[slugOrId],
  );

  useEffect(() => {
    if (!slugOrId) return;

    if (juegoDelStore) {
      setJuego(juegoDelStore);
      cacheJuegos[slugOrId] = juegoDelStore;
      setLoading(false);
      return;
    }

    if (cacheJuegos[slugOrId]) {
      setJuego(cacheJuegos[slugOrId]);
      setLoading(false);
      return;
    }

    const fetchJuego = async () => {
      setLoading(true);
      const { showMessage } = useMessageStore.getState();
      try {
        const response = await clientAxios.get(`/juegos/${slugOrId}`);
        const datos = response.data.datos;
        cacheJuegos[slugOrId] = datos;
        setJuego(datos);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error al cargar",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJuego();
  }, [slugOrId, juegoDelStore]);

  return { juego, loading };
};
