import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/sobrenosotros.css";
import foto_perfil_juan_jose from "../images/foto_perfil_juan_jose.png";
import martuki_foto_perfil from "../images/martuki_foto_perfil.png";

export default function SobreNosotrosPage() {
  const navigate = useNavigate();

  return (
    <section className="sobre-nosotros-page">
      <article className="sn-card sn-nucleo">
        <div className="sn-nucleo-header">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#66f61e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
          <h2>NÚCLEO DE DATOS</h2>
        </div>
        <p>
          "En el año 2026, consolidamos el <strong>StremuGames</strong>. No somos
          una tienda, somos un nodo de distribución cuántica donde cada bit de
          entretenimiento es curado para la máxima fidelidad."
        </p>
      </article>

      <div className="sn-timeline">
        <div className="sn-timeline-line"></div>

        <article className="sn-protocol-card">
          <div className="sn-protocol-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a0a0a0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 3.82-13 1.5 1.5 0 0 0 2.18 2.06L12 3l.03.03a22 22 0 0 1 13 3.82 1.5 1.5 0 0 0-2.06 2.18L21 12l.03.03a22 22 0 0 1-3.82 13 1.5 1.5 0 0 0-2.18-2.06L15 21l-.03-.03a22 22 0 0 1-13-3.82 1.5 1.5 0 0 0 2.06-2.18L3 12Z"></path>
            </svg>
          </div>
          <div className="sn-protocol-content">
            <h3>PROTOCOLO MISIÓN</h3>
            <p>
              Distribuir experiencias interactivas eliminando toda fricción
              entre el código y el usuario final.
            </p>
          </div>
        </article>

        <article className="sn-protocol-card">
          <div className="sn-protocol-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a0a0a0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="sn-protocol-content">
            <h3>VISIÓN SINTÉTICA</h3>
            <p>
              Dominar la red de intercambio digital convirtiéndonos en el
              estándar de oro del gaming móvil.
            </p>
          </div>
        </article>

        <article className="sn-protocol-card">
          <div className="sn-protocol-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a0a0a0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className="sn-protocol-content">
            <h3>CÓDIGO DE ÉTICA</h3>
            <p>
              Seguridad blindada, soporte en tiempo real y transparencia
              absoluta en cada transacción.
            </p>
          </div>
        </article>
      </div>

      <section className="sn-council-section">
        <div className="sn-council-header">
          <div className="line"></div>
          <h2>FUNDADORES</h2>
          <div className="line"></div>
        </div>

        <div className="sn-team-grid">
          <div className="sn-team-member sn-glow-green">
            <div className="sn-image-wrapper">
              <img src={martuki_foto_perfil} alt="Posho" />
            </div>
            <h4>MARTÍN DÍAZ</h4>
            <p className="sn-role-green">FOUNDER & DEVELOPER</p>
          </div>
          <div className="sn-team-member sn-glow-green">
            <div className="sn-image-wrapper">
              <img src={foto_perfil_juan_jose} alt="Posho" />
            </div>
            <h4>JUAN JOSÉ SALVI</h4>
            <p className="sn-role-green">FOUNDER & DEVELOPER</p>
          </div>
        </div>
      </section>
    </section>
  );
}
