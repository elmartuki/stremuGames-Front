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
