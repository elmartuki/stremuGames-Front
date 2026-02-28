import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../../utils/clientAxios";
import { useObtenerJuegos } from "../../services/obtenerJuegos";

import "../../css/payments.css";

export default function Pendiente() {
  const navigate = useNavigate();

  const { listado: todosLosJuegos, loading: loadingJuegos } =
    useObtenerJuegos();

  const [compraInfo, setCompraInfo] = useState(null);
  const [juegosParaMostrar, setJuegosParaMostrar] = useState([]);
  const [loadingCompra, setLoadingCompra] = useState(true);

  useEffect(() => {
    const obtenerUltimaCompra = async () => {
      try {
        const response = await clientAxios.get("/pedidos/compras/");
        if (response.status === 200) {
          const listaDeCompras = response.data.datos;
          if (listaDeCompras && listaDeCompras.length > 0) {
            setCompraInfo(listaDeCompras.at(-1));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCompra(false);
      }
    };
    obtenerUltimaCompra();
  }, []);

  useEffect(() => {
    if (compraInfo && todosLosJuegos.length > 0) {
      const idsComprados = compraInfo.juegos.map((item) => item.idJuego);
      const filtrados = todosLosJuegos.filter((juegoDelCatalogo) =>
        idsComprados.includes(juegoDelCatalogo._id),
      );
      setJuegosParaMostrar(filtrados);
    }
  }, [compraInfo, todosLosJuegos]);

  if (loadingCompra || loadingJuegos)
    return <div className="loading-screen">Verificando estado...</div>;

  if (!compraInfo)
    return (
      <div className="error-screen">
        <p>Tu pago está siendo procesado por el proveedor.</p>
        <button
          className="btn_volver"
          onClick={() => navigate("/")}
          style={{ marginTop: 20, maxWidth: 200 }}
        >
          Volver al inicio
        </button>
      </div>
    );

  const { paymentId, total, createdAt, estado } = compraInfo;

  const fecha = new Date(createdAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="pago_exitoso_section">
      <article className="recibo_card pending-card">
        <header className="recibo_header">
          <div className="icon_container">!</div>
          <h1>Pago Pendiente</h1>
          <p className="status-badge">
            {estado === "pending" ? "En Proceso" : estado}
          </p>
        </header>

        <div className="info_transaccion">
          <div
            className="info_row"
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            <span style={{ color: "#ccc", fontSize: "0.85rem" }}>
              Tu pago se está procesando. Los juegos se habilitarán en tu
              biblioteca apenas se acredite el dinero.
            </span>
          </div>

          <div className="info_row">
            <span>ID de Referencia:</span>
            <strong>#{paymentId}</strong>
          </div>
          <div className="info_row">
            <span>Fecha:</span>
            <span>{fecha}</span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="lista_juegos_container">
          <h3>Pendiente de entrega ({juegosParaMostrar.length})</h3>

          <div className="juegos_container">
            {juegosParaMostrar.length > 0 ? (
              juegosParaMostrar.map((juego) => (
                <div key={juego._id} className="juego_card">
                  <div className="juego_info">
                    <div className="juego_info_imagen">
                      <img
                        src={juego.imagenPortada}
                        alt={juego.titulo}
                        className="juego_imagen"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                    </div>
                  </div>

                  <div className="juegos_datos">
                    <span className="juego_titulo">{juego.titulo}</span>

                    <span className="juego_precio" style={{ color: "#ccc" }}>
                      En espera
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#999", fontSize: "0.9rem" }}>
                Estamos procesando los items...
              </p>
            )}
          </div>
        </div>

        <div className="divider"></div>

        <div className="total_container">
          <span>Total a Pagar</span>
          <span className="total_monto">${Number(total).toFixed(2)}</span>
        </div>

        <button className="btn_volver" onClick={() => navigate("/explorar")}>
          Volver al Inicio
        </button>
      </article>
    </section>
  );
}
