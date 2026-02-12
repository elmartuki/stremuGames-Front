import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useObtenerUsuarios } from "../../services/obtenerUsuarios";
import clientAxios from "../../utils/clientAxios";

import "../../css/adminPanel.css";

import back from "../../icons/back.svg";
import more from "../../icons/more.svg";
import lupa from "../../icons/search.svg";
import ban from "../../icons/ban.svg";
import { useMessageStore } from "../../services/MessageModal";

export default function Empresas() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const empresasPorPagina = 10;

  const { showMessage } = useMessageStore.getState();

  const { empresas: empresasData = [] } = useObtenerUsuarios();

  const [listaEmpresas, setListaEmpresas] = useState([]);

  useEffect(() => {
    if (empresasData.length > 0 && listaEmpresas.length === 0) {
      setListaEmpresas(empresasData);
    }
  }, [empresasData, listaEmpresas.length]);

  const listadoFiltrado = listaEmpresas.filter((empresa) =>
    empresa.nombreUsuario.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const ultimoIndice = paginaActual * empresasPorPagina;
  const primerIndice = ultimoIndice - empresasPorPagina;
  const empresasPaginadas = listadoFiltrado.slice(primerIndice, ultimoIndice);
  const totalPaginas = Math.ceil(listadoFiltrado.length / empresasPorPagina);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  const handleBannear = async (id) => {
    try {
      const response = await clientAxios.put(`/usuarios/banear/${id}`);

      if (response.status === 200) {
        setListaEmpresas((prevEmpresas) =>
          prevEmpresas.map((emp) =>
            emp._id === id ? { ...emp, activo: !emp.activo } : emp,
          ),
        );
        showMessage("Estado de usuario actualizado correctamente", "success");
      }
    } catch (error) {
      showMessage(
        "No se pudo realizar la acción. Inténtalo de nuevo.",
        "error",
      );
    }
  };

  return (
    <>
      <header className="navbar_admin">
        <img
          onClick={() => navigate(-1)}
          src={back}
          className="btn_back"
          alt="Volver"
        />

        <div className="text_container">
          <span className="subtitulo">Gestión</span>
          <h1 className="titulo">Listado de Empresas</h1>
        </div>

        <img className="more" src={more} alt="" />
      </header>

      <section className="page_panel_admin">
        <section className="seccion_busqueda_admin">
          <div className="input_buscador">
            <img src={lupa} alt="Buscar" />
            <input
              onChange={manejarBusqueda}
              type="text"
              placeholder="Buscar empresa por nombre..."
              value={busqueda}
            />
          </div>
        </section>

        <section className="seccion_gestion">
          <div className="contenedor_tarjetas">
            {empresasPaginadas.length > 0 ? (
              empresasPaginadas.map((empresa) => {
                const {
                  nombreUsuario,
                  foto_de_perfil,
                  _id,
                  createdAt,
                  activo,
                } = empresa;
                const iniciales = nombreUsuario.toUpperCase().slice(0, 2);
                const año = new Date(createdAt).getFullYear();

                return (
                  <div className="tarjeta_desarrolladora" key={_id}>
                    <div className="tarjeta_desarrolladora_header">
                      <div className="desarrolladora_logo">
                        {foto_de_perfil === "" ? (
                          <p>{iniciales}</p>
                        ) : (
                          <img src={foto_de_perfil} alt={nombreUsuario} />
                        )}
                      </div>
                      <div className="desarrolladora_data">
                        <h4>{nombreUsuario}</h4>
                        <p>Empresa • Reg. {año}</p>
                      </div>

                      <span
                        className={`estado_etiqueta ${!activo ? "banned" : ""}`}
                      >
                        {activo ? "ACTIVA" : "BANEADO"}
                      </span>
                    </div>

                    <div className="desarrolladora_botones">
                      <button
                        className="ver_perfil"
                        onClick={() => navigate(`/comunidad/estudio/${_id}`)}
                      >
                        Ver Perfil
                      </button>
                      <button
                        className={activo ? "banear" : "desbanear"}
                        onClick={() => handleBannear(_id)}
                      >
                        <img src={ban} alt="Banear" />
                        {activo ? "Banear" : "Activar"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "40px",
                  color: "#666",
                }}
              >
                <p>No se encontraron empresas con ese nombre.</p>
              </div>
            )}
          </div>

          {totalPaginas > 1 && (
            <div className="ver_mas_container" style={{ gap: "20px" }}>
              <button
                onClick={() => setPaginaActual(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="btn_ver_mas"
              >
                Anterior
              </button>

              <span style={{ color: "white", fontWeight: "bold" }}>
                {paginaActual} / {totalPaginas}
              </span>

              <button
                onClick={() => setPaginaActual(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="btn_ver_mas"
              >
                Siguiente
              </button>
            </div>
          )}
        </section>
      </section>
    </>
  );
}
