import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "./MessageModal";

export const iniciarPago = async (juegosCarrito) => {
  const { showMessage } = useMessageStore.getState();

  if (
    !juegosCarrito ||
    !Array.isArray(juegosCarrito) ||
    juegosCarrito.length === 0
  ) {
    console.error("Carrito recibido:", juegosCarrito);
    throw new Error("El carrito está vacío o el formato es incorrecto");
  }

  const items = juegosCarrito.map((item) => {
    const titulo = item.juegoId?.titulo || item.titulo || "Producto sin nombre";

    const precio =
      item.precio || item.juegoId?.precioDescuento || item.juegoId?.precioBase;

    if (!precio || isNaN(Number(precio))) {
      console.error("Item con error de precio:", item);
      throw new Error(`Precio inválido para el juego: ${titulo}`);
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
