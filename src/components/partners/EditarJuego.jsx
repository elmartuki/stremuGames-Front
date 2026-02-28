import "../../css/editarJuego.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useObtenerUnJuego } from "../../services/obtenerUnJuego";
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
import { useJuegoStore } from "../../services/juegosStore";

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

export default function EditarJuego() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const { showMessage } = useMessageStore.getState();
  const actualizarUnJuego = useJuegoStore((state) => state.actualizarUnJuego);

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

  const { juego, loading } = useObtenerUnJuego(id);
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
    version: "",
    pesoGB: 0,
  });

  const triggerPortadaUpload = () => inputPortadaRef.current.click();
  const triggerBannerUpload = () => inputBannerRef.current.click();
  const triggerGaleriaUpload = () => inputGaleriaRef.current.click();

  useEffect(() => {
    if (juego) {
      setForm({
        titulo: juego.titulo || "",
        slug: juego.slug || "",
        descripcion: juego.descripcion || "",
        precioBase: juego.precioBase ?? 0,
        precioDescuento: juego.precioDescuento ?? 0,
        imagenPortada: juego.imagenPortada || "",
        imagenBanner: juego.imagenBanner || "",
        galeria: juego.galeria || [],
        categorias: juego.categorias || [],
        etiquetas: juego.etiquetas || [],
        version: juego.version || "1.0.0",
        pesoGB: juego.pesoGB ?? 0,
      });
    }
  }, [juego]);

  useEffect(() => {
    if (urlPortada) setForm((prev) => ({ ...prev, imagenPortada: urlPortada }));
  }, [urlPortada]);

  useEffect(() => {
    if (urlBanner) setForm((prev) => ({ ...prev, imagenBanner: urlBanner }));
  }, [urlBanner]);

  useEffect(() => {
    if (urlGaleria)
      setForm((prev) => ({ ...prev, galeria: [...prev.galeria, urlGaleria] }));
  }, [urlGaleria]);

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
    if (file && form.galeria.length < 4) subirGaleria(file);
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

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.titulo.trim() || !form.slug.trim() || !form.descripcion.trim()) {
      return showMessage(
        "Título, Slug y Descripción son obligatorios",
        "error",
      );
    }

    const versionRegex = /^\d+\.\d+\.\d+$/;
    if (!versionRegex.test(form.version)) {
      return showMessage("Formato de versión inválido (0.0.0)", "error");
    }

    const datosModificados = {};
    Object.keys(form).forEach((key) => {
      if (JSON.stringify(form[key]) !== JSON.stringify(juego[key])) {
        datosModificados[key] = form[key];
      }
    });

    if (Object.keys(datosModificados).length === 0) {
      return showMessage("No se detectaron cambios para actualizar", "info");
    }

    try {
      const { data } = await clientAxios.put(`/juegos/${id}`, datosModificados);

      if (actualizarUnJuego && data.datos) {
        actualizarUnJuego(data.datos);
      }

      showMessage("Juego actualizado correctamente", "success");
      navigate(-1);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error al actualizar",
        "error",
      );
    }
  };

  if (loading || !juego) return <></>;

  return (
    <section className="edit-game">
      {!isDesktop && (
        <div className="edit-game_header">
          <div onClick={() => navigate(-1)} className="edit-game_back-btn">
            <img src={ArrowLeft} alt="Volver" />
          </div>
          <div className="edit-game_title">
            <p>Editar Juego</p>
            <p>Editar detalles del juego</p>
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
            <p>Título (Solo letras y números, max 80)</p>
            <input
              className="edit-game_input"
              maxLength={80}
              onChange={(event) => {
                let val = event.target.value.replace(
                  /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g,
                  "",
                );
                const newSlug = val
                  .toLowerCase()
                  .trim()
                  .replace(/[\s\W-]+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  .slice(0, 80);
                setForm({ ...form, titulo: val, slug: newSlug });
              }}
              type="text"
              placeholder="Nombre del juego"
              value={form.titulo}
            />
          </div>

          <div className="edit-game_row">
            <div className="edit-game_input-group">
              <p>Slug (URL, max 80)</p>
              <input
                className="edit-game_input"
                maxLength={80}
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
              <p>Peso (GB - Max 3 dígitos)</p>
              <input
                className="edit-game_input"
                onChange={(event) => {
                  let val = event.target.value.replace(/\D/g, "");
                  if (val.length > 3) val = val.slice(0, 3);
                  setForm({ ...form, pesoGB: val === "" ? "" : Number(val) });
                }}
                type="text"
                inputMode="numeric"
                placeholder="Ej: 50"
                value={form.pesoGB}
              />
            </div>

            <div className="edit-game_input-group">
              <p>Versión (Formato 0.0.0)</p>
              <input
                className="edit-game_input"
                onChange={(event) => {
                  let val = event.target.value.replace(/[^0-9.]/g, "");
                  setForm({ ...form, version: val });
                }}
                maxLength="5"
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
                  onError={handleImageError}
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
                  onError={handleImageError}
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
              <div className="imagen" key={index}>
                <img
                  src={imgUrl || noImage}
                  alt=""
                  onError={handleImageError}
                />
                <button
                  className="eliminar_imagen"
                  type="button"
                  onClick={() => removeImageFromGallery(index)}
                >
                  ✕
                </button>
              </div>
            ))}
            {form.galeria.length < 4 && (
              <div
                onClick={!subiendoGaleria ? triggerGaleriaUpload : undefined}
                className="agregar_imagen"
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
                onChange={(event) => {
                  let val = event.target.value.replace(/\D/g, "");
                  if (val.length > 3) val = val.slice(0, 3);
                  setForm({
                    ...form,
                    precioBase: val === "" ? "" : Number(val),
                  });
                }}
                type="text"
                inputMode="numeric"
                value={form.precioBase}
              />
            </div>
            <div className="edit-game_input-group">
              <p>Descuento</p>
              <input
                className="edit-game_input"
                onChange={(event) => {
                  let val = event.target.value.replace(/\D/g, "");
                  if (val.length > 3) val = val.slice(0, 3);
                  setForm({
                    ...form,
                    precioDescuento: val === "" ? "" : Number(val),
                  });
                }}
                type="text"
                inputMode="numeric"
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
              {CATEGORIAS_DISPONIBLES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-btn ${form.categorias.includes(cat) ? "active" : ""}`}
                  onClick={() => toggleCategoria(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="edit-game_input-group">
            <p>Etiquetas</p>
            <input
              className="edit-game_input"
              value={tagInput}
              onChange={(e) =>
                setTagInput(
                  e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""),
                )
              }
              onKeyDown={handleTagKeyDown}
              type="text"
              placeholder="Añadir etiqueta..."
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
            <textarea
              className="edit-game_textarea"
              maxLength={1000}
              onChange={(event) =>
                setForm({
                  ...form,
                  descripcion: event.target.value.replace(
                    /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,!?()\-]/g,
                    "",
                  ),
                })
              }
              value={form.descripcion}
            ></textarea>
          </div>
        </section>

        <button className="edit-game_submit-btn" type="submit">
          Guardar Cambios
        </button>
        <button
          type="button"
          onClick={() => navigate("/studio-panel")}
          className="edit-game_cancel-btn"
        >
          Cancelar
        </button>
      </form>
    </section>
  );
}
