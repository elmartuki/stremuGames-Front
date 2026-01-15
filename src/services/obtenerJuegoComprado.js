import clientAxios from "../utils/clientAxios";

export const obtenerBiblioteca = async () => {
  const res = await clientAxios.get("/usuarios/biblioteca");
  return res.data.juegos;
};
