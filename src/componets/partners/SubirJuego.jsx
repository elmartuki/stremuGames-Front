import "../../css/editarJuego.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../icons/back.svg";
import MoreVertical from "../../icons/more.svg";
import clientAxios from "../../utils/clientAxios";

const CATEGORIAS_DISPONIBLES = [
  "Acción",
  "Aventura",
  "RPG",
  "Estrategia",
  "Deportes",
  "Carreras",
  "Simulación",
  "Terror",
  "Indie",
  "Sci-Fi",
];

export default function SubirJuego() {
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    descripcion: "",
    precioBase: 0,
    precioDescuento: 0,
    imagenPortada: "",
    categorias: [],
    etiquetas: [],

    version: "1.0.0",
    pesoGB: 0,
  });

  const toggleCategoria = (categoria) => {
    setForm((prev) => {
      const existe = prev.categorias.includes(categoria);
      return {
        ...prev,
        categorias: existe
          ? prev.categorias.filter((c) => c !== categoria)
          : [...prev.categorias, categoria],
      };
    });
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const nuevaEtiqueta = tagInput.trim();

      if (nuevaEtiqueta && !form.etiquetas.includes(nuevaEtiqueta)) {
        setForm((prev) => ({
          ...prev,
          etiquetas: [...prev.etiquetas, nuevaEtiqueta],
        }));
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToDelete) => {
    setForm((prev) => ({
      ...prev,
      etiquetas: prev.etiquetas.filter((etiqueta) => etiqueta !== tagToDelete),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await clientAxios.post("/juegos/crear", form);

      alert("Juego creado exitosamente");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear el juego");
    }
  };

  return (
    <section className="edit-game">
      <div className="edit-game_header">
        <div onClick={() => navigate(-1)} className="edit-game_back-btn">
          <img src={ArrowLeft} alt="Volver" />
        </div>
        <div className="edit-game_title">
          <p>Agregar Juego</p>
          <p>Crear un nuevo juego</p>
        </div>
        <div className="edit-game_options">
          <img src={MoreVertical} alt="Opciones" />
        </div>
      </div>

      <form className="edit-game_form" onSubmit={handleSubmit}>
        <div className="edit-game_preview-container">
          <img
            className="edit-game_preview-img"
            src={
              form.imagenPortada ||
              "https://via.placeholder.com/150?text=Sin+Imagen"
            }
            alt="Vista Previa"
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/150?text=Error+URL")
            }
          />

          <div className="edit-game_input-group">
            <p>URL de la Imagen</p>
            <input
              className="edit-game_input"
              onChange={(event) =>
                setForm({ ...form, imagenPortada: event.target.value })
              }
              type="text"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={form.imagenPortada}
            />
          </div>
        </div>

        <div className="edit-game_input-group">
          <p>Título</p>
          <input
            className="edit-game_input"
            onChange={(event) =>
              setForm({ ...form, titulo: event.target.value })
            }
            type="text"
            placeholder="Nombre del juego"
            value={form.titulo}
          />
        </div>

        <div className="edit-game_row">
          <div className="edit-game_input-group">
            <p>Slug (URL)</p>
            <input
              className="edit-game_input"
              onChange={(event) =>
                setForm({ ...form, slug: event.target.value })
              }
              type="text"
              placeholder="nombre-del-juego"
              value={form.slug}
            />
          </div>
        </div>

        <div className="edit-game_row">
          <div className="edit-game_input-group">
            <p>Precio Base</p>
            <input
              className="edit-game_input"
              onChange={(event) =>
                setForm({ ...form, precioBase: Number(event.target.value) })
              }
              type="number"
              placeholder="0.00"
              value={form.precioBase}
            />
          </div>

          <div className="edit-game_input-group">
            <p>Precio con Descuento</p>
            <input
              className="edit-game_input"
              onChange={(event) =>
                setForm({
                  ...form,
                  precioDescuento: Number(event.target.value),
                })
              }
              type="number"
              placeholder="0.00"
              value={form.precioDescuento}
            />
          </div>
        </div>

        <div className="edit-game_row">
          <div className="edit-game_input-group">
            <p>Peso (GB)</p>
            <input
              className="edit-game_input"
              onChange={(event) =>
                setForm({ ...form, pesoGB: Number(event.target.value) })
              }
              type="number"
              placeholder="Ej: 50"
              value={form.pesoGB}
            />
          </div>

          <div className="edit-game_input-group">
            <p>Versión</p>
            <input
              className="edit-game_input"
              onChange={(event) =>
                setForm({ ...form, version: event.target.value })
              }
              type="text"
              placeholder="1.0.0"
              value={form.version}
            />
          </div>
        </div>

        <div className="edit-game_input-group">
          <p>Categorías</p>
          <div className="edit-game_categories-container">
            {CATEGORIAS_DISPONIBLES.map((cat) => {
              const isActive = form.categorias.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-btn ${isActive ? "active" : ""}`}
                  onClick={() => toggleCategoria(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="edit-game_input-group">
          <p>Etiquetas (Escribe y presiona Enter)</p>
          <input
            className="edit-game_input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            type="text"
            placeholder="Escribe una etiqueta..."
          />

          <div
            className="edit-game_categories-container"
            style={{ marginTop: "10px" }}
          >
            {form.etiquetas.map((tag, index) => (
              <button
                key={index}
                type="button"
                className="category-btn tag-btn"
                onClick={() => removeTag(tag)}
                title="Clic para eliminar"
              >
                {tag} ✕
              </button>
            ))}
          </div>
        </div>

        <div className="edit-game_input-group">
          <p>Descripción</p>
          <textarea
            className="edit-game_textarea"
            onChange={(event) =>
              setForm({ ...form, descripcion: event.target.value })
            }
            name="descripcion"
            placeholder="Descripción del juego..."
            value={form.descripcion}
          ></textarea>
        </div>

        <button className="edit-game_submit-btn" type="submit">
          Crear Juego
        </button>
      </form>
    </section>
  );
}
