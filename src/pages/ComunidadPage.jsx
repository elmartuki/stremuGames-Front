import React, { useState, useMemo } from "react";
import "../css/comunidadPage.css";
import search from "../icons/search.svg";
import usuariosIcon from "../icons/usuarios.svg";
import empresaIcon from "../icons/empresa.svg";
import global from "../icons/globe_white.svg";
import trending from "../icons/trending.svg";
import newIcon from "../icons/new.svg";
import visibility from "../icons/visibility.svg";
import no_banner from "../icons/background-banner.png";

import { useObtenerUsuarios } from "../services/obtenerUsuarios";
import { useObtenerJuegos } from "../services/obtenerJuegos";
import { useCalcularNivel } from "../services/calcularNivel";

import { useNavigate } from "react-router-dom";
import { ComunidadSkeleton } from "../components/skeletons/Skeleton";
import useMediaQuery from "../utils/changeDesk";

const PlayerCard = ({ usuario, navigate }) => {
  const { nivel } = useCalcularNivel(usuario.nombreUsuario);
  const iniciales = usuario.nombreUsuario
    ? usuario.nombreUsuario.toUpperCase().slice(0, 2)
    : "UN";

  return (
    <div className="usuario_card">
      <div className="usuario_avatar">
        <div className="avatar">
          {!usuario.foto_de_perfil ? (
            <div className="iniciales">
              <p>{iniciales}</p>
            </div>
          ) : (
            <img src={usuario.foto_de_perfil} alt="avatar" />
          )}
        </div>
        <span className="badge">LVL {nivel + 1}</span>
      </div>
      <h5>{usuario.nombreUsuario}</h5>
      <div className="btn_container">
        <button
          className="btn-follow"
          onClick={() =>
            navigate(`/comunidad/usuario/${usuario.nombreUsuario}`)
          }
        >
          <img src={visibility} alt="" /> Ver Perfil
        </button>
      </div>
    </div>
  );
};

