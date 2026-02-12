import "../../css/editarJuego.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../icons/back.svg";
import MoreVertical from "../../icons/more.svg";
import general from "../../icons/general.svg";
import price from "../../icons/price.svg";
import descripcionIcon from "../../icons/descripcion.svg";
import upload from "../../icons/upload.svg";
import galeriaIcon from "../../icons/galeria.svg";
import noImage from "../../icons/noimage.png";

import clientAxios from "../../utils/clientAxios";
import { useSubirImagen } from "../../services/uploadImages";
import useMediaQuery from "../../utils/changeDesk";
import { useMessageStore } from "../../services/MessageModal";

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
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const { showMessage } = useMessageStore.getState();

  const inputPortadaRef = useRef(null);
  const inputBannerRef = useRef(null);
  const inputGaleriaRef = useRef(null);

  const {
    subirImagen: subirPortada,
    imagenUrl: urlPortada,
    subiendo: subiendoPortada,
  } = useSubirImagen();

  const {
    subirImagen: subirBanner,
    imagenUrl: urlBanner,
    subiendo: subiendoBanner,
  } = useSubirImagen();

  const {
    subirImagen: subirGaleria,
    imagenUrl: urlGaleria,
    subiendo: subiendoGaleria,
  } = useSubirImagen();

  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    descripcion: "",
    precioBase: 0,
    precioDescuento: 0,
    imagenPortada: "",
    imagenBanner: "",
    galeria: [],
    categorias: [],
    etiquetas: [],
    version: "1.0.0",
    pesoGB: 0,
  });

  useEffect(() => {
    if (urlPortada) {
      setForm((prev) => ({ ...prev, imagenPortada: urlPortada }));
    }
  }, [urlPortada]);

  useEffect(() => {
    if (urlBanner) {
      setForm((prev) => ({ ...prev, imagenBanner: urlBanner }));
    }
  }, [urlBanner]);

  useEffect(() => {
    if (urlGaleria) {
      setForm((prev) => ({
        ...prev,
        galeria: [...prev.galeria, urlGaleria],
      }));
    }
  }, [urlGaleria]);

  const triggerPortadaUpload = () => inputPortadaRef.current.click();
  const triggerBannerUpload = () => inputBannerRef.current.click();
  const triggerGaleriaUpload = () => inputGaleriaRef.current.click();

  const handleFilePortada = (e) => {
    const file = e.target.files[0];
    if (file) subirPortada(file);
  };

  const handleFileBanner = (e) => {
    const file = e.target.files[0];
    if (file) subirBanner(file);
  };

  const handleFileGaleria = (e) => {
    const file = e.target.files[0];
    if (file && form.galeria.length < 4) {
      subirGaleria(file);
    }
    e.target.value = null;
  };

  const removeImageFromGallery = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      galeria: prev.galeria.filter((_, index) => index !== indexToRemove),
    }));
  };

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

    if (!form.titulo.trim() || !form.slug.trim() || !form.descripcion.trim()) {
      return showMessage(
        "Título, Slug y Descripción son obligatorios",
        "error",
      );
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(form.slug)) {
      return showMessage(
        "El Slug solo admite minúsculas, números y guiones",
        "error",
      );
    }

    if (form.precioBase < 0 || form.precioDescuento < 0 || form.pesoGB < 0) {
      return showMessage(
        "Los valores numéricos no pueden ser negativos",
        "error",
      );
    }

    if (form.precioDescuento > form.precioBase) {
      return showMessage(
        "El descuento no puede superar al precio base",
        "error",
      );
    }

    if (!form.imagenPortada || !form.imagenBanner) {
      return showMessage("La portada y el banner son obligatorios", "error");
    }

    if (form.categorias.length === 0) {
      return showMessage("Selecciona al menos una categoría", "error");
    }

    try {
      await clientAxios.post("/juegos/crear", form);
      showMessage("Juego creado exitosamente", "success");
      navigate("/studio-panel");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Hubo un error al crear el juego";
      showMessage(msg, "error");
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <section className="edit-game">
      {!isDesktop && (
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
      )}

      <form className="edit-game_form" onSubmit={handleSubmit}>
        <section className="inputs_container">
          <p className="inputs_container_titulo">
            <img src={general} alt="" />
            Informacion General
          </p>
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
        </section>

        <section className="inputs_container">
          <p className="inputs_container_titulo">
            <img src={galeriaIcon} alt="" />
            Imágenes Principales
          </p>
          <section className="preview_imagen_container">
            <div className="edit-game_preview-container">
              <div style={{ position: "relative" }}>
                <img
                  className="edit-game_preview-img"
                  src={
                    form.imagenPortada ||
                    "https://via.placeholder.com/150?text=Sin+Imagen"
                  }
                  alt="Portada Preview"
                  style={{ opacity: subiendoPortada ? 0.5 : 1 }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150?text=Error+URL")
                  }
                />
                {subiendoPortada && (
                  <div className="loading-overlay">Subiendo...</div>
                )}
              </div>

              <div className="edit-game_input-group">
                <p>Imagen Portada</p>
                <div className="input-with-button">
                  <input
                    type="file"
                    ref={inputPortadaRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFilePortada}
                  />
                  <button
                    type="button"
                    className="btn-upload"
                    onClick={triggerPortadaUpload}
                    disabled={subiendoPortada}
                  >
                    <img src={upload} alt="" /> Subir Portada
                  </button>
                </div>
              </div>
            </div>

            <div className="edit-game_preview-container">
              <div style={{ position: "relative" }}>
                <img
                  className="edit-game_preview-img"
                  src={
                    form.imagenBanner ||
                    "https://via.placeholder.com/150?text=Sin+Imagen"
                  }
                  alt="Banner Preview"
                  style={{ opacity: subiendoBanner ? 0.5 : 1 }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150?text=Error+URL")
                  }
                />
                {subiendoBanner && (
                  <div className="loading-overlay">Subiendo...</div>
                )}
              </div>

              <div className="edit-game_input-group">
                <p>Imagen Banner</p>
                <div className="input-with-button">
                  <input
                    type="file"
                    ref={inputBannerRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileBanner}
                  />
                  <button
                    type="button"
                    className="btn-upload"
                    onClick={triggerBannerUpload}
                    disabled={subiendoBanner}
                  >
                    <img src={upload} alt="" /> Subir Banner
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="inputs_container">
          <p className="inputs_container_titulo">
            <img src={galeriaIcon} alt="" />
            Galería (Máx 4)
          </p>

          <div className="galeria_container">
            {form.galeria.map((imgUrl, index) => (
              <div key={index} className="imagen">
                <img
                  src={imgUrl || noImage}
                  alt=""
                  onError={handleImageError}
                />
                <button
                  type="button"
                  className="eliminar_imagen"
                  onClick={() => removeImageFromGallery(index)}
                >
                  ✕
                </button>
              </div>
            ))}

            {form.galeria.length < 4 && (
              <div
                className="agregar_imagen"
                onClick={!subiendoGaleria ? triggerGaleriaUpload : undefined}
                style={{ cursor: subiendoGaleria ? "wait" : "pointer" }}
              >
                {subiendoGaleria ? (
                  <span style={{ fontSize: "0.8rem" }}>Subiendo...</span>
                ) : (
                  <>
                    <img src={upload} alt="+" />
                    <span>Agregar</span>
                  </>
                )}
              </div>
            )}
          </div>

          <input
            type="file"
            ref={inputGaleriaRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileGaleria}
          />
          <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "5px" }}>
            {form.galeria.length} de 4 imágenes utilizadas.
          </p>
        </section>

        <section className="inputs_container">
          <p className="inputs_container_titulo">
            <img src={price} alt="" />
            Precios
          </p>
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
        </section>

        <section className="inputs_container">
          <p className="inputs_container_titulo">
            <img src={price} alt="" />
            Categorias y Etiquetas
          </p>
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
        </section>

        <section className="inputs_container">
          <p className="inputs_container_titulo">
            <img src={descripcionIcon} alt="" />
            Descripción
          </p>
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
        </section>

        <button className="edit-game_submit-btn" type="submit">
          Crear Juego
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/studio-panel");
          }}
          className="edit-game_cancel-btn"
        >
          Cancelar
        </button>
      </form>
    </section>
  );
}
