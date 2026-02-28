import "../css/perfilPage.css";
import grid_green from "../icons/grid_green.svg";
import deseados from "../icons/deseados.svg";
import next from "../icons/next.svg";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import game_green from "../icons/games_green.svg";
import JuegosDelUsuario from "../components/perfil/JuegosDelUsuario";
import { useObtenerUsuario } from "../services/obtenerUsuario.js";
import { useCalcularNivel } from "../services/calcularNivel.js";
import useMediaQuery from "../utils/changeDesk.js";
import { useNavigate, useParams } from "react-router-dom";
import { PerfilPageSkeleton } from "../components/skeletons/Skeleton.jsx";

import { useState, useEffect, useRef } from "react";
import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "../services/MessageModal";

export default function PerfilPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showMessage = useMessageStore((state) => state.showMessage);

  const { usuario, cargando } = useObtenerUsuario(id);
  const { nivel, puntos } = useCalcularNivel(id);

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const [esSeguidor, setEsSeguidor] = useState(false);
  const [contadorSeguidores, setContadorSeguidores] = useState(0);
  const [loadingAction, setLoadingAction] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("biblioteca");
  const interactuadoRef = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (cargando) {
        navigate("*");
      }
    }, 20000);

    return () => clearTimeout(timeout);
  }, [cargando, navigate]);

  useEffect(() => {
    if (usuario && id) {
      if (usuario.seguidores) {
        setContadorSeguidores(usuario.seguidores.length);
      }

      if (!interactuadoRef.current) {
        const verificarEstado = async () => {
          try {
            const token = localStorage.getItem("TokenStremuGames");
            if (!token) return;

            const { data } = await clientAxios.get(
              `/usuarios/seguir/verificar/${id}`,
            );

            setEsSeguidor(data.esSeguidor);
          } catch (error) {
            setEsSeguidor(false);
          }
        };

        verificarEstado();
      }
    }
  }, [usuario, id]);

  const handleSeguir = async () => {
    if (loadingAction) return;

    interactuadoRef.current = true;
    const estadoAnterior = esSeguidor;
    const contadorAnterior = contadorSeguidores;

    setLoadingAction(true);

    setEsSeguidor(!estadoAnterior);
    setContadorSeguidores((prev) => (estadoAnterior ? prev - 1 : prev + 1));

    try {
      const { data } = await clientAxios.put(`/usuarios/seguir/${id}`);

      if (data && typeof data.cantidadSeguidores === "number") {
        setContadorSeguidores(data.cantidadSeguidores);
        setEsSeguidor(data.esSeguidor);
      }

      showMessage(data.message, "success");
    } catch (error) {
      console.error(error);

      setEsSeguidor(estadoAnterior);
      setContadorSeguidores(contadorAnterior);

      if (error.response?.status === 401 || error.response?.status === 403) {
        showMessage("Debes iniciar sesión para seguir usuarios", "error");
      } else {
        const msg =
          error.response?.data?.message || "Error al conectar con el servidor";
        showMessage(msg, "error");
      }
    } finally {
      setLoadingAction(false);
    }
  };

  const noImage =
    "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000071079/d08fc33e504e0bb244d31c38d1dfa15e1b8465c4992d57a989e31f1ed3bbc026";

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  if (cargando) {
    return <PerfilPageSkeleton />;
  }

  if (!usuario) {
    return null;
  }

  const {
    nombreUsuario,
    biografia,
    foto_de_perfil,
    juegosComprados,
    juegosDeseados,
    foto_banner,
  } = usuario;
  const iniciales = nombreUsuario?.toUpperCase().slice(0, 2);
  const porcentaje = (puntos % 1000) / 10;
  const proximaMeta = (Math.floor(puntos / 1000) + 1) * 1000;

  return (
    <section className="perfil_page_section">
      {isDesktop && (
        <nav className="navbar-phone desk">
          <img onClick={() => navigate(-1)} src={back} alt="Volver" />
          <div></div>
        </nav>
      )}

      {isDesktop && (
        <section className="perfil_banner">
          <img
            className="fondo_de_perfil"
            onError={handleImageError}
            src={foto_banner || noImage}
            alt=""
          />
        </section>
      )}

      <section className="perfil">
        <div className="perfil_container">
          <div className="perfil_page_usuario">
            <section className="perfil_banner_imagen">
              {!isDesktop && (
                <img
                  className="fondo_de_perfil"
                  onError={handleImageError}
                  src={foto_banner || noImage}
                  alt=""
                />
              )}
              <div className="perfil_imagen">
                {foto_de_perfil ? (
                  <img
                    className="foto_perfil"
                    onError={handleImageError}
                    src={foto_de_perfil}
                    alt={nombreUsuario}
                  />
                ) : (
                  <p className="iniciales">{iniciales}</p>
                )}
              </div>
            </section>

            <div className="texto">
              <div className="nombre_usuario_container">
                <p className="nombre_usuario">{nombreUsuario}</p>

                <button
                  onClick={handleSeguir}
                  disabled={loadingAction}
                  className={`btn_seguir ${esSeguidor ? "siguiendo" : "nosiguiendo"}`}
                  style={{
                    opacity: loadingAction ? 0.7 : 1,
                    cursor: loadingAction ? "wait" : "pointer",
                  }}
                >
                  {esSeguidor ? "Siguiendo" : "Seguir"}
                </button>
              </div>

              <p
                className="contador_seguidores"
                style={{
                  fontSize: "0.9rem",
                  marginTop: "5px",
                  opacity: 0.9,
                  textAlign: "left",
                  width: "100%",
                  fontWeight: "500",
                }}
              >
                <strong>{contadorSeguidores}</strong> Seguidores
              </p>

              {biografia === "" ? (
                <p style={{ marginTop: "5px" }}>
                  "Este usuario aun no puso una biografia."
                </p>
              ) : (
                <p className="biografia" style={{ marginTop: "5px" }}>
                  "{biografia}."
                </p>
              )}
            </div>
          </div>
        </div>

        <section className="estadisticas_container">
          <div className="perfil_page_nivel">
            <div className="nivel_tag">
              <p>Nivel {nivel + 1}</p>
            </div>

            <div className="var_progress_container">
              <div className="datos">
                <span>Progreso</span>{" "}
                <span>
                  {puntos} / {proximaMeta}
                </span>
              </div>
              <div className="var_progress">
                <div
                  style={{ width: `${porcentaje}%` }}
                  className="barra"
                ></div>
              </div>
            </div>
          </div>

          <div className="perfil_page_tarjetas">
            <div
              className={`card_links ${seccionActiva === "biblioteca" ? "active" : ""}`}
              onClick={() => setSeccionActiva("biblioteca")}
              style={{
                border:
                  seccionActiva === "biblioteca"
                    ? "1px solid #84cc16"
                    : "1px solid transparent",
                cursor: "pointer",
              }}
            >
              <img src={grid_green} alt="Biblioteca" />
              <div>
                <p>Biblioteca</p>
                <p>Ver todos ({juegosComprados?.length || 0})</p>
              </div>
              {isDesktop && <img className="next-icon" src={next} alt="" />}
            </div>

            <div
              className={`card_links ${seccionActiva === "deseados" ? "active" : ""}`}
              onClick={() => setSeccionActiva("deseados")}
              style={{
                border:
                  seccionActiva === "deseados"
                    ? "1px solid #84cc16"
                    : "1px solid transparent",
                cursor: "pointer",
              }}
            >
              <img src={deseados} alt="Deseados" />
              <div>
                <p>Lista de Deseados</p>
                <p>Ver todos ({juegosDeseados?.length || 0})</p>
              </div>
              {isDesktop && <img className="next-icon" src={next} alt="" />}
            </div>
          </div>
        </section>
      </section>

      <section className="listado_juegos_section">
        <p className="listado_juegos_titulo">
          <img src={game_green} alt="" />
          {seccionActiva === "biblioteca"
            ? "Listado de Juegos"
            : "Lista de Deseados"}
        </p>
        <section className="juegos_comprados">
          <JuegosDelUsuario
            juegosComprados={
              seccionActiva === "biblioteca" ? juegosComprados : juegosDeseados
            }
          />
        </section>
      </section>
    </section>
  );
}
