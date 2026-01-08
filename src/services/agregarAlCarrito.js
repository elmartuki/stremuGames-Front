import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

export const useAgregarJuegoAlcarrito = async (producto) => {
  const { showMessage } = useMessageStore.getState();
  try {
    const response = await clientAxios.post(`/carrito/${producto}`);

    showMessage(response.data.message, "success");
  } catch (error) {
    showMessage(error.response?.data?.message, "error");
  }
};
