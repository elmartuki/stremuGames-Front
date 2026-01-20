import { useState } from "react";
import "../../css/navbar.css";
import lupa from "../../icons/search.svg";
import terminal from "../../icons/terminal_green.svg";
import carrito from "../../icons/shopping.svg";
import cerrar from "../../icons/close.svg";
import { useObtenerUsuario } from "../../services/obtenerUsuario";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const [openSearch, setOpenSearch] = useState(false);
  const [buscar, setBuscar] = useState("");

  const navigate = useNavigate();
  const { usuario } = useObtenerUsuario();
  const { listado } = useObtenerJuegos();

  const juegosDisponibles = listado || [];

  const listadoFiltrado = juegosDisponibles.filter((juego) => {
    return juego.titulo.toUpperCase().includes(buscar.toUpperCase());
  });

  const foto_de_perfil = usuario?.foto_de_perfil || "";
  const nombreUsuario = usuario?.nombreUsuario || "";
  const iniciales = nombreUsuario
    ? nombreUsuario.toUpperCase().slice(0, 2)
    : "";

  return (
    <>
      {!usuario ? (
        <>
          <header className="navbar_init_container">
            <nav className="navbar_init">
              <div className="logo">
                <p>
                  <img src={terminal} alt="" />
                  Stremugames
                </p>
              </div>

              <div className="links">
                {isDesktop ? (
                  <>
                    <button onClick={() => navigate("/explorar")}>
                      Explorar
                    </button>
                    <button onClick={() => navigate("/categorias")}>
                      Categorias
                    </button>
                    <button onClick={() => navigate("/comunidad")}>
                      Comunidad
                    </button>
                    <button onClick={() => navigate("/ofertas")}>
                      Ofertas
                    </button>
                  </>
                ) : (
                  <></>
                )}

                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </div>
            </nav>
          </header>
        </>
      ) : (
        <>
          {isDesktop ? (
            <>
              <header className="navbar_desk_container">
                <nav className="navbar_desk">
                  <div className="navbar_desk_logo">
                    <p>
                      <img src={terminal} alt="" />
                      StremuGames
                    </p>
                  </div>

                  <div className="navbar_desk_links">
                    <button onClick={() => navigate("/")}>
                      <img src="" alt="" />
                      Inicio
                    </button>
                    <button onClick={() => navigate("/explorar")}>
                      <img src="" alt="" />
                      Explorar
                    </button>
                    <button onClick={() => navigate("/categorias")}>
                      <img src="" alt="" />
                      Categorias
                    </button>
                    <button onClick={() => navigate("/ofertas")}>
                      <img src="" alt="" />
                      Ofertas
                    </button>
                  </div>

                  <div className="navbar_desk_perfil">
                    <div
                      className={`navbar_desk_perfil_search ${
                        openSearch ? "closed" : "open"
                      }`}
                    >
                      <div className="search">
                        <img
                          onClick={() => setOpenSearch(!openSearch)}
                          src={lupa}
                          alt="Buscar"
                        />
                        {!openSearch && (
                          <>
                            <input
                              onChange={(event) =>
                                setBuscar(event.target.value)
                              }
                              type="text"
                              placeholder="Buscar juegos..."
                              autoFocus
                            />
                            <img
                              onClick={() => {
                                setOpenSearch(!openSearch);
                                setBuscar("");
                              }}
                              src={cerrar}
                              alt="Buscar"
                            />
                          </>
                        )}
                      </div>

                      {buscar !== "" ? (
                        <section className="resultados_section">
                          <div className="resultados_finded">
                            <span>RESULTADOS RAPIDOS</span>
                            <span>
                              {listadoFiltrado.length} JUEGOS ENCONTRADOS
                            </span>
                          </div>

                          {listadoFiltrado.slice(0, 4).map((juego) => {
                            const {
                              imagenPortada,
                              titulo,
                              precioBase,
                              precioDescuento,
                              _id,
                            } = juego;

                            const porcentaje =
                              ((precioBase - precioDescuento) / precioBase) *
                              100;
                            return (
                              <article
                                key={_id}
                                className="resultado"
                                onClick={() => {
                                  navigate(`/juego/${_id}`);
                                  setBuscar("");
                                  setOpenSearch(!openSearch);
                                }}
                              >
                                <div className="resultado_imagen">
                                  <img src={imagenPortada} alt="" />
                                </div>
                                <div className="resultado_data">
                                  <p>{titulo}</p>

                                  {precioBase !== precioDescuento ? (
                                    <div>
                                      <span className="descuento">
                                        -{porcentaje.toFixed(0)}%
                                      </span>
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
                          <div className="ver_mas">
                            <p>Ver todos los resultados</p>
                          </div>
                        </section>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="navbar_desk_perfil_avatar">
                      <div className="favoritos">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="white"
                        >
                          <path d="m480-120-58-52q-101-91-167-157T150-447q-39-52-54.5-103T80-658q0-106 71-177t177-71q59 0 113 25.5T534-810q13-15 27-28t31-23.5q53-48 119-48 106 0 177 71t71 177q0 57-15.5 108T860-447q-39 52-105 118T588-172l-58 52q-11 10-25 10t-25-10Z" />
                        </svg>
                      </div>

                      <div className="perfil_info_wrapper">
                        <div className="perfil_message">
                          <p>Nos encanta verte,</p>
                          <p>{nombreUsuario}</p>
                        </div>
                        <div
                          className="perfil"
                          onClick={() => navigate("/perfil")}
                        >
                          {foto_de_perfil === "" ? (
                            <p className="iniciales">{iniciales}</p>
                          ) : (
                            <img src={foto_de_perfil} alt="User" />
                          )}
                        </div>
                      </div>

                      <button
                        className="btn-carrito"
                        onClick={() => navigate("/carrito")}
                      >
                        <img src={carrito} alt="" />
                        Carrito
                      </button>
                    </div>
                  </div>
                </nav>
              </header>
            </>
          ) : (
            <>
              <header className="navbar_phone_container">
                <nav className="navbar_phone">
                  {openSearch ? (
                    <></>
                  ) : (
                    <div className="navbar_phone_perfil">
                      <div className="perfil">
                        {foto_de_perfil === "" ? (
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
                        <img
                          onClick={() => setOpenSearch(false)}
                          src={lupa}
                          alt=""
                        />
                        <input
                          onChange={(event) => setBuscar(event.target.value)}
                          type="text"
                          placeholder="Buscar juego..."
                        />
                      </div>
                    ) : (
                      <div className="search-hidden">
                        <img
                          onClick={() => setOpenSearch(true)}
                          src={lupa}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </nav>

                {buscar !== "" ? (
                  <section className="resultados_section">
                    {listadoFiltrado.slice(0, 4).map((juego) => {
                      const {
                        imagenPortada,
                        titulo,
                        precioBase,
                        precioDescuento,
                        _id,
                      } = juego;

                      const porcentaje =
                        ((precioBase - precioDescuento) / precioBase) * 100;
                      return (
                        <article key={_id} className="resultado">
                          <div className="resultado_imagen">
                            <img src={imagenPortada} alt="" />
                          </div>
                          <div className="resultado_data">
                            <p>{titulo}</p>

                            {precioBase !== precioDescuento ? (
                              <div>
                                <span className="descuento">
                                  -{porcentaje.toFixed(0)}%
                                </span>
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
            </>
          )}
        </>
      )}
    </>
  );
}
