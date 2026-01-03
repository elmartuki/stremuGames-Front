import clientAxios from "../utils/clientAxios";

export const eliminarUnJuego = async (id) => {
  try {
    await clientAxios.delete(`/juegos/${id}`);
    return true;
  } catch (error) {
    console.error("Error en el servicio eliminar:", error);
    throw error;
  }
};
