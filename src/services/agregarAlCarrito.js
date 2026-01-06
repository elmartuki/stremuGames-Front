import clientAxios from "../utils/clientAxios";

export const useAgregarJuegoAlcarrito = async (producto) => {
  try {
    const response = await clientAxios.post(`/carrito/${producto}`);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
