import { create } from "zustand";
import clientAxios from "../utils/clientAxios";

let peticionEnCurso = false;

export const useJuegoStore = create((set, get) => ({
  listado: [],
  loading: false,
  cargado: false,

  fetchJuegos: async () => {
    if (peticionEnCurso) return;

    peticionEnCurso = true;

    if (!get().cargado) {
      set({ loading: true });
    }

    try {
      const { data } = await clientAxios.get(
        `/juegos/?t=${new Date().getTime()}`,
      );
      set({ listado: data.datos, cargado: true });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
      peticionEnCurso = false;
    }
  },

  actualizarUnJuego: (juegoActualizado) => {
    const nuevoListado = get().listado.map((j) =>
      j._id === juegoActualizado._id ? juegoActualizado : j,
    );
    set({ listado: nuevoListado });
  },

  setListado: (nuevoListado) => set({ listado: nuevoListado }),

  eliminarJuegoDelListado: (id) => {
    const nuevoListado = get().listado.filter((j) => j._id !== id);
    set({ listado: nuevoListado });
  },
}));
