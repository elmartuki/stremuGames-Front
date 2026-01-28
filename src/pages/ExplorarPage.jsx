import Carroucel from "../componets/explorar/Carroucel";
import CarroucelLargo from "../componets/explorar/CarroucelLargo";
import Categorias from "../componets/explorar/Categorias";
import HeroJuegos from "../componets/explorar/HeroJuegos";
import "../css/explorarPage.css";
import rigth_green from "../icons/rigth_green.svg";
import time from "../icons/time.svg";
import fire from "../icons/fire.svg";
import newIcon from "../icons/new.svg";
import racing from "../icons/racing.svg";
import terror from "../icons/terror.svg";
import category from "../icons/category.svg";
import useMediaQuery from "../utils/changeDesk";
import { useNavigate } from "react-router-dom";

export default function ExplorarPage() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const navigate = useNavigate();

  return (
    <section className="explorar_page_section">
      <section className="explorar_hero">
        <HeroJuegos filtrar={"Populares"} />
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div className="titulo_container">
            <img src={time} alt="" />
            <div className="titulo">
              <p>Cuenta regresiva</p>
              <p>Finaliza el 7/1</p>
            </div>
          </div>

          <div
            className="btn_ver_mas"
            onClick={() => navigate("/categorias/ofertas")}
          >
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section
            key="countdown-desk"
            className="carroucel_section carroucel_section_desk"
          >
            <Carroucel />
          </section>
        ) : (
          <section key="countdown-mobile" className="carroucel_section">
            <Carroucel />
          </section>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div className="titulo_container">
            <img src={fire} alt="" />
            <div className="titulo">
              <p>Juegos Populares</p>
              <p>Los juegos en tendencias</p>
            </div>
          </div>

          <div
            className="btn_ver_mas"
            onClick={() => navigate("/categorias/Populares")}
          >
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section
            key="populares-desk"
            className="carroucel_section carroucel_section_desk"
          >
            <CarroucelLargo filtrar={"Populares"} />
          </section>
        ) : (
          <section key="populares-mobile" className="carroucel_section">
            <CarroucelLargo filtrar={"Populares"} />
          </section>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div className="titulo_container">
            <img src={newIcon} alt="" />
            <div className="titulo">
              <p>Agregados Recientemente</p>
              <p>Novedades en StremuGames</p>
            </div>
          </div>

          <div
            className="btn_ver_mas"
            onClick={() => navigate("/categorias/Recientes")}
          >
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section
            key="recientes-desk"
            className="carroucel_section carroucel_section_desk"
          >
            <CarroucelLargo filtrar={"Recientes"} />
          </section>
        ) : (
          <section key="recientes-mobile" className="carroucel_section">
            <CarroucelLargo filtrar={"Recientes"} />
          </section>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div className="titulo_container">
            <img src={racing} alt="" />
            <div className="titulo">
              <p>Carreras</p>
              <p>Descubre todos los juegos de Carreras</p>
            </div>
          </div>

          <div
            className="btn_ver_mas"
            onClick={() => navigate("/categorias/Carreras")}
          >
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section
            key="carreras-desk"
            className="carroucel_section carroucel_section_desk"
          >
            <CarroucelLargo filtrar={"Carreras"} />
          </section>
        ) : (
          <section key="carreras-mobile" className="carroucel_section">
            <CarroucelLargo filtrar={"Carreras"} />
          </section>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div className="titulo_container">
            <img src={terror} alt="" />
            <div className="titulo">
              <p>Terror</p>
              <p>Descubre todos los juegos de terror</p>
            </div>
          </div>

          <div
            className="btn_ver_mas"
            onClick={() => navigate("/categorias/Terror")}
          >
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section
            key="terror-desk"
            className="carroucel_section carroucel_section_desk"
          >
            <CarroucelLargo filtrar={"Terror"} />
          </section>
        ) : (
          <section key="terror-mobile" className="carroucel_section">
            <CarroucelLargo filtrar={"Terror"} />
          </section>
        )}
      </section>

      <p className="explorar_page_titulo">
        <img src={category} alt="" />
        Categorias Populares
      </p>

      {isDesktop ? (
        <section
          key="categorias-desk"
          className="categorias_section categorias_section_desk"
        >
          <Categorias />
        </section>
      ) : (
        <section key="categorias-mobile" className="categorias_section">
          <Categorias />
        </section>
      )}
    </section>
  );
}
