import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/studioPanel.css";

import iconoBusqueda from "../icons/search.svg";
import iconoJuegos from "../icons/games_green.svg";
import add_white from "../icons/add_white.svg";
import iconoVentas from "../icons/shoping_green.svg";
import iconoDinero from "../icons/ventas.svg";
import deleteIcon from "../icons/delete.svg";

import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useObtenerJuegos } from "../services/obtenerJuegos";
import { eliminarUnJuego } from "../services/eliminarUnJuego";
import clientAxios from "../utils/clientAxios";
import { useMessageStore } from "../services/MessageModal";
import { useConfirmStore } from "../services/ConfirmModal";
import ConfirmModal from "../componets/modal/ConfirmModal";

export default function StudioPage() {
  const [buscar, setBuscar] = useState("");
  const navigate = useNavigate();

  const { showMessage } = useMessageStore.getState();

  const { usuario, cargando: cargandoUsuario } = useObtenerUsuario();
  const { listado, loading: cargandoJuegos } = useObtenerJuegos();

  const [juegosLocal, setJuegosLocal] = useState([]);

  const { ask } = useConfirmStore();

  useEffect(() => {
    if (listado) {
      setJuegosLocal(listado);
    }
  }, [listado]);

  const misJuegos = useMemo(() => {
    if (!usuario || !juegosLocal) return [];

    return juegosLocal.filter((juego) => {
      const studioIdJuego =
        typeof juego.studioId === "object"
          ? juego.studioId?.$oid
          : juego.studioId;

      return studioIdJuego === usuario._id;
    });
  }, [usuario, juegosLocal]);

  const stats = useMemo(() => {
    if (misJuegos.length === 0) return { ventas: 0, ingresos: 0 };

    let totalVentas = 0;
    let totalIngresos = 0;

    misJuegos.forEach((juego) => {
      const ventasJuego = juego.ventasTotales || 0;
      const precioReal =
        juego.precioDescuento > 0 ? juego.precioDescuento : juego.precioBase;

      totalVentas += ventasJuego;
      totalIngresos += ventasJuego * precioReal;
    });

    return {
      ventas: totalVentas,
      ingresos: totalIngresos.toFixed(0),
    };
  }, [misJuegos]);

  const actualizarEstado = async (id) => {
    try {
      const response = await clientAxios.put(`/juegos/estado/${id}`);

      if (response.status === 200) {
        setJuegosLocal((prev) =>
          prev.map((juego) =>
            juego._id === id ? { ...juego, mostrar: !juego.mostrar } : juego,
          ),
        );
      }
    } catch (error) {
      showMessage("No se pudo cambiar la visibilidad del juego", error);
    }
  };

  const handleEliminar = (id) => {
    ask(
      "¿Estás seguro de que deseas eliminar este juego? Esta acción no se puede deshacer.",
      async () => {
        try {
          await eliminarUnJuego(id);
          setJuegosLocal((prev) => prev.filter((juego) => juego._id !== id));
          showMessage("Juego eliminado correctamente");
        } catch (error) {
          showMessage("Error al eliminar el juego", error);
        }
      },
    );
  };

  const juegosFiltrados = misJuegos.filter((juego) =>
    juego.titulo.toLowerCase().includes(buscar.toLowerCase()),
  );

  if (cargandoUsuario || cargandoJuegos || !usuario) {
    return (
      <section
        className="pagina_panel_admin"
        style={{ background: "#111", height: "100vh" }}
      ></section>
    );
  }

  return (
    <section className="studio_panel_admin">
      <ConfirmModal />

      <section className="seccion_busqueda_admin">
        <div className="input_buscador">
          <img src={iconoBusqueda} alt="Buscar" />
          <input
            type="text"
            placeholder="Buscar en mis juegos..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>
      </section>

      <section className="seccion_estadisticas">
        <h2 className="seccion_estadisticas_titulo">Rendimiento Financiero</h2>
        <div className="estadisticas_container">
          <div className="estadistica_card">
            <img src={iconoJuegos} alt="" />
            <span className="estadistica_numero">{misJuegos.length}</span>
            <span className="estadistica_nombre">Juegos Activos</span>
          </div>

          <div className="estadistica_card">
            <img src={iconoVentas} alt="" />
            <span className="estadistica_numero">{stats.ventas}</span>
            <span className="estadistica_nombre">Ventas Totales</span>
          </div>

          <div className="estadistica_card">
            <img src={iconoDinero} alt="" />
            <span className="estadistica_numero" style={{ color: "#66f61e" }}>
              ${stats.ingresos}
            </span>
            <span className="estadistica_nombre">Ingresos Generados</span>
          </div>
        </div>
      </section>

      <section className="seccion_gestion">
        <div className="seccion_gestion_header">
          <h3>Mis Juegos ({misJuegos.length})</h3>
          <button
            onClick={() => navigate("/studio-panel/crear-juego")}
            className="btn_upload"
          >
            Subir Nuevo Juego <img src={add_white} alt="" />
          </button>
        </div>

        {misJuegos.length === 0 ? (
          <div
            className="no-games-box"
            style={{
              padding: "80px 20px",
              textAlign: "center",
              color: "#666",
              background: "#1a1a1a",
              borderRadius: "15px",
              marginTop: "20px",
            }}
          >
            <p>Aún no has publicado ningún juego.</p>
          </div>
        ) : (
          <div className="tarjetas_juegos_container">
            {juegosFiltrados.map((juego) => (
              <div
                className={`tarjeta_juego ${!juego.mostrar ? "juego_oculto" : ""}`}
                key={juego._id}
                style={{ opacity: juego.mostrar ? 1 : 0.5 }}
              >
                <div className="tarjeta_juego_imagen">
                  <img src={juego.imagenPortada || ""} alt={juego.titulo} />
                  <span className="tarjeta_juego_categorias">
                    {juego.categorias?.slice(0, 2).join(", ")}
                  </span>
                </div>

                <div className="tarjeta_juego_data">
                  <h4>{juego.titulo}</h4>
                  <div
                    className="data_footer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: "#888",
                    }}
                  >
                    <span>v{juego.version || "1.0"}</span>
                    <span className={juego.mostrar ? "mostar" : "oculto"}>
                      {juego.mostrar ? "Público" : "Privado"}
                    </span>
                  </div>
                </div>

                <div className="tarjeta_juego_buttons">
                  <button
                    className="ver"
                    onClick={() =>
                      navigate(`/studio-panel/editar-juego/${juego._id}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className={juego.mostrar ? "mostrar" : "oculto"}
                    onClick={() => actualizarEstado(juego._id)}
                    style={{
                      color: "white",
                    }}
                  >
                    {juego.mostrar ? "Ocultar" : "Mostrar"}
                  </button>
                  <button
                    className="eliminar_btn"
                    onClick={() => handleEliminar(juego._id)}
                  >
                    <img
                      src={deleteIcon}
                      alt="Eliminar"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
