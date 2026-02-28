import React, { useState, useEffect, useCallback } from "react";
import "../css/soportepage.css";

import account from "../icons/account.svg";
import payments from "../icons/payments.svg";
import terminal_white from "../icons/terminal_white.svg";
import escudo from "../icons/escudo.svg";
import expand from "../icons/expand.svg";
import clientAxios from "../utils/clientAxios";
import { useObtenerToken } from "../services/obtenerToken";
import { useMessageStore } from "../services/MessageModal";

export default function SoportePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [asunto, setAsunto] = useState("Otro");
  const [formDataInput, setFormDataInput] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const showMessage = useMessageStore((state) => state.showMessage);

  const { usuarioInfo } = useObtenerToken();

  useEffect(() => {
    if (usuarioInfo) {
      setFormDataInput((prev) => {
        if (
          prev.nombre === usuarioInfo.nombreUsuario &&
          prev.email === usuarioInfo.email
        ) {
          return prev;
        }
        return {
          ...prev,
          nombre: usuarioInfo.nombreUsuario || "",
          email: usuarioInfo.email || "",
        };
      });
    }
  }, [usuarioInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizado = value;

    if (name === "nombre") {
      sanitizado = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "").slice(0, 50);
    } else if (name === "email") {
      sanitizado = value.replace(/[^a-zA-Z0-9@.-]/g, "").slice(0, 100);
    } else if (name === "mensaje") {
      sanitizado = value
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,!?()\-]/g, "")
        .slice(0, 500);
    }

    setFormDataInput((prev) => ({
      ...prev,
      [name]: sanitizado,
    }));
  };

  const handlePasteBlock = (e) => {
    e.preventDefault();
    showMessage("Por seguridad, escribe el texto manualmente.", "warning");
  };

  const handleDropBlock = (e) => {
    e.preventDefault();
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleOpenModal = (temaSeleccionado = "Otro") => {
    setAsunto(temaSeleccionado);
    setShowModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setFormDataInput((prev) => ({ ...prev, mensaje: "" }));
    if (!usuarioInfo) {
      setFormDataInput({ nombre: "", email: "", mensaje: "" });
    }
  }, [usuarioInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formDataInput.nombre.trim() ||
      !formDataInput.email.trim() ||
      !formDataInput.mensaje.trim()
    ) {
      return showMessage("Todos los campos son obligatorios.", "error");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formDataInput.email)) {
      return showMessage("Ingresa un correo electrónico válido.", "error");
    }

    setIsSending(true);

    const ticketData = {
      nombre: formDataInput.nombre.trim(),
      email: formDataInput.email.trim(),
      asunto: asunto,
      mensaje: formDataInput.mensaje.trim(),
    };

    try {
      await clientAxios.post("/ticket", ticketData);
      showMessage("Ticket enviado exitosamente.", "success");
      handleCloseModal();
    } catch (error) {
      console.error(error);
      showMessage(
        error.response?.data?.message || "Error al enviar el ticket.",
        "error",
      );
    } finally {
      setIsSending(false);
    }
  };

  const faqs = [
    {
      pregunta: "¿Cómo puedo solicitar un reembolso?",
      respuesta:
        "Puedes solicitar un reembolso dentro de los 14 días posteriores a la compra, siempre que el contenido tenga menos de 2 horas de uso.",
    },
    {
      pregunta: "¿Olvidé mi contraseña o mi 2FA no funciona?",
      respuesta:
        "Puedes restablecer tu contraseña desde el panel de inicio de sesión haciendo clic en '¿Olvidaste tu contraseña?'.",
    },
    {
      pregunta: "¿Cuándo se renovará el catálogo de ofertas?",
      respuesta:
        "El catálogo se renueva automáticamente cada semana los días martes.",
    },
  ];

  return (
    <>
      <section className="soporte_page">
        <div className="categories_grid">
          <div
            className="category_card"
            onClick={() => handleOpenModal("Otro")}
          >
            <div className="icon_box">
              <img src={account} alt="Cuenta" />
            </div>
            <span>MI CUENTA</span>
          </div>

          <div
            className="category_card"
            onClick={() => handleOpenModal("Problema con un pago")}
          >
            <div className="icon_box">
              <img src={payments} alt="Pagos" />
            </div>
            <span>PAGOS</span>
          </div>

          <div
            className="category_card"
            onClick={() => handleOpenModal("Error técnico")}
          >
            <div className="icon_box">
              <img src={terminal_white} alt="Técnico" />
            </div>
            <span>TÉCNICO</span>
          </div>

          <div
            className="category_card"
            onClick={() => handleOpenModal("Seguridad de la cuenta")}
          >
            <div className="icon_box">
              <img src={escudo} alt="Seguridad" />
            </div>
            <span>SEGURIDAD</span>
          </div>
        </div>

        <div className="faq_container">
          <h3 className="section_title">PREGUNTAS FRECUENTES</h3>
          <div className="accordion">
            {faqs.map((item, index) => (
              <div
                key={index}
                className={`accordion_item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <button
                  className="accordion_header"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.pregunta}</span>
                  <img
                    src={expand}
                    alt="Expandir"
                    className={`chevron ${
                      activeIndex === index ? "rotate" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="accordion_content">
                    <p>{item.respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="support_footer">
          <div className="divider"></div>
          <p className="footer_label">¿AÚN NECESITAS AYUDA PERSONALIZADA?</p>
          <div className="footer_buttons">
            <button
              className="btn_live_chat"
              onClick={() => handleOpenModal("Otro")}
            >
              ENVIAR TICKET
            </button>
          </div>
        </div>

        {showModal && (
          <div className="modal_overlay" onClick={handleCloseModal}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
              <div className="modal_header">
                <h2>Enviar Ticket de Soporte</h2>
                <button className="close_btn" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <form className="modal_form" onSubmit={handleSubmit}>
                <div className="form_group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={formDataInput.nombre}
                    onChange={handleInputChange}
                    onPaste={handlePasteBlock}
                    onDrop={handleDropBlock}
                    disabled={!!usuarioInfo?.nombreUsuario}
                    required
                  />
                </div>
                <div className="form_group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={formDataInput.email}
                    onChange={handleInputChange}
                    onPaste={handlePasteBlock}
                    onDrop={handleDropBlock}
                    disabled={!!usuarioInfo?.email}
                    required
                  />
                </div>
                <div className="form_group">
                  <label>Asunto</label>
                  <select
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                  >
                    <option value="Problema con un pago">
                      Problema con un pago
                    </option>
                    <option value="Error técnico">Error técnico</option>
                    <option value="Seguridad de la cuenta">
                      Seguridad de la cuenta
                    </option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="form_group">
                  <label>Mensaje</label>
                  <textarea
                    name="mensaje"
                    rows="4"
                    placeholder="Describe tu problema..."
                    value={formDataInput.mensaje}
                    onChange={handleInputChange}
                    onPaste={handlePasteBlock}
                    onDrop={handleDropBlock}
                    required
                  ></textarea>
                  <small
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      display: "block",
                      textAlign: "right",
                      marginTop: "5px",
                    }}
                  >
                    {formDataInput.mensaje.length}/500
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn_submit_ticket"
                  disabled={isSending}
                >
                  {isSending ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
