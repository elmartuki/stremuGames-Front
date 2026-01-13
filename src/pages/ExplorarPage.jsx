import Carroucel from "../componets/explorar/Carroucel";
import CarroucelLargo from "../componets/explorar/CarroucelLargo";
import Categorias from "../componets/explorar/Categorias";
import HeroJuegos from "../componets/explorar/HeroJuegos";
import "../css/explorarPage.css";
import rigth_green from "../icons/rigth_green.svg";
import search from "../icons/search.svg";
import timer from "../icons/timer.svg";
import useMediaQuery from "../utils/changeDesk";

export default function ExplorarPage() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return (
    <section className="explorar_page_section">
      <section className="explorar_hero">
        <HeroJuegos filtrar={"Populares"} />
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div>
            <p>
              Cuenta regresiva <img src={timer} alt="" />
            </p>
            <p>Finaliza el 7/1</p>
          </div>

          <div>
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <>
            <section className="carroucel_section carroucel_section_desk">
              <Carroucel />
            </section>
          </>
        ) : (
          <>
            <section className="carroucel_section">
              <Carroucel />
            </section>
          </>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div>
            <p>Juegos Populares</p>
            <p>Los juegos en tendencias</p>
          </div>

          <div>
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section className="carroucel_section carroucel_section_desk">
            <CarroucelLargo filtrar={"Populares"} />
          </section>
        ) : (
          <section className="carroucel_section">
            <CarroucelLargo filtrar={"Populares"} />
          </section>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div>
            <p>Agregados Recientemente</p>
            <p>Novedades en stremu</p>
          </div>

          <div>
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section className="carroucel_section carroucel_section_desk">
            <CarroucelLargo filtrar={"Recientes"} />
          </section>
        ) : (
          <section className="carroucel_section">
            <CarroucelLargo filtrar={"Recientes"} />
          </section>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div>
            <p>Carreras</p>
            <p>Descubre todos los juegos de Carreras</p>
          </div>

          <div>
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section className="carroucel_section carroucel_section_desk">
            <CarroucelLargo filtrar={"Carreras"} />
          </section>
        ) : (
          <section className="carroucel_section">
            <CarroucelLargo filtrar={"Carreras"} />
          </section>
        )}
      </section>

      <section className="explorar_carroucel">
        <div className="explorar_carroucel_header">
          <div>
            <p>Terror</p>
            <p>Descubre todos los juegos de terror</p>
          </div>

          <div>
            <p>
              Ver todo <img src={rigth_green} alt="" />
            </p>
          </div>
        </div>

        {isDesktop ? (
          <section className="carroucel_section carroucel_section_desk">
            <CarroucelLargo filtrar={"Terror"} />
          </section>
        ) : (
          <section className="carroucel_section">
            <CarroucelLargo filtrar={"Terror"} />
          </section>
        )}
      </section>

      <p className="explorar_page_titulo">Categorias Populares</p>

      {isDesktop ? (
        <section className="categorias_section categorias_section_desk">
          <Categorias />
        </section>
      ) : (
        <section className="categorias_section">
          <Categorias />
        </section>
      )}
    </section>
  );
}
