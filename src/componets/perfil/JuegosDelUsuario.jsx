import React, { useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";

export default function JuegosDelUsuario({ juegosComprados = [] }) {
  const { listado } = useObtenerJuegos();

  const juegosEncontrados = listado.filter((juegoGeneral) =>
    juegosComprados.includes(juegoGeneral._id)
  );

  if (juegosEncontrados.length === 0) {
    return <>Este usuario no tiene juegos comprados.</>;
  }

  return (
    <>
      {juegosEncontrados.map((juego) => (
        <article key={juego._id} className="juego_tarjeta">
          <div>
            <img src={juego.imagenPortada} alt={juego.titulo} />
          </div>
          <div>
            <p>{juego.titulo}</p>
            <p>{juego.desarrolladora}</p>
          </div>
        </article>
      ))}
    </>
  );
}
