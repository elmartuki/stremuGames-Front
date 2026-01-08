import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

export const eliminarUnJuego = async (id) => {
  const { showMessage } = useMessageStore.getState();
  try {
    const response = await clientAxios.delete(`/juegos/${id}`);
    showMessage(response.data.message, "success");
    return true;
  } catch (error) {
    showMessage(error.response?.data?.message, "error");

    throw error;
  }
};
