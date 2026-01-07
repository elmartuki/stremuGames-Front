import { useEffect, useState } from "react";
import clientAxios from "../utils/clientAxios";

export const useObtenerUnJuego = (id) => {
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJuego = async () => {
      setLoading(true);
      try {
        const response = await clientAxios.get(`/juegos/${id}`);
        console.log(response);
        if (response) {
          setJuego(response.data.datos);
        }
      } catch (error) {
        console.error("Error cargando el juego:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJuego();
    }
  }, [id]);

  return { juego, loading };
};
