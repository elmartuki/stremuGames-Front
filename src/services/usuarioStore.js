import { create } from "zustand";
import clientAxios from "../utils/clientAxios";

export const useUsuarioStore = create((set, get) => ({
  usuario: null,
  loading: false,
  cargado: false,

  obtenerUsuario: async (nombreUsuario) => {
    // BLOQUEO CRUCIAL: Si ya cargó O está cargando actualmente, NO HACER NADA
    if (get().cargado || get().loading) return;

    set({ loading: true });
    try {
      const response = await clientAxios.get(`/usuarios/${nombreUsuario}`);
      set({ usuario: response.data.datos, cargado: true });
    } catch (error) {
      set({ usuario: null, cargado: false });
    } finally {
      set({ loading: false });
    }
  },
}));
