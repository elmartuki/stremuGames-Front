import React, { useState, useEffect } from "react";
import "../css/adminPanel.css";
import iconoBusqueda from "../icons/search.svg";
import iconoAjustes from "../icons/settings.svg";
import iconoBanear from "../icons/ban.svg";
import iconoEmpresa from "../icons/empresa.svg";
import iconoUsuarios from "../icons/usuarios.svg";
import iconoJuegos from "../icons/games.svg";
import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useObtenerUsuarios } from "../services/obtenerUsuarios";
import { useObtenerJuegos } from "../services/obtenerJuegos";
import { useNavigate } from "react-router-dom";
import clientAxios from "../utils/clientAxios";

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const [buscar, setBuscar] = useState("");
  const [indice, setIndice] = useState(4);

  const { usuario } = useObtenerUsuario();
  const {
    cargando,
    usuariosComunes: dataUsuarios = [],
    empresas: dataEmpresas = [],
  } = useObtenerUsuarios();
  const { listado } = useObtenerJuegos();

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaEmpresas, setListaEmpresas] = useState([]);

  useEffect(() => {
    if (dataUsuarios.length > 0 && listaUsuarios.length === 0) {
      setListaUsuarios(dataUsuarios);
    }
    if (dataEmpresas.length > 0 && listaEmpresas.length === 0) {
      setListaEmpresas(dataEmpresas);
    }
  }, [dataUsuarios, dataEmpresas, listaUsuarios.length, listaEmpresas.length]);

  if (!usuario || cargando) {
    return <></>;
  }

  const { foto_de_perfil } = usuario;

  const handleBannear = async (id, tipo) => {
    try {
      const response = await clientAxios.put(`/usuarios/banear/${id}`);
      if (response.status === 200 || response.status === 201) {
        const updater = (prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, activo: !item.activo } : item,
          );

        if (tipo === "usuario") setListaUsuarios(updater);
        else setListaEmpresas(updater);
      }
    } catch (error) {
      console.error("Error al banear:", error);
    }
  };

  const handleShow = () => {
    setIndice(indice + 4);
  };

  return (
    <section className="page_panel_admin">
      <header className="page_panel_admin_header">
        <div className="perfil_admin">
          <div className="perfil_admin_avatar">
            <img
              src={foto_de_perfil}
              className="avatar_admin"
              alt="Avatar Admin"
            />
            <span className="admin">ADMIN</span>
          </div>
          <div className="info_admin">
            <span className="subtitulo_admin">Panel de Control</span>
            <h1 className="titulo_admin">Gestión Global</h1>
          </div>
        </div>
        <button className="ajustes">
          <img src={iconoAjustes} alt="Ajustes" />
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
            <span className="estadistica_numero">{listaEmpresas.length}</span>
            <span className="estadistica_nombre">Desarrolladoras</span>
          </div>
          <div className="estadistica_card">
            <img src={iconoUsuarios} alt="" />
            <span className="estadistica_numero">{listaUsuarios.length}</span>
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
          <h3>Gestión de Juegos</h3>
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
                <button
                  onClick={() => navigate(`/juego/${juego._id}`)}
                  className="ver"
                >
                  Ver
                </button>
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
          {listaEmpresas.slice(0, 4).map((empresa) => {
            const iniciales = empresa.nombreUsuario.toUpperCase().slice(0, 2);
            return (
              <div className="tarjeta_desarrolladora" key={empresa._id}>
                <div className="tarjeta_desarrolladora_header">
                  <div className="desarrolladora_logo">
                    {empresa.foto_de_perfil === "" ? (
                      <p>{iniciales}</p>
                    ) : (
                      <img src={empresa.foto_de_perfil} alt="" />
                    )}
                  </div>
                  <div className="desarrolladora_data">
                    <h4>{empresa.nombreUsuario}</h4>
                    <p>
                      Verificada • {empresa.juegosSubidos?.length || 0} Juegos
                    </p>
                  </div>
                  <span
                    className={`estado_etiqueta ${!empresa.activo ? "banned" : ""}`}
                  >
                    {empresa.activo ? "ACTIVA" : "BANEADO"}
                  </span>
                </div>
                <div className="desarrolladora_botones">
                  <button
                    onClick={() =>
                      navigate(`/comunidad/estudio/${empresa._id}`)
                    }
                    className="ver_perfil"
                  >
                    Ver Perfil
                  </button>
                  <button
                    className={empresa.activo ? "banear" : "desbanear"}
                    onClick={() => handleBannear(empresa._id, "empresa")}
                  >
                    <img src={iconoBanear} alt="" />{" "}
                    {empresa.activo ? "Banear" : "Activar"}
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
          <button
            onClick={() => navigate("/admin-panel/usuarios")}
            className="seccion_gestion_header_link"
          >
            Ver todos
          </button>
        </div>
        <div className="contenedor_tarjetas">
          {listaUsuarios.slice(0, indice).map((u) => {
            const añoRegistro = new Date(u.createdAt).getFullYear();
            const iniciales = u.nombreUsuario.toUpperCase().slice(0, 2);
            return (
              <div className="tarjeta_desarrolladora" key={u._id}>
                <div className="tarjeta_desarrolladora_header">
                  <div className="desarrolladora_logo">
                    {u.foto_de_perfil === "" ? (
                      <p>{iniciales}</p>
                    ) : (
                      <img src={u.foto_de_perfil} alt={u.nombreUsuario} />
                    )}
                  </div>
                  <div className="desarrolladora_data">
                    <h4>{u.nombreUsuario}</h4>
                    <p>Usuario • Reg. {añoRegistro}</p>
                  </div>
                  <span
                    className={`estado_etiqueta ${!u.activo ? "baneado" : "user"}`}
                  >
                    {u.activo ? "ACTIVO" : "BANEADO"}
                  </span>
                </div>
                <div className="desarrolladora_botones">
                  <button
                    className="ver_perfil"
                    onClick={() => navigate(`/comunidad/usuario/${u._id}`)}
                  >
                    Ver Perfil
                  </button>
                  <button
                    className={u.activo ? "banear" : "desbanear"}
                    onClick={() => handleBannear(u._id, "usuario")}
                  >
                    <img src={iconoBanear} alt="" />{" "}
                    {u.activo ? "Banear" : "Activar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {listaUsuarios.length > indice && (
          <div className="ver_mas_container">
            <button onClick={handleShow} className="btn_ver_mas">
              Ver más usuarios ({listaUsuarios.length - indice} restantes)
            </button>
          </div>
        )}
      </section>
    </section>
  );
}
