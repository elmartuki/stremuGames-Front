import Carroucel from "../componets/explorar/Carroucel";
import CarroucelLargo from "../componets/explorar/CarroucelLargo";
import Categorias from "../componets/explorar/Categorias";
import "../css/explorarPage.css";
import rigth_green from "../icons/rigth_green.svg";
import search from "../icons/search.svg";
import timer from "../icons/timer.svg";

export default function ExplorarPage() {
  return (
    <section className="explorar_page_section">
      <div className="explorar_page_search">
        <div>
          <img src={search} alt="" />
          <input type="text" placeholder="Buscar juegos, dlc y mas..." />
        </div>
      </div>

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

        <section className="carroucel_section">
          <Carroucel />
        </section>
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

        <section className="carroucel_section">
          <CarroucelLargo />
        </section>

        <section className="categorias_section">
          <Categorias />
        </section>
      </section>
    </section>
  );
}
