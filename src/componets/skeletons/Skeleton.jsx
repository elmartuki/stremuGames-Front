import React from "react";
import "../../css/skeletons.css";
import useMediaQuery from "../../utils/changeDesk";
import back from "../../icons/back_arrow.svg";
import next from "../../icons/next.svg";

export default function CarroucelSkeleton() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const skeletons = Array(3).fill(0);

  return (
    <>
      {isDesktop ? (
        <>
          <button disabled className="skeleton-nav-btn">
            <img src={back} alt="" style={{ opacity: 0.3 }} />
          </button>

          {skeletons.map((_, index) => (
            <article key={index} className="juego_card skeleton-card">
              <div className="juego_card_imagen skeleton-box image-box"></div>

              <div className="juego_card_data">
                <div className="skeleton-box text-title"></div>
                <div className="skeleton-box text-subtitle"></div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="skeleton-box text-price"></div>
                  <div className="skeleton-box text-price"></div>
                </div>

                <div className="skeleton-box button-box"></div>
              </div>
            </article>
          ))}

          <button disabled className="skeleton-nav-btn">
            <img src={next} alt="" style={{ opacity: 0.3 }} />
          </button>
        </>
      ) : (
        <>
          {skeletons.map((_, index) => (
            <article key={index} className="juego_card skeleton-card">
              <div className="juego_card_imagen skeleton-box image-box"></div>
              <div className="juego_card_data">
                <div className="skeleton-box text-title"></div>
                <div className="skeleton-box text-subtitle"></div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="skeleton-box text-price"></div>
                  <div className="skeleton-box text-price"></div>
                </div>
                <div className="skeleton-box button-box"></div>
              </div>
            </article>
          ))}
        </>
      )}
    </>
  );
}

export function CarroucelLargoSkeleton() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const skeletons = Array(5).fill(0);

  return (
    <>
      {isDesktop ? (
        <>
          <button disabled className="skeleton-nav-btn">
            <img src={back} alt="" style={{ opacity: 0.3 }} />
          </button>

          {skeletons.map((_, index) => (
            <article key={index} className="juego_card large skeleton-card">
              <div className="juego_card_imagen skeleton-box image-box"></div>

              <div className="juego_card_data">
                <div className="skeleton-box text-title"></div>
                <div className="skeleton-box text-subtitle"></div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="skeleton-box text-price"></div>
                  <div className="skeleton-box text-price"></div>
                </div>

                <div className="skeleton-box button-box"></div>
              </div>
            </article>
          ))}

          <button disabled className="skeleton-nav-btn">
            <img src={next} alt="" style={{ opacity: 0.3 }} />
          </button>
        </>
      ) : (
        <>
          {skeletons.map((_, index) => (
            <article key={index} className="juego_card large skeleton-card">
              <div className="juego_card_imagen skeleton-box image-box"></div>
              <div className="juego_card_data">
                <div className="skeleton-box text-title"></div>
                <div className="skeleton-box text-subtitle"></div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="skeleton-box text-price"></div>
                  <div className="skeleton-box text-price"></div>
                </div>
                <div className="skeleton-box button-box"></div>
              </div>
            </article>
          ))}
        </>
      )}
    </>
  );
}

export function CategoriasSkeleton() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const count = isDesktop ? 5 : 6;
  const skeletons = Array(count).fill(0);

  return (
    <section className="categorias_container_main">
      {isDesktop && (
        <button disabled className="nav_btn skeleton-nav-btn">
          <img src={back} alt="" style={{ opacity: 0.3 }} />
        </button>
      )}

      <div className="categorias_grid">
        {skeletons.map((_, index) => (
          <article
            key={index}
            className="categoria_card skeleton-card category"
          >
            <div className="skeleton-box icon-box"></div>

            <div className="categoria_textos">
              <div className="skeleton-box text-title"></div>

              <div className="skeleton-box text-subtitle"></div>
            </div>
          </article>
        ))}
      </div>

      {isDesktop && (
        <button disabled className="nav_btn skeleton-nav-btn">
          <img src={next} alt="" style={{ opacity: 0.3 }} />
        </button>
      )}
    </section>
  );
}

export function CategoriaSkeleton() {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <article key={index} className="juegos skeleton-card">
          <div className="juegos_imagen">
            <div
              className="skeleton-box image-box"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            ></div>
          </div>

          <div className="juegos_data">
            <div
              className="skeleton-box text-title"
              style={{ width: "80%", marginBottom: "5px" }}
            ></div>
            <div
              className="skeleton-box text-subtitle"
              style={{ width: "60%" }}
            ></div>

            <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
              <div className="skeleton-box text-price"></div>
              <div className="skeleton-box text-price"></div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}

