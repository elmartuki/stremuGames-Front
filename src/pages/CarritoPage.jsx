import { useEffect, useState } from "react";
import { obtenerCarrito } from "../services/obtenerCarrito";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import deleteIcon from "../icons/delete.svg";
import arrowRigth from "../icons/arrowRigth.svg";
import cupondepago from "../icons/cupondepago.svg";
import compras from "../icons/compras.svg";
import sell_yellow from "../icons/sell_yellow.svg";
import clientAxios from "../utils/clientAxios";
import "../css/carrito.css";
import { useNavigate } from "react-router-dom";
import { iniciarPago } from "../services/paymentService";

export default function CarritoPage() {
  const [carrito, setCarrito] = useState({
    juegos: [],
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [procesandoPago, setProcesandoPago] = useState(false);

  const navigate = useNavigate();

  const actualizarEstadoCarrito = (data) => {
    setCarrito({
      juegos: data?.carrito?.juegos || [],
      total: data?.carrito?.total || 0,
    });
  };

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
        alert("No se pudo generar el link de pago");
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al procesar el pago");
    } finally {
      setProcesandoPago(false);
    }
  };

  return (
    <section className="carrito_container">
      <nav className="navbar-phone">
        <img onClick={() => navigate(-1)} src={back} alt="volver" />
        <div>
          <p>Tu Carrito ({carrito.juegos.filter((i) => i.juegoId).length})</p>
          <p>Gestiona tus compras</p>
        </div>
        <img src={more} alt="menu" />
      </nav>

      <section className="card-carrito_section">
        {loading ? (
          <p className="carrito_mensaje">Cargando carrito...</p>
        ) : carrito.juegos.length === 0 ? (
          <div className="carrito_vacio">
            <p>🛒 El carrito está vacío</p>
            <button onClick={() => navigate("/")}>Explorar Juegos</button>
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

      <section className="ticket_section">
        <div className="ticket_header">
          <p>
            <img src={compras} alt="" />
            Resumen del pedido
          </p>
        </div>

        <div className="ticket_body">
          <div>
            <p>
              Subtotal ({carrito.juegos.filter((i) => i.juegoId).length}{" "}
              artículos)
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

        <div className="ticket_footer">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </section>

      <section className="desc-section">
        <div className="desc-title">
          <p>
            <img src={sell_yellow} alt="" /> ¿Tienes un código de promoción?
          </p>
        </div>
        <div className="desc-codigo">
          <div>
            <img src={cupondepago} alt="" />
            <input type="text" placeholder="Ingresa el código" />
          </div>
          <button>Aplicar</button>
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
            <p>TOTAL</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="boton_pago_total_proceder">
            <p>
              {procesandoPago ? "Procesando..." : "Proceder al Pago"}
              {!procesandoPago && <img src={arrowRigth} alt="->" />}
            </p>
          </div>
        </button>
      </section>
    </section>
  );
}
