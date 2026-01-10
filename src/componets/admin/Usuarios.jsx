import "../../css/adminPanel.css";
import { useNavigate } from "react-router-dom";
import back from "../../icons/back.svg";
import more from "../../icons/more.svg";
import lupa from "../../icons/search.svg";
import ojo from "../../icons/eye.svg";
import ban from "../../icons/ban.svg";
import { useObtenerUsuarios } from "../../services/obtenerUsuarios";
import { useState } from "react";

export default function Usuarios() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  const { usuarios = [] } = useObtenerUsuarios();

  const listadoFiltrado = usuarios.filter((usuario) =>
    usuario.nombreUsuario.toLowerCase().includes(busqueda.toLowerCase())
  );

  const ultimoIndice = paginaActual * usuariosPorPagina;
  const primerIndice = ultimoIndice - usuariosPorPagina;

  const usuariosPaginados = listadoFiltrado.slice(primerIndice, ultimoIndice);

  const totalPaginas = Math.ceil(listadoFiltrado.length / usuariosPorPagina);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  return (
    <section className="listado_de_usuarios_section">
      <nav className="navbar-phone">
        <img onClick={() => navigate(-1)} src={back} alt="Volver" />
        <div>
          <p>Administrador de Usuarios</p>
          <p>Gestiona los usuarios.</p>
        </div>
        <img src={more} alt="Más" />
      </nav>

      <section className="listado_de_usuarios">
        <div className="listado_de_usuarios_search">
          <img src={lupa} alt="Buscar" />
          <input
            onChange={manejarBusqueda}
            type="text"
            placeholder="Buscar usuario..."
          />
        </div>

        <section className="listado_de_usuarios">
          {usuariosPaginados.map((usuario) => {
            const { nombreUsuario, foto_de_perfil, _id, createdAt } = usuario;
            const iniciales = nombreUsuario.toUpperCase().slice(0, 2);
            const año = new Date(createdAt).getFullYear();
            const idCorto = _id.slice(-5).toUpperCase();

            return (
              <article className="usuario_card" key={_id}>
                <div className="usuario_card_data">
                  <div className="usuario_card_data_imagen">
                    {foto_de_perfil === "" ? (
                      <span className="iniciales">{iniciales}</span>
                    ) : (
                      <img src={foto_de_perfil} alt={nombreUsuario} />
                    )}
                  </div>
                  <div className="usuario_datos">
                    <p className="usuario_datos_nombre">{nombreUsuario}</p>
                    <p className="usuario_datos_año">
                      ID: #{idCorto} • {año}
                    </p>
                  </div>
                </div>

                <div className="usuario_card_buttons">
                  <button
                    className="btn_ver"
                    onClick={() => navigate(`/admin/usuarios/${_id}`)}
                  >
                    <img src={ojo} alt="Ver" />
                  </button>
                  <button className="btn_ban">
                    <img src={ban} alt="Banear" />
                  </button>
                </div>
              </article>
            );
          })}

          {listadoFiltrado.length === 0 && (
            <p className="sin_resultados">
              No se encontraron usuarios con ese nombre.
            </p>
          )}
        </section>

        {totalPaginas > 1 && (
          <div className="paginacion_controles">
            <button
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              Anterior
            </button>

            <span>
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </section>
  );
}
