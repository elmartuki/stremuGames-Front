import { useEffect, useState } from "react";
import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useNavigate } from "react-router-dom";
import { useCalcularNivel } from "../services/calcularNivel";

import editIcon from "../icons/edit.svg";
import seguridad from "../icons/seguridad.svg";
import compras from "../icons/compras.svg";
import arrowRigth from "../icons/arrowRigth.svg";
import logout from "../icons/logout.svg";
import "../css/perfilConfig.css";
import useMediaQuery from "../utils/changeDesk";

const imagenesDecorativas = [
  "https://i0.wp.com/www.pcmrace.com/wp-content/uploads/2019/10/nTm7kHj.jpg",
  "https://www.10wallpaper.com/wallpaper/3840x2160/1803/Rainbow_Six_Siege_4K_Ultra_HD_Game_3840x2160.jpg",
  "https://getwallpapers.com/wallpaper/full/7/5/b/198398.jpg",
  "https://cdn.wallpapersafari.com/75/1/uHOW5n.jpg",
  "https://img.somosxbox.com/somosxbox/2024/07/23104727/halo-4-1.jpg",
];

export default function PerfilConfigPage() {
  const navigate = useNavigate();
  const { usuario } = useObtenerUsuario();
  const { nivel } = useCalcularNivel();

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagenesDecorativas.length - 1 ? 0 : prevIndex + 1,
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  if (!usuario) {
    return <></>;
  }

  const { nombreUsuario, juegosComprados, foto_de_perfil } = usuario;
  const iniciales = nombreUsuario?.toUpperCase().slice(0, 2);

  return (
    <>
      <section className="perfil_config_section">
        <section className="perfil_config">
          <section className="perfil_config_header">
            <div className="perfil_config_header_data">
              <div className="perfil_config_header_imagen">
                {foto_de_perfil ? (
                  <img
                    src={foto_de_perfil}
                    alt="Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <p>{iniciales}</p>
                )}
              </div>
              <p>{nombreUsuario}</p>
            </div>

            <div className="perfil_config_header_data_2">
              <div>
                <p>{juegosComprados?.length || 0}</p>
                <p>Juegos</p>
              </div>
              <div>
                <p>{nivel + 1}</p>
                <p>Nivel</p>
              </div>
              <div>
                <p>2</p>
                <p>Años</p>
              </div>
            </div>
          </section>

          <section className="perfil_config_body">
            <p className="perfil_config_body_titulo">Gestión de cuenta</p>

            <article
              onClick={() => navigate("/perfil/editar-perfil")}
              className="perfil_config_body_button"
            >
              <img src={editIcon} alt="" />
              <div>
                <p>Editar Perfil</p>
                <p>Cambiar avatar, nombre y bio</p>
              </div>
              <img src={arrowRigth} alt="" />
            </article>

            <article className="perfil_config_body_button">
              <img src={seguridad} alt="" />
              <div>
                <p>Seguridad</p>
                <p>Cambiar contraseña</p>
              </div>
              <img src={arrowRigth} alt="" />
            </article>

            <article className="perfil_config_body_button">
              <img src={compras} alt="" />
              <div>
                <p>Historial de Compras</p>
                <p>Ver tus transacciones recientes</p>
              </div>
              <img src={arrowRigth} alt="" />
            </article>
          </section>

          <section className="perfil_config_footer">
            <button
              onClick={() => {
                localStorage.removeItem("TokenStremuGames");
                navigate("/");
              }}
            >
              <img src={logout} alt="" />
              Cerrar Sesión
            </button>
            <p>Version 0.3.0</p>
          </section>
        </section>

        <section className="perfil_config_carroucel">
          <div className="imagenes_container">
            <img
              key={currentIndex}
              className="background fade-animation"
              src={imagenesDecorativas[currentIndex]}
              alt="Decorativo"
            />

            <div className="carroucel_dots_overlay">
              {imagenesDecorativas.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
