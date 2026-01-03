import React from "react";

export default function Categorias() {
  const categorias = [
    {
      nombre: "Acción",
      color: "linear-gradient(to right, #ff416c, #ff6a88)",
    },
    {
      nombre: "Aventura",
      color: "linear-gradient(to right, #f7971e, #ffaf4b)",
    },
    {
      nombre: "RPG",
      color: "linear-gradient(to right, #8360c3, #9d7add)",
    },
    {
      nombre: "Estrategia",
      color: "linear-gradient(to right, #0099f7, #4bbbfb)",
    },
    {
      nombre: "Deportes",
      color: "linear-gradient(to right, #56ab2f, #7bd154)",
    },
    {
      nombre: "Carreras",
      color: "linear-gradient(to right, #f05053, #ff7678)",
    },
    {
      nombre: "Simulación",
      color: "linear-gradient(to right, #4568dc, #6a85e6)",
    },
    {
      nombre: "Terror",
      color: "linear-gradient(to right, #1f1f1f, #3a3a3a)",
    },
    {
      nombre: "Indie",
      color: "linear-gradient(to right, #1fa2ff, #5ac8fa)",
    },
    {
      nombre: "Sci-Fi",
      color: "linear-gradient(to right, #cc2b5e, #e64c7b)",
    },
  ];

  return (
    <>
      {categorias.map((item, index) => (
        <article
          key={index}
          className="categoria"
          style={{ background: item.color }}
        >
          {item.nombre}
        </article>
      ))}
    </>
  );
}
