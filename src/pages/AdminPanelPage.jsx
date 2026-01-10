import React, { useState } from "react";
import "../css/adminPanel.css";
import iconoBusqueda from "../icons/search.svg";
import iconoAjustes from "../icons/settings.svg";
import iconoOjo from "../icons/eye.svg";
import iconoBanear from "../icons/ban.svg";
import iconoEmpresa from "../icons/empresa.svg";
import iconoUsuarios from "../icons/usuarios.svg";
import iconoJuegos from "../icons/games.svg";
import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useObtenerUsuarios } from "../services/obtenerUsuarios";
import { useObtenerJuegos } from "../services/obtenerJuegos";
import { useNavigate } from "react-router-dom";

export default function AdminPanelPage() {
  const [buscar, setBuscar] = useState("");

  const { usuario } = useObtenerUsuario();
  const { usuarios, cargando, usuariosComunes, empresas } =
    useObtenerUsuarios();
  const { listado } = useObtenerJuegos();

  const navigate = useNavigate();

  if (!usuario || cargando) {
    return <section className="pagina_panel_admin">Cargando...</section>;
  }

  const { foto_de_perfil } = usuario;

  return (
    <section className="page_panel_admin">
      <header className="page_panel_admin_header">
        <div className="perfil_admin">
          <div className="perfil_admin_avatar">
            <img src={foto_de_perfil} className="avatar_admin" />
            <span className="admin">ADMIN</span>
          </div>
          <div className="info_admin">
            <span className="subtitulo_admin">Panel de Control</span>
            <h1 className="titulo_admin">Gestión Global</h1>
          </div>
        </div>
        <button className="ajustes">
          <img src={iconoAjustes} />
        </button>
      </header>

      <section className="seccion_busqueda_admin">
        <div className="input_buscador">
          <img src={iconoBusqueda} alt="Buscar" />
          <input
            type="text"
            placeholder="Buscar desarrolladoras, usuarios..."
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>
      </section>

      <section className="seccion_estadisticas">
        <h2 className="seccion_estadisticas_titulo">Estadísticas Generales</h2>
        <div className="estadisticas_container">
          <div className="estadistica_card">
            <img src={iconoEmpresa} alt="" />
            <span className="estadistica_numero">{empresas.length}</span>
            <span className="estadistica_nombre">Desarrolladoras</span>
          </div>
          <div className="estadistica_card">
            <img src={iconoUsuarios} alt="" />
            <span className="estadistica_numero">{usuariosComunes.length}</span>
            <span className="estadistica_nombre">Usuarios</span>
          </div>
          <div className="estadistica_card">
            <img src={iconoJuegos} alt="" />
            <span className="estadistica_numero">{listado.length}</span>
            <span className="estadistica_nombre">Juegos Activos</span>
          </div>
        </div>
      </section>

      <section className="seccion_gestion">
        <div className="seccion_gestion_header">
          <h3>Gestión de Juegos Activos</h3>
          <button
            onClick={() => navigate("/admin-panel/juegos")}
            className="seccion_gestion_header_link"
          >
            Ver catálogo
          </button>
        </div>

        <div className="tarjetas_juegos_container">
          {listado.slice(0, 4).map((juego) => (
            <div className="tarjeta_juego" key={juego._id}>
              <div className="tarjeta_juego_imagen">
                <img src={juego.imagenPortada || ""} alt={juego.titulo} />
                <span className="tarjeta_juego_categorias">
                  {juego.categorias.join(", ")}
                </span>
              </div>
              <div className="tarjeta_juego_data">
                <h4>{juego.titulo}</h4>
                <p className="juego_desarrolladora">{juego.desarrolladora}</p>
                <div className="juego_stats">
                  <span>⭐ {juego.promedioCalificacion || "0.0"}</span>
                </div>
              </div>
              <div className="tarjeta_juego_buttons">
                <button className="ver">Editar</button>
                <button className="eliminar">Ocultar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="seccion_gestion">
        <div className="seccion_gestion_header">
          <h3>Gestión de Desarrolladoras</h3>
          <button
            onClick={() => navigate("/admin-panel/empresas")}
            className="seccion_gestion_header_link"
          >
            Ver todas
          </button>
        </div>

        <div className="contenedor_tarjetas">
          {empresas.map((emp) => {
            const iniciales = emp.nombreUsuario.toUpperCase().slice(0, 2);
            return (
              <div className="tarjeta_desarrolladora" key={emp._id}>
                <div className="tarjeta_desarrolladora_header">
                  <div className="desarrolladora_logo">
                    {emp.foto_de_perfil === "" ? (
                      <p>{iniciales}</p>
                    ) : (
                      <img src={emp.foto_de_perfil} alt="" />
                    )}
                  </div>
                  <div className="desarrolladora_data">
                    <h4>{emp.nombreUsuario}</h4>
                    <p>Verificada • {emp.juegosSubidos.length} Juegos</p>
                  </div>
                  <span className="estado_etiqueta">ACTIVA</span>
                </div>
                <div className="desarrolladora_botones">
                  <button className="ver_perfil">Ver Perfil</button>
                  <button className="banear">
                    <img src={iconoBanear} alt="" /> Banear
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="seccion_gestion">
        <div className="seccion_gestion_header">
          <h3>Gestión de Usuarios</h3>
        </div>
        <div className="contenedor_lista_usuarios">
          {usuariosComunes.map((u) => {
            const añoRegistro = new Date(u.createdAt).getFullYear();
            const iniciales = u.nombreUsuario.toUpperCase().slice(0, 2);
            const idCorto = u._id.slice(-5).toUpperCase();

            return (
              <div className="usuario_card_fila" key={u._id}>
                <div className="usuario_card">
                  <div className="usuario_card_perfil">
                    {u.foto_de_perfil === "" ? (
                      <span className="iniciales">{iniciales}</span>
                    ) : (
                      <img src={u.foto_de_perfil} alt={u.nombreUsuario} />
                    )}
                  </div>
                  <div>
                    <p className="usuario_nombre">{u.nombreUsuario}</p>
                    <p className="usuario_fecha">
                      ID: #{idCorto} • Registrado {añoRegistro}
                    </p>
                  </div>
                </div>
                <div className="usuario_card_buttons">
                  <button className="ver">
                    <img src={iconoOjo} />
                  </button>
                  <button className="bannear" title="Banear Usuario">
                    <img src={iconoBanear} />
                  </button>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => navigate("/admin-panel/usuarios")}
            className="boton_ver_mas"
          >
            Ver más usuarios
          </button>
        </div>
      </section>
    </section>
  );
}