export function ComunidadSkeleton() {
  const fakeEmpresas = Array(3).fill(0);
  const fakeJugadores = Array(8).fill(0);

  return (
    <section className="comunidad-page">
      <section className="comunidad-body">
        <div className="comunidad_hero skeleton-hero-container">
          <div className="skeleton-box title-box"></div>

          <div className="search-box skeleton-search"></div>

          <div className="filtros">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="skeleton-box filter-btn-box"></div>
              ))}
          </div>
        </div>

        <section className="seccion_1">
          <div className="seccion_1_header">
            <div className="skeleton-box header-text-box"></div>
          </div>

          <div className="empresas_container">
            {fakeEmpresas.map((_, index) => (
              <div key={index} className="empresa-card skeleton-card">
                <div className="empresa_icon">
                  <div className="skeleton-box banner-box"></div>

                  <div className="empresa_perfil">
                    <div className="empresa_perfil_container">
                      <div className="skeleton-box avatar-circle-small"></div>
                      <div className="empresa_info" style={{ width: "100%" }}>
                        <div
                          className="skeleton-box text-line"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="empresa_info_container">
                  <div
                    className="skeleton-box text-line"
                    style={{ width: "40%" }}
                  ></div>
                  <div className="skeleton-box button-small"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="seccion_1 players_section_spacing">
          <div className="seccion_1_header">
            <div className="skeleton-box header-text-box"></div>
          </div>

          <div className="usuarios_container">
            {fakeJugadores.map((_, index) => (
              <div key={index} className="usuario_card skeleton-card">
                <div className="usuario_avatar">
                  <div className="skeleton-box avatar-circle-large"></div>
                </div>

                <div className="skeleton-box text-title-center"></div>

                <div className="btn_container">
                  <div className="skeleton-box btn-block"></div>
                  <div className="skeleton-box btn-block"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}

export function PerfilEmpresaSkeleton() {
  const fakeCatalogo = Array(6).fill(0);

  return (
    <div className="perfil_container_main skeleton-wrapper">
      <aside className="perfil_sidebar">
        <div className="sidebar_card skeleton-card-base">
          <div className="perfil_top">
            <div className="perfil_img_box skeleton-box"></div>
          </div>

          <div className="perfil_textos">
            <div
              className="skeleton-box title-box"
              style={{ width: "70%", height: "28px", marginBottom: "10px" }}
            ></div>
            <div
              className="skeleton-box subtitle-box"
              style={{ width: "40%", height: "16px", marginBottom: "20px" }}
            ></div>

            <div className="stats_flex">
              <div className="stat_box">
                <div
                  className="skeleton-box"
                  style={{ width: "40px", height: "20px", marginBottom: "5px" }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "60px", height: "12px" }}
                ></div>
              </div>
              <div className="stat_divider"></div>
              <div className="stat_box">
                <div
                  className="skeleton-box"
                  style={{ width: "40px", height: "20px", marginBottom: "5px" }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "60px", height: "12px" }}
                ></div>
              </div>
            </div>

            <div
              className="skeleton-box text-line"
              style={{ width: "100%", marginBottom: "8px" }}
            ></div>
            <div
              className="skeleton-box text-line"
              style={{ width: "90%", marginBottom: "8px" }}
            ></div>
            <div
              className="skeleton-box text-line"
              style={{ width: "60%", marginBottom: "25px" }}
            ></div>

            <div className="botones_accion">
              <div
                className="skeleton-box btn-block"
                style={{ height: "45px" }}
              ></div>
              <div
                className="skeleton-box btn-block"
                style={{ height: "45px" }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      <main className="perfil_contenido">
        <section className="seccion_bloque">
          <div
            className="skeleton-box title-section"
            style={{ width: "200px", height: "24px", marginBottom: "15px" }}
          ></div>

          <div className="banner_destacado skeleton-banner">
            <div
              className="skeleton-banner-content"
              style={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              <div
                className="skeleton-box"
                style={{ width: "120px", height: "20px", marginBottom: "10px" }}
              ></div>
              <div
                className="skeleton-box"
                style={{ width: "60%", height: "40px", marginBottom: "10px" }}
              ></div>
              <div
                className="skeleton-box"
                style={{ width: "40%", height: "16px", marginBottom: "20px" }}
              ></div>
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <div
                  className="skeleton-box"
                  style={{
                    width: "140px",
                    height: "40px",
                    borderRadius: "6px",
                  }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "60px", height: "24px" }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section className="seccion_bloque">
          <div
            className="skeleton-box title-section"
            style={{ width: "180px", height: "24px", marginBottom: "15px" }}
          ></div>

          <div className="flex_catalogo">
            {fakeCatalogo.map((_, index) => (
              <article className="card_mini skeleton-card-mini" key={index}>
                <div
                  className="card_img skeleton-box"
                  style={{ borderRadius: "0" }}
                ></div>

                <div className="card_info">
                  <div
                    className="skeleton-box"
                    style={{
                      width: "80%",
                      height: "18px",
                      marginBottom: "8px",
                    }}
                  ></div>
                  <div
                    className="skeleton-box"
                    style={{
                      width: "50%",
                      height: "12px",
                      marginBottom: "auto",
                    }}
                  ></div>

                  <div className="card_bottom" style={{ marginTop: "15px" }}>
                    <div
                      className="skeleton-box"
                      style={{ width: "40px", height: "16px" }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function PerfilPageSkeleton() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const fakeJuegos = Array(10).fill(0);

  return (
    <section className="perfil_page_section skeleton-wrapper">
      <section className="perfil">
        <div
          className="fondo_de_perfil skeleton-box"
          style={{ backgroundColor: "#1a1a1a" }}
        ></div>

        <div className="perfil_page_usuario">
          <div
            className="skeleton-box"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "15px",
            }}
          ></div>

          <div
            className="skeleton-box"
            style={{ width: "150px", height: "24px", marginBottom: "10px" }}
          ></div>

          <div
            className="skeleton-box"
            style={{ width: "250px", height: "16px", opacity: 0.6 }}
          ></div>
        </div>

        <div className="perfil_page_nivel">
          <div
            className="nivel_tag skeleton-box"
            style={{ border: "none" }}
          ></div>

          <div className="var_progress_container">
            <div className="datos" style={{ marginBottom: "5px" }}>
              <div
                className="skeleton-box"
                style={{ width: "60px", height: "14px" }}
              ></div>
              <div
                className="skeleton-box"
                style={{ width: "80px", height: "14px" }}
              ></div>
            </div>

            <div
              className="var_progress skeleton-box"
              style={{ backgroundColor: "#282828", overflow: "hidden" }}
            >
              <div className="barra" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>

        <div className="perfil_page_tarjetas">
          <div className="card_links skeleton-card-base">
            <div
              className="skeleton-box"
              style={{ width: "40px", height: "40px", borderRadius: "8px" }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flexGrow: 1,
              }}
            >
              <div
                className="skeleton-box"
                style={{ width: "80px", height: "18px" }}
              ></div>
              <div
                className="skeleton-box"
                style={{ width: "100px", height: "14px", opacity: 0.6 }}
              ></div>
            </div>
            {isDesktop && (
              <div
                className="skeleton-box"
                style={{ width: "24px", height: "24px", marginLeft: "auto" }}
              ></div>
            )}
          </div>

          <div className="card_links skeleton-card-base">
            <div
              className="skeleton-box"
              style={{ width: "40px", height: "40px", borderRadius: "8px" }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flexGrow: 1,
              }}
            >
              <div
                className="skeleton-box"
                style={{ width: "100px", height: "18px" }}
              ></div>
              <div
                className="skeleton-box"
                style={{ width: "80px", height: "14px", opacity: 0.6 }}
              ></div>
            </div>
            {isDesktop && (
              <div
                className="skeleton-box"
                style={{ width: "24px", height: "24px", marginLeft: "auto" }}
              ></div>
            )}
          </div>
        </div>
      </section>

      <section className="listado_juegos_section">
        <div
          className="listado_juegos_titulo"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div
            className="skeleton-box"
            style={{ width: "30px", height: "30px" }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: "150px", height: "24px" }}
          ></div>
        </div>
      </section>
    </section>
  );
}

export const JuegosDelUsuarioSkeleton = () => {
  const skeletonArray = Array(4).fill(0);

  return (
    <>
      {skeletonArray.map((_, index) => (
        <article key={index} className="juego_tarjeta skeleton_wrapper">
          <div className="skeleton_img skeleton_anim"></div>

          <div className="skeleton_info">
            <div className="skeleton_text title skeleton_anim"></div>
            <div className="skeleton_text developer skeleton_anim"></div>
          </div>
        </article>
      ))}
    </>
  );
};
