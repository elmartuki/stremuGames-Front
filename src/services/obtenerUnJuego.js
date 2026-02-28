import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

const cacheJuegos = {};
const promesasEnCurso = {};

export const useObtenerUnJuego = (slug) => {
  const [juego, setJuego] = useState(cacheJuegos[slug] || null);
  const [loading, setLoading] = useState(!cacheJuegos[slug]);

  useEffect(() => {
    if (!slug) return;
    if (cacheJuegos[slug]) {
      setJuego(cacheJuegos[slug]);
      setLoading(false);
      return;
    }

    const fetchJuego = async () => {
      if (promesasEnCurso[slug]) {
        const resultado = await promesasEnCurso[slug];
        setJuego(resultado);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { showMessage } = useMessageStore.getState();

      promesasEnCurso[slug] = (async () => {
        try {
          const response = await clientAxios.get(`/juegos/${slug}`);
          const datos = response.data.datos;
          cacheJuegos[slug] = datos;
          return datos;
        } catch (error) {
          showMessage(error.response?.data?.message, "error");
          return null;
        }
      })();

      const final = await promesasEnCurso[slug];
      setJuego(final);
      setLoading(false);
      delete promesasEnCurso[slug];
    };

    fetchJuego();
  }, [slug]);

  return { juego, loading };
};
