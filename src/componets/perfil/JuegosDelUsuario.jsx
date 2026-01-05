import React, { useState } from "react";
import { useObtenerJuegosParthner } from "../../services/obtenerJuegosParthner";

export default function JuegosDelUsuario() {
  const { listado } = useObtenerJuegosParthner();

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
