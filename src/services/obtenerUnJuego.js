import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

export const useObtenerUnJuego = (slug) => {
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showMessage } = useMessageStore.getState();

  useEffect(() => {
    const fetchJuego = async () => {
      setLoading(true);
      try {
        const response = await clientAxios.get(`/juegos/${slug}`);

        if (response) {
          setJuego(response.data.datos);
        }
      } catch (error) {
        showMessage(error.response?.data?.message, "error");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchJuego();
    }
  }, [slug]);

  return { juego, loading };
};
