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

export default function CarritoPage() {
  const [carrito, setCarrito] = useState({
    juegos: [],
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const data = await obtenerCarrito();

        setCarrito({
          juegos: data?.carrito?.juegos || [],
          total: data?.carrito?.total || 0,
        });
      } catch (error) {
        console.log(error);
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

      setCarrito({
        juegos: data?.carrito?.juegos || [],
        total: data?.carrito?.total || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = carrito.juegos.reduce((acc, item) => {
    return acc + (item.juegoId?.precioBase || 0);
  }, 0);

  const total = carrito.juegos.reduce((acc, item) => {
    return (
      acc + (item.juegoId?.precioDescuento ?? item.juegoId?.precioBase ?? 0)
    );
  }, 0);

  const descuento = subtotal - total;

  return (
    <section className="carrito_container">
      <nav className="navbar-phone">
        <img onClick={() => navigate(-1)} src={back} alt="volver" />
        <div>
          <p>Tu Carrito ({carrito.juegos.length})</p>
          <p>Tu carrito de compras</p>
        </div>
        <img src={more} alt="menu" />
      </nav>

      <section className="card-carrito_section">
        {loading ? (
          <p>Cargando carrito...</p>
        ) : carrito.juegos.length === 0 ? (
          <p>🛒 El carrito está vacío</p>
        ) : (
          carrito.juegos.map((item) => (
            <article key={item.juegoId._id} className="card-carrito">
              <div className="card-carrito_imagen">
                <img
                  src={item.juegoId.imagenPortada}
                  alt={item.juegoId.titulo}
                />
              </div>

              <div className="card-carrito_body">
                <div className="card-carrito_body_data">
                  <h3>{item.juegoId.titulo}</h3>
                  <p>{item.juegoId.desarrolladora}</p>
                </div>

                <div className="card-carrito_body_data_2">
                  {item.juegoId.precioBase !== item.juegoId.precioDescuento ? (
                    <div className="card-carrito_body_data_precios">
                      <p>${item.juegoId.precioBase}</p>
                      <p>${item.juegoId.precioDescuento}</p>
                    </div>
                  ) : (
                    <div className="card-carrito_body_data_precios_sin_descuento">
                      <p>${item.juegoId.precioBase}</p>
                    </div>
                  )}

                  <div className="card-carrito_body_data_button">
                    <button onClick={() => handleDelete(item.juegoId._id)}>
                      <img src={deleteIcon} alt="eliminar" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
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
              Subtotal ({carrito.juegos.length}{" "}
              {carrito.juegos.length === 1 ? "artículo" : "artículos"})
            </p>
            <p>${subtotal}</p>
          </div>

          {descuento > 0 && (
            <div className="subtotal_desc">
              <p>
                <img src={sell_yellow} alt="" />
                Descuentos
              </p>
              <p>- ${descuento}</p>
            </div>
          )}
        </div>

        <div className="ticket_footer">
          <h3>Total: ${total}</h3>
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
        <button className="boton_pago_total">
          <div className="boton_pago_total_precio">
            <p>TOTAL</p>
            <p>${total}</p>
          </div>
          <div className="boton_pago_total_proceder">
            <p>
              Proceder al Pago{" "}
              <img src={arrowRigth} alt="flecha a la derecha" />
            </p>
          </div>
        </button>
      </section>
    </section>
  );
}
