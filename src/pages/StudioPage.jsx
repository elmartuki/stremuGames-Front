import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "../css/studioPanel.css";

import iconoBusqueda from "../icons/search.svg";
import iconoJuegos from "../icons/games_green.svg";
import add_white from "../icons/add_white.svg";

import iconoVentas from "../icons/shoping_green.svg";
import iconoDinero from "../icons/ventas.svg";

import { useObtenerUsuario } from "../services/obtenerUsuario";
import { useObtenerJuegos } from "../services/obtenerJuegos";

export default function StudioPage() {
  const [buscar, setBuscar] = useState("");
  const navigate = useNavigate();

  const { usuario, cargando: cargandoUsuario } = useObtenerUsuario();

  const { listado, loading: cargandoJuegos } = useObtenerJuegos();

  const misJuegos = useMemo(() => {
    if (!usuario || !listado) return [];
    return listado.filter(
      (juego) => juego.desarrolladora === usuario.nombreUsuario,
    );
  }, [usuario, listado]);

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
      ingresos: totalIngresos.toFixed(2),
    };
  }, [misJuegos]);

  const juegosFiltrados = misJuegos.filter((juego) =>
    juego.titulo.toLowerCase().includes(buscar.toLowerCase()),
  );

  if (cargandoUsuario || cargandoJuegos || !usuario) {
    return <section className="pagina_panel_admin"></section>;
  }

  const { foto_de_perfil, nombreUsuario } = usuario;

  return (
    <section className="studio_panel_admin">
      <section className="seccion_busqueda_admin">
        <div className="input_buscador">
          <img src={iconoBusqueda} alt="Buscar" />
          <input
            type="text"
            placeholder="Buscar en mis juegos..."
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
            <img src={iconoVentas || iconoJuegos} alt="" />{" "}
            <span className="estadistica_numero">{stats.ventas}</span>
            <span className="estadistica_nombre">Ventas Totales</span>
          </div>

          <div className="estadistica_card">
            <img src={iconoDinero || iconoEstrella} alt="" />
            <span className="estadistica_numero" style={{ color: "#66f61e" }}>
              ${stats.ingresos}
            </span>
            <span className="estadistica_nombre">Ingresos Generados</span>
          </div>
        </div>
      </section>

      <section className="seccion_gestion">
        <div className="seccion_gestion_header">
          <h3>Mis Juegos</h3>

          <button
            onClick={() => navigate("/studio-panel/crear-juego")}
            className="btn_upload"
          >
            Subir Nuevo Juego <img src={add_white} alt="" />
          </button>
        </div>

        {misJuegos.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
            <p>Aún no has publicado ningún juego.</p>
          </div>
        ) : (
          <div className="tarjetas_juegos_container">
            {juegosFiltrados.map((juego) => (
              <div className="tarjeta_juego" key={juego._id}>
                <div className="tarjeta_juego_imagen">
                  <img src={juego.imagenPortada || ""} alt={juego.titulo} />
                  <span className="tarjeta_juego_categorias">
                    {juego.categorias.slice(0, 3).join(", ")}
                  </span>
                </div>

                <div className="tarjeta_juego_data">
                  <h4>{juego.titulo}</h4>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      color: "#aaa",
                    }}
                  >
                    <span>v{juego.version || "1.0"}</span>
                    <span>{juego.ventasTotales || 0} Ventas</span>
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
                    className="eliminar"
                    onClick={() => navigate(`/juego/${juego._id}`)}
                    style={{ flex: 1 }}
                  >
                    Eliminar
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
