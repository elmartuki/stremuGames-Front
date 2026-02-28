import React, { useState, useEffect, useRef } from "react";
import "../../css/navbar.css";
import lupa from "../../icons/search.svg";
import terminal from "../../icons/terminal_green.svg";
import carrito from "../../icons/shopping.svg";
import cerrar from "../../icons/close.svg";
import noImage from "../../icons/noimage.png";

import { useObtenerUsuario } from "../../services/obtenerUsuario";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";
import { useNavigate, useLocation } from "react-router-dom";
import { useObtenerToken } from "../../services/obtenerToken";

export default function NavBar() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const [openSearch, setOpenSearch] = useState(false);
  const [buscar, setBuscar] = useState("");

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { usuarioInfo } = useObtenerToken();
  const { usuario } = useObtenerUsuario();
  const { listado } = useObtenerJuegos();

  const rolFinal = usuarioInfo?.rol || usuario?.rol;

  const listadoFiltrado = (listado || []).filter((juego) =>
    juego.titulo.toUpperCase().includes(buscar.toUpperCase()),
  );

  const nombreUsuario = usuario?.nombreUsuario || "";
  const foto_de_perfil = usuario?.foto_de_perfil || "";
  const iniciales = nombreUsuario
    ? nombreUsuario.toUpperCase().slice(0, 2)
    : "";

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        setBuscar("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const opcionesUser = [
    { titulo: "Explorar", ruta: "/explorar" },
    { titulo: "Ofertas", ruta: "/categorias/ofertas" },
    { titulo: "Categorías", ruta: "/categorias" },
    { titulo: "Comunidad", ruta: "/comunidad" },
  ];

  const opcionesEmpresa = [
    { titulo: "Explorar", ruta: "/explorar" },
    { titulo: "Comunidad", ruta: "/comunidad" },
    { titulo: "Studio Panel", ruta: "/studio-panel" },
  ];

  const opcionesAdmin = [
    { titulo: "Explorar", ruta: "/explorar" },
    { titulo: "Comunidad", ruta: "/comunidad" },
    { titulo: "Admin Panel", ruta: "/admin-panel" },
  ];

  const opcionesInvitado = [
    { titulo: "Explorar", ruta: "/explorar" },
    { titulo: "Categorías", ruta: "/categorias" },
    { titulo: "Comunidad", ruta: "/comunidad" },
  ];

  let opcionesAMostrar;
  if (rolFinal === "admin") opcionesAMostrar = opcionesAdmin;
  else if (rolFinal === "empresa") opcionesAMostrar = opcionesEmpresa;
  else if (rolFinal === "user") opcionesAMostrar = opcionesUser;
  else opcionesAMostrar = opcionesInvitado;

  return (
    <>
      {!usuario ? (
        <header className="navbar_init_container">
          <nav className="navbar_init">
            <div className="logo" onClick={() => navigate("/")}>
              <svg
                width="150px"
                viewBox="0 0 650 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100%" height="100%" fill="transparent" />

                <g transform="skewX(-15)">
                  <text
                    x="15"
                    y="90"
                    fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
                    fontWeight="900"
                    fontSize="90"
                    textLength="100%"
                    lengthAdjust="spacingAndGlyphs"
                  >
                    <tspan fill="#FFFFFF">STREMU</tspan>
                    <tspan fill="#55FF00">GAMES</tspan>
                  </text>
                </g>

                <rect
                  x="255"
                  y="105"
                  width="140"
                  height="5"
                  fill="#55FF00"
                  rx="2"
                />
              </svg>
            </div>
            <div className="links">
              {isDesktop &&
                opcionesAMostrar.map((op, i) => (
                  <button
                    key={i}
                    className={isActive(op.ruta)}
                    onClick={() => navigate(op.ruta)}
                  >
                    {op.titulo}
                  </button>
                ))}
              <button className="btn-login" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          </nav>
        </header>
      ) : (
        <>
          {isDesktop ? (
            <header className="navbar_desk_container">
              <nav className="navbar_desk">
                <div
                  className="navbar_desk_logo"
                  onClick={() => navigate("/explorar")}
                >
                  <svg
                    width="150px"
                    viewBox="0 0 650 120"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="100%" height="100%" fill="transparent" />

                    <g transform="skewX(-15)">
                      <text
                        x="15"
                        y="90"
                        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
                        fontWeight="900"
                        fontSize="90"
                        textLength="100%"
                        lengthAdjust="spacingAndGlyphs"
                      >
                        <tspan fill="#FFFFFF">STREMU</tspan>
                        <tspan fill="#55FF00">GAMES</tspan>
                      </text>
                    </g>

                    <rect
                      x="255"
                      y="105"
                      width="140"
                      height="5"
                      fill="#55FF00"
                      rx="2"
                    />
                  </svg>
                </div>

                <div className="navbar_desk_links">
                  {opcionesAMostrar.map((op, i) => (
                    <button
                      key={i}
                      className={isActive(op.ruta)}
                      onClick={() => navigate(op.ruta)}
                    >
                      {op.titulo}
                    </button>
                  ))}
                </div>

                <div className="navbar_desk_perfil">
                  <div
                    ref={searchRef}
                    className={`navbar_desk_perfil_search ${openSearch ? "open" : "closed"}`}
                  >
                    <div className="search">
                      <img
                        onClick={() => setOpenSearch(!openSearch)}
                        src={lupa}
                        alt="Buscar"
                      />
                      {openSearch && (
                        <>
                          <input
                            onChange={(e) => setBuscar(e.target.value)}
                            value={buscar}
                            type="text"
                            placeholder="Buscar juegos..."
                            autoFocus
                          />
                          <img
                            onClick={() => {
                              setOpenSearch(false);
                              setBuscar("");
                            }}
                            src={cerrar}
                            alt="Cerrar"
                          />
                        </>
                      )}
                    </div>

                    {buscar !== "" && openSearch && (
                      <section className="resultados_section">
                        <div className="resultados_finded">
                          <span>RESULTADOS RÁPIDOS</span>
                          <span>{listadoFiltrado.length} ENCONTRADOS</span>
                        </div>
                        {listadoFiltrado.slice(0, 4).map((juego) => {
                          const porcentaje =
                            ((juego.precioBase - juego.precioDescuento) /
                              juego.precioBase) *
                            100;
                          return (
                            <article
                              key={juego._id}
                              className="resultado"
                              onClick={() => {
                                navigate(`/juego/${juego.slug}`);
                                setBuscar("");
                                setOpenSearch(false);
                              }}
                            >
                              <div className="resultado_imagen">
                                <img
                                  src={juego.imagenPortada || noImage}
                                  alt={juego.titulo}
                                />
                              </div>
                              <div className="resultado_data">
                                <p>{juego.titulo}</p>
                                {juego.precioDescuento < juego.precioBase ? (
                                  <>
                                    <div className="precios_container">
                                      <span className="descuento">
                                        - {porcentaje.toFixed()}%
                                      </span>
                                      <span className="precio_base">
                                        ${juego.precioBase}
                                      </span>
                                      <span className="precio_desscuento">
                                        ${juego.precioDescuento}
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="precios_container">
                                      <span className="precio_descuento">
                                        ${juego.precioBase}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </section>
                    )}
                  </div>

                  <div className="navbar_desk_perfil_avatar">
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
                    {rolFinal === "user" && (
                      <button
                        className="btn-carrito"
                        onClick={() => navigate("/carrito")}
                      >
                        <img src={carrito} alt="" /> Carrito
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </header>
          ) : (
            <header className="navbar_phone_container">
              <nav className="navbar_phone" ref={searchRef}>
                {!openSearch && (
                  <div className="navbar_phone_perfil">
                    <div className="perfil" onClick={() => navigate("/perfil")}>
                      {foto_de_perfil === "" ? (
                        <p className="iniciales">{iniciales}</p>
                      ) : (
                        <img src={foto_de_perfil} alt="" />
                      )}
                    </div>
                    <div className="message_container">
                      <p>Nos encanta verte,</p>
                      <p>{nombreUsuario}</p>
                    </div>
                  </div>
                )}
                <div
                  style={{ width: openSearch ? "100%" : "auto" }}
                  className="navbar_phone_search"
                >
                  {openSearch ? (
                    <div className="search_show">
                      <img src={lupa} alt="" />
                      <input
                        onChange={(e) => setBuscar(e.target.value)}
                        value={buscar}
                        type="text"
                        placeholder="Buscar..."
                        autoFocus
                      />
                      <img
                        onClick={() => {
                          setOpenSearch(false);
                          setBuscar("");
                        }}
                        src={cerrar}
                        alt="Cerrar"
                      />

                      {buscar !== "" && (
                        <section className="resultados_section">
                          <div className="resultados_finded">
                            <span>{listadoFiltrado.length} ENCONTRADOS</span>
                          </div>
                          {listadoFiltrado.slice(0, 5).map((juego) => {
                            const porcentaje =
                              ((juego.precioBase - juego.precioDescuento) /
                                juego.precioBase) *
                              100;
                            return (
                              <article
                                key={juego._id}
                                className="resultado"
                                onClick={() => {
                                  navigate(`/juego/${juego.slug}`);
                                  setBuscar("");
                                  setOpenSearch(false);
                                }}
                              >
                                <div className="resultado_imagen">
                                  <img
                                    src={juego.imagenPortada || noImage}
                                    alt={juego.titulo}
                                  />
                                </div>
                                <div className="resultado_data">
                                  <p>{juego.titulo}</p>
                                  {juego.precioDescuento < juego.precioBase ? (
                                    <>
                                      <div className="precios_container">
                                        <span className="descuento">
                                          - {porcentaje.toFixed()}%
                                        </span>
                                        <span className="precio_base">
                                          ${juego.precioBase}
                                        </span>
                                        <span className="precio_desscuento">
                                          ${juego.precioDescuento}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="precios_container">
                                        <span className="precio_descuento">
                                          ${juego.precioBase}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </article>
                            );
                          })}
                        </section>
                      )}
                    </div>
                  ) : (
                    <img
                      onClick={() => setOpenSearch(true)}
                      src={lupa}
                      alt="Buscar"
                    />
                  )}
                </div>
              </nav>
            </header>
          )}
        </>
      )}
    </>
  );
}
