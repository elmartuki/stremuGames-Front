import { useEffect, useState } from "react";
import { obtenerCarrito } from "../services/obtenerCarrito";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import deleteIcon from "../icons/delete.svg";
import arrowLeft from "../icons/arrowLeft.svg";
import cupondepago from "../icons/cupondepago.svg";
import compras_green from "../icons/compras_green.svg";
import sell_green from "../icons/sell_green.svg";
import sell_yellow from "../icons/sell_yellow.svg";
import clientAxios from "../utils/clientAxios";
import "../css/carrito.css";
import { useNavigate } from "react-router-dom";
import { iniciarPago } from "../services/paymentService";
import useMediaQuery from "../utils/changeDesk";
import { useMessageStore } from "../services/MessageModal";

export default function CarritoPage() {
  const [carrito, setCarrito] = useState({
    juegos: [],
    total: 0,
  });

  const { showMessage } = useMessageStore.getState();

  const [loading, setLoading] = useState(true);
  const [procesandoPago, setProcesandoPago] = useState(false);

  const navigate = useNavigate();

  const actualizarEstadoCarrito = (data) => {
    setCarrito({
      juegos: data?.carrito?.juegos || [],
      total: data?.carrito?.total || 0,
    });
  };

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    if (loading) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [loading]);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const data = await obtenerCarrito();
        actualizarEstadoCarrito(data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, []);

  const handleDelete = async (id) => {
    try {
      await clientAxios.delete(`/carrito/${id}`);
      const data = await obtenerCarrito();
      actualizarEstadoCarrito(data);
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  const subtotal = carrito.juegos.reduce(
    (acc, item) => acc + (item.juegoId ? item.precio || 0 : 0),
    0,
  );

  const total = subtotal;
  const descuento = 0;

  const handlePago = async () => {
    const juegosValidos = carrito.juegos.filter(
      (item) => item.juegoId !== null,
    );
    if (juegosValidos.length === 0) return;

    setProcesandoPago(true);
    try {
      const data = await iniciarPago(juegosValidos);

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        showMessage("No se pudo generar el link de pago", "error");
      }
    } catch (error) {
      showMessage("Error al procesar el pago", "error");
    } finally {
      setProcesandoPago(false);
    }
  };

  const hayJuegos = !loading && carrito.juegos.length > 0;

  return (
    <>
      {isDesktop ? (
        <></>
      ) : (
        <nav className="navbar-phone carritoNavbar">
          <img
            onClick={() => navigate(-1)}
            src={back}
            alt="volver"
            style={{ cursor: "pointer" }}
          />
          <div className="titulo_carrito">
            <p>Tu Carrito ({carrito.juegos.filter((i) => i.juegoId).length})</p>
            <p>Gestiona tus compras</p>
          </div>
          <img src={more} alt="menu" />
        </nav>
      )}

      <section className="carrito_container">
        <section className="card-carrito_section">
          {loading ? (
            <div className="loader-container">
              <div className="loader-bar">
                <span></span>
              </div>
              <p className="loader-text">CARGANDO CARRITO</p>
            </div>
          ) : carrito.juegos.length === 0 ? (
            <div className="carrito_vacio">
              <p>🛒 El carrito está vacío</p>
            </div>
          ) : (
            carrito.juegos.map((item) => {
              if (!item.juegoId) return null;

              return (
                <article key={item.juegoId._id} className="card-carrito">
                  <div className="card-carrito_imagen">
                    <img
                      src={item.juegoId.imagenPortada}
                      alt={item.juegoId.titulo}
                      onError={(e) => {
                        e.target.src = "/noimage.png";
                      }}
                    />
                  </div>

                  <div className="card-carrito_body">
                    <div className="card-carrito_body_data">
                      <h3>{item.juegoId.titulo}</h3>
                      <p>{item.juegoId.desarrolladora}</p>
                    </div>

                    <div className="card-carrito_body_data_2">
                      <div className="card-carrito_body_data_precios_sin_descuento">
                        <p>${item.precio}</p>
                      </div>

                      <div className="card-carrito_body_data_button">
                        <button onClick={() => handleDelete(item.juegoId._id)}>
                          <img src={deleteIcon} alt="eliminar" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

        {hayJuegos && (
          <div className="resumen_wrapper">
            <section className="ticket_section">
              <div className="ticket_header">
                <p>
                  <img src={compras_green} alt="" />
                  RESUMEN DEL PEDIDO
                </p>
              </div>

              <div className="ticket_body">
                <div className="subtotal-ticket">
                  <p>
                    SUBTOTAL ({carrito.juegos.filter((i) => i.juegoId).length}{" "}
                    ARTÍCULOS)
                  </p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>

                {descuento > 0 && (
                  <div className="subtotal_desc">
                    <p>
                      <img src={sell_yellow} alt="" /> Descuentos
                    </p>
                    <p>- ${descuento}</p>
                  </div>
                )}
              </div>
              <section className="container-line">
                <hr />
              </section>
              <div className="ticket_footer">
                <article className="total_importe">
                  <p>TOTAL FINAL:</p>
                  <p>${total.toFixed(2)}</p>
                </article>
              </div>
            </section>

            <section className="desc-section">
              <div className="desc-title">
                <p>
                  <img src={sell_green} alt="" /> ¿TIENES UN CÓDIGO DE
                  PROMOCIÓN?
                </p>
              </div>
              <div className="desc-codigo">
                <div>
                  <img src={cupondepago} alt="" />
                  <input
                    type="text"
                    placeholder="INGRESA EL CÓDIGO"
                    maxLength={12}
                  />
                </div>
                <button>APLICAR</button>
              </div>
            </section>

            <section className="section_pago_total">
              <button
                onClick={handlePago}
                className="boton_pago_total"
                disabled={procesandoPago || carrito.juegos.length === 0}
                style={{ opacity: procesandoPago ? 0.7 : 1 }}
              >
                <div className="boton_pago_total_precio">
                  <p>CONFIRMAR EL PAGO</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div className="boton_pago_total_proceder">
                  <p>
                    {procesandoPago ? "Procesando..." : "Proceder al Pago"}
                    {!procesandoPago && <img src={arrowLeft} alt="->" />}
                  </p>
                </div>
              </button>
            </section>
          </div>
        )}
      </section>
    </>
  );
}