export default function ComunidadPage() {
  const { cargando, usuariosComunes, empresas } = useObtenerUsuarios();
  const { listado, loading: loadingJuegos } = useObtenerJuegos();
  const navigate = useNavigate();

  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarEmpresasLimite, setMostrarEmpresasLimite] = useState(4);
  const [mostrarJugadoresLimite, setMostrarJugadoresLimite] = useState(4);
  const [imgError, setImgError] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const procesarLista = (lista) => {
    let resultado = lista.filter((item) =>
      item.nombreUsuario.toLowerCase().includes(busqueda.toLowerCase()),
    );

    if (filtroActivo === "nuevos") {
      resultado = [...resultado].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    if (filtroActivo === "populares") {
      resultado = [...resultado].sort((a, b) => {
        const scoreA =
          (a.juegosComprados?.length || 0) + (a.juegosDeseados?.length || 0);
        const scoreB =
          (b.juegosComprados?.length || 0) + (b.juegosDeseados?.length || 0);
        return scoreB - scoreA;
      });
    }
    return resultado;
  };

  const empresasFiltradas = useMemo(
    () => procesarLista(empresas),
    [empresas, busqueda, filtroActivo],
  );
  const usuariosFiltrados = useMemo(
    () => procesarLista(usuariosComunes),
    [usuariosComunes, busqueda, filtroActivo],
  );

  if (cargando || loadingJuegos) return <ComunidadSkeleton />;

  return (
    <section className="comunidad-page">
      <section className="comunidad-body">
        <div className="comunidad_hero">
          <img
            className="background"
            src="https://www.10wallpaper.com/wallpaper/1920x1080/1512/Assassins_creed_arno_dorian-PC_Game_HD_Wallpaper_1920x1080.jpg"
            alt=""
          />
          <p>
            Descubre el <span>Ecosistema</span> Gaming
          </p>
          <div className="search-box">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder="Busca estudios o jugadores..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="filtros">
            <button
              className={filtroActivo === "todos" ? "active" : ""}
              onClick={() => setFiltroActivo("todos")}
            >
              <img src={global} alt="" /> Todas
            </button>
            <button
              className={filtroActivo === "empresas" ? "active" : ""}
              onClick={() => setFiltroActivo("empresas")}
            >
              <img src={empresaIcon} alt="" /> Empresas
            </button>
            <button
              className={filtroActivo === "jugadores" ? "active" : ""}
              onClick={() => setFiltroActivo("jugadores")}
            >
              <img src={usuariosIcon} alt="" /> Jugadores
            </button>
            <button
              className={filtroActivo === "populares" ? "active" : ""}
              onClick={() => setFiltroActivo("populares")}
            >
              <img src={trending} alt="" /> Populares
            </button>
            <button
              className={filtroActivo === "nuevos" ? "active" : ""}
              onClick={() => setFiltroActivo("nuevos")}
            >
              <img src={newIcon} alt="" /> Nuevos
            </button>
          </div>
        </div>

        {(filtroActivo === "todos" ||
          filtroActivo === "empresas" ||
          filtroActivo === "nuevos" ||
          filtroActivo === "populares") && (
          <section className="seccion_1">
            <div className="seccion_1_header">
              <p>Explorar Empresas y Desarrolladoras</p>
            </div>
            {isDesktop ? (
              <>
                <div className="empresas_container">
                  {empresasFiltradas
                    .slice(0, mostrarEmpresasLimite)
                    .map((empresa) => {
                      const juegosReales = listado.filter((j) => {
                        const sId =
                          typeof j.studioId === "object"
                            ? j.studioId?.$oid
                            : j.studioId;
                        return sId === empresa._id;
                      }).length;

                      return (
                        <div key={empresa._id} className="empresa-card">
                          <div className="empresa_icon">
                            <img
                              className="background_banner"
                              src={no_banner}
                              alt=""
                            />
                            <div className="empresa_perfil">
                              {empresa.foto_de_perfil && !imgError ? (
                                <div className="empresa_perfil_container">
                                  <img
                                    src={empresa.foto_de_perfil}
                                    alt=""
                                    onError={() => setImgError(true)}
                                  />
                                  <div className="empresa_info">
                                    <p>{empresa.nombreUsuario}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="empresa_perfil_container">
                                  <p className="iniciales">
                                    {empresa.nombreUsuario
                                      .toUpperCase()
                                      .slice(0, 2)}
                                  </p>
                                  <div className="empresa_info">
                                    <h4>{empresa.nombreUsuario}</h4>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="empresa_info_container">
                            <span className="empresa_stats">
                              {juegosReales} Juegos Publicados
                            </span>
                            <button
                              onClick={() => {
                                const slug = empresa.nombreUsuario
                                  .toLowerCase()
                                  .replace(/\s+/g, "-");

                                navigate(`/comunidad/estudio/${slug}`);
                              }}
                            >
                              Ver Perfil
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <div className="empresas_container">
                  {empresasFiltradas.map((empresa) => {
                    const juegosReales = listado.filter((j) => {
                      const sId =
                        typeof j.studioId === "object"
                          ? j.studioId?.$oid
                          : j.studioId;
                      return sId === empresa._id;
                    }).length;

                    return (
                      <div key={empresa._id} className="empresa-card">
                        <div className="empresa_icon">
                          <img
                            className="background_banner"
                            src={no_banner}
                            alt=""
                          />
                          <div className="empresa_perfil">
                            {empresa.foto_de_perfil && !imgError ? (
                              <div className="empresa_perfil_container">
                                <img
                                  src={empresa.foto_de_perfil}
                                  alt=""
                                  onError={() => setImgError(true)}
                                />
                                <div className="empresa_info">
                                  <p>{empresa.nombreUsuario}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="empresa_perfil_container">
                                <p className="iniciales">
                                  {empresa.nombreUsuario
                                    .toUpperCase()
                                    .slice(0, 2)}
                                </p>
                                <div className="empresa_info">
                                  <h4>{empresa.nombreUsuario}</h4>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="empresa_info_container">
                          <span className="empresa_stats">
                            {juegosReales} Juegos Publicados
                          </span>
                          <button
                            onClick={() => {
                              const slug = empresa.nombreUsuario
                                .toLowerCase()
                                .replace(/\s+/g, "-");

                              navigate(`/comunidad/estudio/${slug}`);
                            }}
                          >
                            Ver Perfil
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {isDesktop ? (
              <>
                {empresasFiltradas.length > mostrarEmpresasLimite && (
                  <div className="btn_container">
                    <button
                      className="ver_mas_btn"
                      onClick={() => setMostrarEmpresasLimite((p) => p + 4)}
                    >
                      Ver Más Empresas
                    </button>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </section>
        )}

        {(filtroActivo === "todos" ||
          filtroActivo === "jugadores" ||
          filtroActivo === "nuevos" ||
          filtroActivo === "populares") && (
          <section className="seccion_1 mt-8">
            <div className="seccion_1_header">
              <p>Explorar Jugadores</p>
            </div>
            <div className="usuarios_container">
              {usuariosFiltrados
                .slice(0, mostrarJugadoresLimite)
                .map((usuario) => (
                  <PlayerCard
                    key={usuario._id}
                    usuario={usuario}
                    navigate={navigate}
                  />
                ))}
            </div>
            {usuariosFiltrados.length > mostrarJugadoresLimite && (
              <div className="btn_container">
                <button
                  className="ver_mas_btn"
                  onClick={() => setMostrarJugadoresLimite((p) => p + 4)}
                >
                  Ver Más Jugadores
                </button>
              </div>
            )}
          </section>
        )}
      </section>
    </section>
  );
}
