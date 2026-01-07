import { useEffect, useState } from "react";
import { obtenerCarrito } from "../services/obtenerCarrito";
import clientAxios from "../utils/clientAxios";

export default function CarritoPage() {
  const [carrito, setCarrito] = useState({
    juegos: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);

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
      setCarrito(data.carrito);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>Mi carrito</h2>

      {loading ? (
        <p>Cargando carrito...</p>
      ) : carrito.juegos.length === 0 ? (
        <p>🛒 El carrito está vacío</p>
      ) : (
        carrito.juegos.map((item) => (
          <section key={item.juegoId._id}>
            <button onClick={() => handleDelete(item.juegoId._id)}>
              Eliminar
            </button>

            <article>
              <img src={item.juegoId.imagenPortada} alt={item.juegoId.titulo} />
              <h4>{item.juegoId.titulo}</h4>
              <p>${item.juegoId.precio}</p>
            </article>
          </section>
        ))
      )}

      <h3>Total: ${carrito.total}</h3>
    </section>
  );
}
