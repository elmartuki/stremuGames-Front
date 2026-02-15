import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/error404.css";

import controllerIcon from "../icons/broken_controller.svg";
import homeIcon from "../icons/home.svg";
import newsIcon from "../icons/new.svg";
import offerIcon from "../icons/sell.svg";
import trophyIcon from "../icons/trophy.svg";
import supportIcon from "../icons/support.svg";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <section className="page_404">
      <div className="bg_text_404">404</div>

      <div className="content_wrapper_404">
        <div className="icon_glitch_container">
          <img src={controllerIcon} alt="Broken Controller" />
        </div>

        <h1 className="title_glitch" data-text="GAME OVER">
          GAME OVER
        </h1>

        <h2 className="subtitle_404">Parece que te has salido del mapa</h2>

        <p className="description_404">
          Lo que buscas no logró cargarse o fue eliminado. ¡No te
          preocupes! Tu progreso no se ha perdido.
        </p>

        <div className="actions_404">
          <button className="btn_primary" onClick={() => navigate("/explorar")}>
            <img src={homeIcon} alt="" /> VOLVER AL INICIO
          </button>
        </div>

        <div className="nav_grid_404">
          <div
            className="nav_card"
            onClick={() => navigate("/categorias/Recientes")}
          >
            <div className="icon_box">
              <img src={newsIcon} alt="" />
            </div>
            <div className="text_box">
              <span className="card_title">Novedades</span>
              <span className="card_sub">Últimos lanzamientos</span>
            </div>
          </div>

          <div
            className="nav_card"
            onClick={() => navigate("/categorias/ofertas")}
          >
            <div className="icon_box">
              <img src={offerIcon} alt="" />
            </div>
            <div className="text_box">
              <span className="card_title">Ofertas</span>
              <span className="card_sub">Ahorra hasta el 80%</span>
            </div>
          </div>

          <div
            className="nav_card"
            onClick={() => navigate("/categorias/Populares")}
          >
            <div className="icon_box">
              <img src={trophyIcon} alt="" />
            </div>
            <div className="text_box">
              <span className="card_title">Populares</span>
              <span className="card_sub">Lo más jugado</span>
            </div>
          </div>

          <div className="nav_card" onClick={() => navigate("/soporte")}>
            <div className="icon_box">
              <img src={supportIcon} alt="" />
            </div>
            <div className="text_box">
              <span className="card_title">Soporte</span>
              <span className="card_sub">¿Necesitas ayuda?</span>
            </div>
          </div>
        </div>

        <footer className="footer_404">
          <p>
            © {new Date().getFullYear()} StremuGames. Todos los derechos
            reservados.
          </p>
        </footer>
      </div>
    </section>
  );
}
