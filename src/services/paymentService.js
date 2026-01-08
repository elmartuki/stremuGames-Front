import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

export const iniciarPago = async (juegosCarrito) => {
  const { showMessage } = useMessageStore.getState();

  if (!juegosCarrito || juegosCarrito.length === 0) {
    throw new Error("El carrito está vacío");
  }

  const items = juegosCarrito.map((item) => {
    if (!item.precio || isNaN(Number(item.precio))) {
      throw new Error(`Precio inválido: ${item.titulo}`);
    }

    return {
      title: item.titulo,
      unit_price: Number(item.precio),
      quantity: 1,
    };
  });

  try {
    const response = await clientAxios.post("/payment/create_preference", {
      items,
    });

    showMessage(response.data.message, "success");
  } catch (error) {
    showMessage(error.response?.data?.message, "error");
  }

  return response.data;
};
