import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

export const obtenerCarrito = async () => {
  const { showMessage } = useMessageStore.getState();

  try {
    const response = await clientAxios.get("/carrito");

    return response.data;
  } catch (error) {
    console.error(error);
    showMessage(
      error.response?.data?.message || "Error al obtener carrito",
      "error"
    );

    return null;
  }
};
