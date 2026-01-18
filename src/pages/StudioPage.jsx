import ListadoDeJuegos from "../componets/partners/ListadoDeJuegos";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import "../css/parthnerPage.css";
import { useNavigate } from "react-router-dom";

export default function StudioPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="parthnerPage_section">
        <nav className="navbar-phone">
          <img onClick={navigate(-1)} src={back} alt="" />
          <div>
            <p>Panel de desarrollador</p>
            <p>Gestiona tus juegos.</p>
          </div>

          <img src={more} alt="" />
        </nav>

        <div className="btn-crear">
          <button onClick={() => navigate("/studio-panel/crear-juego/")}>
            Subir nuevo juego
          </button>
        </div>

        <p className="titulo">Mis juegos publicados</p>
        <section className="listadoJuegos_section">
          <ListadoDeJuegos />
        </section>
      </section>
    </>
  );
}
