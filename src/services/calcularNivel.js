import { useObtenerUsuario } from "./obtenerUsuario";

export const useCalcularNivel = (id) => {
  const { usuario } = useObtenerUsuario(id);

  const juegosCount = usuario?.juegosComprados?.length || 0;

  const puntos = juegosCount * 250;
  const nivel = Math.floor(puntos / 1000);
  const porcentajeProgreso = (puntos % 1000) / 10;

  return {
    nivel,
    puntos,
    porcentajeProgreso,
  };
};
