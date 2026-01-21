import React, { useState } from "react";
import "../css/comunidadPage.css";
import search from "../icons/search.svg";
import usuariosIcon from "../icons/usuarios.svg";
import empresaIcon from "../icons/empresa.svg";
import global from "../icons/globe_white.svg";
import trending from "../icons/trending.svg";
import newIcon from "../icons/new.svg";
import person_add from "../icons/person_add.svg";
import visibility from "../icons/visibility.svg";
import { useObtenerUsuarios } from "../services/obtenerUsuarios";
import { useNavigate } from "react-router-dom";
import { useCalcularNivel } from "../services/calcularNivel";

const PlayerCard = ({ usuario, navigate }) => {
  const { nivel } = useCalcularNivel(usuario._id);

  const iniciales = usuario.nombreUsuario
    ? usuario.nombreUsuario.toUpperCase().slice(0, 2)
    : "UN";

  return (
    <div className="usuario_card">
      <div className="usuario_avatar">
        <div className="avatar">
          {usuario.foto_de_perfil === "" || !usuario.foto_de_perfil ? (
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
        <button className="btn-follow">
          <img src={person_add} alt="" />
          Seguir
        </button>

        <button
          className="btn-follow"
          onClick={() => navigate(`/comunidad/usuario/${usuario._id}`)}
        >
          <img src={visibility} alt="" />
          Ver Perfil
        </button>
      </div>
    </div>
  );
};

export default function ComunidadPage() {
  const { usuarios, cargando, usuariosComunes, empresas } =
    useObtenerUsuarios();
  const navigate = useNavigate();

  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [mostrar, setMostrar] = useState(4);

  const calcularPuntajeOrdenamiento = (usuario) => {
    const juegos = usuario.juegosComprados?.length || 0;
    const deseados = usuario.juegosDeseados?.length || 0;
    return juegos + deseados;
  };

  const procesarLista = (lista) => {
    let resultado = lista.filter((item) =>
      item.nombreUsuario.toLowerCase().includes(busqueda.toLowerCase()),
    );

    if (filtroActivo === "nuevos") {
      resultado = [...resultado].sort((a, b) => {
        const fechaA = new Date(a.createdAt || 0);
        const fechaB = new Date(b.createdAt || 0);
        return fechaB - fechaA;
      });
    }

    if (filtroActivo === "populares") {
      resultado = [...resultado].sort((a, b) => {
        const puntajeA = calcularPuntajeOrdenamiento(a);
        const puntajeB = calcularPuntajeOrdenamiento(b);
        return puntajeB - puntajeA;
      });
    }

    return resultado;
  };

  const empresasFiltradas = procesarLista(empresas);
  const usuariosFiltrados = procesarLista(usuariosComunes);

  const mostrarEmpresas =
    filtroActivo === "todos" ||
    filtroActivo === "empresas" ||
    filtroActivo === "nuevos" ||
    filtroActivo === "populares";
  const mostrarJugadores =
    filtroActivo === "todos" ||
    filtroActivo === "jugadores" ||
    filtroActivo === "nuevos" ||
    filtroActivo === "populares";

  return (
    <section className="comunidad-page">
      <section className="comunidad-body">
        <div className="comunidad_hero">
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
              <img src={empresaIcon} alt="" />
              Empresas
            </button>

            <button
              className={filtroActivo === "jugadores" ? "active" : ""}
              onClick={() => setFiltroActivo("jugadores")}
            >
              <img src={usuariosIcon} alt="" />
              Jugadores
            </button>

            <button
              className={filtroActivo === "populares" ? "active" : ""}
              onClick={() => setFiltroActivo("populares")}
            >
              <img src={trending} alt="" />
              Populares
            </button>

            <button
              className={filtroActivo === "nuevos" ? "active" : ""}
              onClick={() => setFiltroActivo("nuevos")}
            >
              <img src={newIcon} alt="" />
              Nuevos
            </button>
          </div>
        </div>

        {mostrarEmpresas && (
          <section className="seccion_1">
            <div className="seccion_1_header">
              <p>Explorar Empresas y Desarrolladoras</p>   
            </div>

            {empresasFiltradas.length === 0 && (
              <p style={{ color: "#fff", opacity: 0.7 }}>
                No se encontraron empresas con ese nombre.
              </p>
            )}

            <div className="empresas_container">
              {empresasFiltradas.map((empresa) => {
                return (
                  <div key={empresa._id} className="empresa-card">
                    <div className="empresa_icon">
                      <img
                        src={empresa.icon || empresaIcon}
                        alt={empresa.nombreUsuario}
                      />
                    </div>
                    <div className="empresa_info">
                      <h4>{empresa.nombreUsuario}</h4>
                    </div>
                    <span className="empresa_stats">
                      {empresa.juegosSubidos?.length || 0} Juegos Publicados
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/comunidad/estudio/${empresa._id}`)
                      }
                    >
                      Ver Perfil
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {mostrarJugadores && (
          <section
            className={`seccion_1 ${
              !mostrarEmpresas ? "players_section_spacing" : "mt-8"
            }`}
          >
            <div className="seccion_1_header">
              <p>Explorar Jugadores</p>
            </div>

            {usuariosFiltrados.length === 0 && (
              <p style={{ color: "#fff", opacity: 0.7 }}>
                No se encontraron jugadores con ese nombre.
              </p>
            )}

            <div className="usuarios_container">
              {usuariosFiltrados.slice(0, mostrar).map((usuario) => (
                <PlayerCard
                  key={usuario._id}
                  usuario={usuario}
                  navigate={navigate}
                />
              ))}
            </div>

            <div className="btn_container">
              <button
                className="ver_mas_btn"
                onClick={() => {
                  setMostrar(mostrar + 4);
                }}
              >
                Ver Mas
              </button>
            </div>
          </section>
        )}
      </section>
    </section>
  );
}
