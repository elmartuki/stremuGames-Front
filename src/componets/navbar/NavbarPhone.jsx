import { useState } from "react";
import "../../css/navbar.css";
import lupa from "../../icons/search.svg";
import { useObtenerUsuario } from "../../services/obtenerUsuario";
import { useObtenerJuegos } from "../../services/obtenerJuegos";

export default function NavbarPhone() {
  const [openSearch, setOpenSearch] = useState(false);
  const [buscar, setBuscar] = useState("");

  const { usuario } = useObtenerUsuario();

  const { listado } = useObtenerJuegos();

  if (!listado) return null;

  const listadoFiltrado = listado.filter((juego) => {
    return juego.titulo.toUpperCase().includes(buscar.toUpperCase());
  });

  if (!usuario) return <></>;

  const { foto_de_perfil, nombreUsuario } = usuario;

  const iniciales = nombreUsuario.toUpperCase().slice(0, 2);

  return (
    <header className="navbar_phone_container">
      <nav className="navbar_phone">
        {openSearch ? (
          <></>
        ) : (
          <div className="navbar_phone_perfil">
            <div className="perfil">
              {foto_de_perfil !== "" ? (
                <p className="iniciales">{iniciales}</p>
              ) : (
                <img src={foto_de_perfil} alt="" />
              )}
            </div>
            <div className="perfil_message">
              <p>Nos encanta verte,</p>
              <p>{nombreUsuario}</p>
            </div>
          </div>
        )}

        <div
          style={{ width: openSearch ? "100%" : "60%" }}
          className="navbar_phone_search"
        >
          {openSearch ? (
            <div className="search_show">
              <img onClick={() => setOpenSearch(false)} src={lupa} alt="" />
              <input
                onChange={(event) => setBuscar(event.target.value)}
                type="text"
                placeholder="Buscar juego..."
              />
            </div>
          ) : (
            <div className="search-hidden">
              <img onClick={() => setOpenSearch(true)} src={lupa} alt="" />
            </div>
          )}
        </div>
      </nav>

      {buscar !== "" ? (
        <section className="resultados_section">
          {listadoFiltrado.slice(0, 4).map((juego) => {
            console.log(juego);
            const { imagenPortada, titulo, precioBase, precioDescuento } =
              juego;

            const porcentaje =
              ((precioBase - precioDescuento) / precioBase) * 100;
            return (
              <article className="resultado">
                <div className="resultado_imagen">
                  <img src={imagenPortada} alt="" />
                </div>
                <div className="resultado_data">
                  <p>{titulo}</p>

                  {precioBase !== precioDescuento ? (
                    <div>
                      <span className="descuento">-{porcentaje}%</span>
                      <span>${precioDescuento}</span>
                      <span>${precioBase}</span>
                    </div>
                  ) : (
                    <div>
                      <span>${precioBase}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <></>
      )}
    </header>
  );
}
