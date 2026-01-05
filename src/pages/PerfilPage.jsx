import "../css/perfilPage.css";
import grid_green from "../icons/grid_green.svg";
import deseados from "../icons/deseados.svg";
import JuegosDelUsuario from "../componets/perfil/JuegosDelUsuario";

export default function PerfilPage() {
  return (
    <section className="perfil_page_section">
      <div className="perfil_page_usuario">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8uf1kDLmWS85rhkZ_shhj8_5LXPA_Ax-jfg&s"
          alt=""
        />
        <p>NombreLargoXD</p>
        <p>"Descripcion de ejemplo xd, no se que poner aca pero bueno."</p>
      </div>

      <div className="perfil_page_nivel">
        <div>
          <p>22</p>
        </div>
        <div>
          <p>Nivel</p>
          <p>6.400 XP</p>
        </div>
      </div>

      <div className="perfil_page_tarjetas">
        <div>
          <img src={grid_green} alt="" />
          <p>Biblioteca</p>
          <p>Ver todos (120)</p>
        </div>
        <div>
          <img src={deseados} alt="" />

          <p>Lista de Deseados</p>
          <p>Ver todos (12)</p>
        </div>
      </div>

      <section className="listado_juegos_section">
        <p className="listado_juegos_titulo">Listado de Juegos</p>
        <section className="juegos_section">
          <JuegosDelUsuario />
        </section>
      </section>
    </section>
  );
}
