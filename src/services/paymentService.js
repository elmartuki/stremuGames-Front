import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

export const iniciarPago = async (juegosCarrito) => {
  const { showMessage } = useMessageStore.getState();

  if (!juegosCarrito || juegosCarrito.length === 0) {
    throw new Error("El carrito está vacío");
  }

  const items = juegosCarrito.map((item) => {
    const titulo = item.juegoId?.titulo || item.titulo;
    const precio = item.juegoId?.precio || item.precio;

    if (!precio || isNaN(Number(precio))) {
      throw new Error(`Precio inválido para el juego`);
    }

    return {
      title: titulo,
      unit_price: Number(precio),
      quantity: 1,
    };
  });

  try {
    const response = await clientAxios.post("/payment/create_preference", {
      items,
    });

    showMessage(response.data.message || "Preferencia creada", "success");

    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Error al procesar el pago";
    showMessage(errorMsg, "error");

    throw error;
  }
};
