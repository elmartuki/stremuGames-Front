import React, { useState } from "react";
import { useObtenerJuegos } from "../../services/obtenerJuegos";

export default function JuegosDelUsuario() {
  const { listado } = useObtenerJuegos();

  return (
    <>
      {listado.map((juego) => {
        const { imagenPortada, titulo, desarrolladora } = juego;
        return (
          <article className="juego_tarjeta">
            <div>
              <img src={imagenPortada} alt="" />
            </div>
            <div>
              <p>{titulo}</p>
              <p>{desarrolladora}</p>
            </div>
          </article>
        );
      })}
    </>
  );
}
