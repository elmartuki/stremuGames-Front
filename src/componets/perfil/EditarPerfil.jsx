import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../css/editarPerfil.css";
import back from "../../icons/back.svg";
import more from "../../icons/more.svg";
import checkIcon from "../../icons/save.svg";
import editIcon from "../../icons/edit.svg";
import { useObtenerUsuario } from "../../services/obtenerUsuario";
import { useSubirImagen } from "../../services/uploadImages";
import clientAxios from "../../utils/clientAxios";
import { useMessageStore } from "../../services/MessageModal";
import { useObtenerJuegos } from "../../services/obtenerJuegos";
import useMediaQuery from "../../utils/changeDesk";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { listado } = useObtenerJuegos();
  const { usuario } = useObtenerUsuario();
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const { subirImagen, imagenPreview, imagenUrl, subiendo } = useSubirImagen();

  const [currentIndex, setCurrentIndex] = useState(0);
  const juegosCarrusel = listado?.slice(0, 6) || [];

  const [data, setData] = useState({
    nombreUsuario: "",
    biografia: "",
  });

  useEffect(() => {
    if (juegosCarrusel.length > 0) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === juegosCarrusel.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, juegosCarrusel.length]);

  const handleEditClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!usuario) return;

    const datosParaEnviar = {
      foto_de_perfil: imagenUrl || usuario.foto_de_perfil,
      nombreUsuario: data.nombreUsuario || usuario.nombreUsuario,
      biografia: data.biografia || usuario.biografia,
    };

    try {
      const { showMessage } = useMessageStore.getState();
      const response = await clientAxios.put(
        `/usuarios/${usuario._id}`,
        datosParaEnviar
      );
      showMessage(response.data.message, "success");

      if (response.status === 200) {
        navigate("/perfil");
      }
    } catch (error) {
      const { showMessage } = useMessageStore.getState();
      showMessage(
        error.response?.data?.message || "Error al actualizar",
        "error"
      );
    }
  };

  if (!usuario) {
    return <div className="loading">Cargando datos...</div>;
  }

  const iniciales = usuario.nombreUsuario?.toUpperCase().slice(0, 2);
  const imagenFinal = imagenPreview || imagenUrl || usuario.foto_de_perfil;

  return (
    <section className="editar_perfil_section">
      {isDesktop ? (
        <></>
      ) : (
        <nav className="navbar-phone">
          <img onClick={() => navigate(-1)} src={back} alt="Atrás" />
          <div>
            <p>Editar perfil</p>
            <p>Modifica tu usuario o biografia.</p>
          </div>
          <img src={more} alt="Más" />
        </nav>
      )}

      <section className="flex-50">
        <section className="perfil_config_carroucel">
          <div className="carroucel_container">
            {juegosCarrusel.length > 0 ? (
              <article
                style={{
                  backgroundImage: `url("${juegosCarrusel[currentIndex].imagenPortada}")`,
                }}
                className="carroucel_active_item"
                onClick={() =>
                  navigate(`/juego/${juegosCarrusel[currentIndex]._id}`)
                }
              ></article>
            ) : (
              <p className="loading_text">Cargando juegos...</p>
            )}

            <div className="carroucel_dots">
              {juegosCarrusel.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="perfil_config">
          <section className="perfil_config_header">
            <div className="perfil_config_header_data">
              <div className="perfil_config_header_imagen_wrapper">
                <div className="perfil_config_header_imagen">
                  {imagenFinal ? (
                    <img
                      src={imagenFinal}
                      alt="Perfil"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <p>{iniciales}</p>
                  )}

                  <div className="boton_editar_foto" onClick={handleEditClick}>
                    <img src={editIcon} alt="Editar" />
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => subirImagen(e.target.files[0])}
                />
                {subiendo && (
                  <p style={{ fontSize: "12px", color: "gray" }}>Subiendo...</p>
                )}
              </div>
            </div>
          </section>

          <section className="perfil_config_body">
            <label>Nombre de usuario</label>
            <div className="column_input">
              <input
                type="text"
                defaultValue={usuario.nombreUsuario}
                onChange={(event) => {
                  setData({ ...data, nombreUsuario: event.target.value });
                }}
                placeholder="Tu nombre"
              />
            </div>

            <div className="column_input">
              <label>Biografía</label>
              <textarea
                onChange={(event) =>
                  setData({ ...data, biografia: event.target.value })
                }
                defaultValue={usuario.biografia}
                placeholder="Cuéntanos sobre ti..."
                rows="3"
              />
            </div>
          </section>

          <section className="perfil_editar_footer">
            <button
              className="btn_guardar"
              disabled={subiendo}
              onClick={handleSubmit}
            >
              <img src={checkIcon} alt="Guardar" />
              {subiendo ? "Subiendo imagen..." : "Guardar Cambios"}
            </button>
            <button
              className="btn_cancelar"
              onClick={() => navigate("/perfil")}
            >
              Cancelar
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
