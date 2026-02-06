import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../css/initPage.css";
import games from "../icons/games.svg";
import oferta from "../icons/shop.svg";
import usuario from "../icons/usuarios.svg";
import vermas from "../icons/vermas.svg";
import global from "../icons/globe.svg";
import money from "../icons/paid.svg";
import analitic from "../icons/analitics.svg";
import { useNavigate } from "react-router-dom";

export default function InitPage() {
  const [ocultar, setOcultar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setOcultar((prevOcultar) => !prevOcultar);
    }, 2000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="init_page_container">
      <div className="presentacion">
        <div className="presentacion_text">
          <p>Tu proxima aventura</p>
          <p>Comienza acá</p>
          <p>
            Unete a nuestra plataforma de gaming, no dejes pasar los descuentos.
            Crea tu cuenta y explora +1000 juegos hoy mismo.
          </p>
          <button
            onClick={() => {
              navigate("/registro");
            }}
            className="btn_empezar"
          >
            EMPEZAR AHORA
          </button>
        </div>

        <img
          className="background"
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8htr71fTjv2gEoE-beCOzkOlq5GdFxngSjSYx-d1lyoY67X5szifFV27haeYFj5DbMIs0udrCXYxyEFnOWW1zXG8-KYnBMv6VL7m8cndHQeosfPJnWcB-DOqbMIzL8HIn3Ow-ttmNZheA/w0/control-uhdpaper.com-4K-13.jpg"
          alt=""
        />

        <button
          onClick={() =>
            document
              .getElementById("target")
              .scrollIntoView({ behavior: "smooth" })
          }
          className={`fixed_btn ${ocultar ? "oculto" : ""}`}
        >
          <span>VER MAS</span>
          <img src={vermas} alt="" />
        </button>
      </div>

      <div id="target" className="presentacion_2_container">
        <div className="row">
          <div className="texto">
            <div className="subtitulo">
              <div className="linea"></div>
              <p>PLATAFORMA ELITE</p>
            </div>

            <div className="titulo">
              <p>DESCUBRE</p>
              <p>STREMUGAMES</p>
            </div>
          </div>

          <div className="texto_2">
            <p>
              Diseñado por jugadores para jugadores, sin compromisos, sin
              limites.
            </p>
          </div>
        </div>
      </div>

      <section className="features_container">
        <div delay={0} className="feature_card">
          <img src={games} alt="Games" />
          <p className="feature_title">+1000 Juegos</p>
          <p className="feature_desc">
            Explora un catálogo inmenso que va desde los últimos lanzamientos
            AAA hasta joyas indie.
          </p>
        </div>

        <div delay={200} className="feature_card">
          <img src={oferta} alt="Ofertas" />
          <p className="feature_title">Ofertas Exclusivas</p>
          <p className="feature_desc">
            Aprovecha descuentos increíbles y promociones diarias solo para
            miembros registrados.
          </p>
        </div>

        <div delay={400} className="feature_card">
          <img src={usuario} alt="Comunidad" />
          <p className="feature_title">Comunidad Global</p>
          <p className="feature_desc">
            Conecta con miles de jugadores, comparte tus reseñas y encuentra a
            tu equipo ideal.
          </p>
        </div>
      </section>

      <section className="developers_section">
        <div className="dev_header">
          <div className="texto">
            <p>CREA TUS JUEGOS, PUBLICALOS</p>
            <p className="highlight">Y GANÁ</p>
            <p>
              Impulsa tu juego al siguiente nivel con el ecosistema de
              distribución más avanzado de la industria.
            </p>

            <button
              onClick={() => navigate("/registro-empresa")}
              className="btn_register_company"
            >
              REGISTRAR MI EMPRESA
            </button>
          </div>

          <img
            className="background"
            src="https://wallpapercave.com/wp/wp5231517.jpg"
            alt=""
          />
        </div>

        <div className="dev_flex">
          <div delay={0} className="dev_card">
            <img src={global} alt="" />
            <p>ALCANCE GLOBAL</p>
            <p>
              Publica para millones de jugadores activos en todo el mundo sin
              barreras.
            </p>
          </div>

          <div delay={200} className="dev_card">
            <img src={money} alt="" />
            <p>MEJORES COMISIONES</p>
            <p>
              Conserva una mayor parte de tus ingresos. El trato más justo para
              creadores.
            </p>
          </div>

          <div delay={400} className="dev_card">
            <img src={analitic} alt="" />
            <p>HERRAMIENTAS DE ANALÍTICA</p>
            <p>
              Seguimiento detallado del rendimiento y comportamiento de tus
              jugadores.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
