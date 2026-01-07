import clientAxios from "../utils/clientAxios";

export const obtenerCarrito = async () => {
  const response = await clientAxios.get("/carrito");
  return response.data;
};
