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
import useMediaQuery from "../../utils/changeDesk";

const imagenesDecorativas = [
  "https://i0.wp.com/www.pcmrace.com/wp-content/uploads/2019/10/nTm7kHj.jpg",
  "https://www.10wallpaper.com/wallpaper/3840x2160/1803/Rainbow_Six_Siege_4K_Ultra_HD_Game_3840x2160.jpg",
  "https://getwallpapers.com/wallpaper/full/7/5/b/198398.jpg",
  "https://cdn.wallpapersafari.com/75/1/uHOW5n.jpg",
  "https://img.somosxbox.com/somosxbox/2024/07/23104727/halo-4-1.jpg",
];

export default function EditarPerfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const { usuario } = useObtenerUsuario();
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const {
    subirImagen: subirPerfil,
    imagenPreview: previewPerfil,
    imagenUrl: urlPerfil,
    subiendo: subiendoPerfil,
  } = useSubirImagen();

  const {
    subirImagen: subirBg,
    imagenPreview: previewBg,
    imagenUrl: urlBg,
    subiendo: subiendoBg,
  } = useSubirImagen();

  const [data, setData] = useState({
    nombreUsuario: "",
    biografia: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagenesDecorativas.length - 1 ? 0 : prevIndex + 1,
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleEditClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleBgClick = () => {
    if (bgInputRef.current) bgInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!usuario) return;

    const datosParaEnviar = {
      foto_de_perfil: urlPerfil || usuario.foto_de_perfil,
      foto_banner: urlBg || usuario.foto_banner,
      nombreUsuario: data.nombreUsuario || usuario.nombreUsuario,
      biografia: data.biografia || usuario.biografia,
    };

    try {
      const { showMessage } = useMessageStore.getState();
      const response = await clientAxios.put(
        `/usuarios/${usuario._id}`,
        datosParaEnviar,
      );
      showMessage(response.data.message, "success");

      if (response.status === 200) {
        navigate("/perfil");
      }
    } catch (error) {
      const { showMessage } = useMessageStore.getState();
      showMessage(
        error.response?.data?.message || "Error al actualizar",
        "error",
      );
    }
  };

  if (!usuario) {
    return <></>;
  }

  const iniciales = usuario.nombreUsuario?.toUpperCase().slice(0, 2);
  const imagenFinal = previewPerfil || urlPerfil || usuario.foto_de_perfil;

  const backgroundFinal =
    previewBg ||
    urlBg ||
    usuario.foto_banner ||
    "https://via.placeholder.com/800x400?text=Sin+Fondo";

  const displayName = data.nombreUsuario || usuario.nombreUsuario;

  return (
    <section className="editar_perfil_section">
      {isDesktop ? (
        <>
          <nav className="navbar-phone desk">
            <img onClick={() => navigate(-1)} src={back} alt="Atrás" />
          </nav>
        </>
      ) : (
        <nav className="navbar-phone">
          <img onClick={() => navigate(-1)} src={back} alt="Atrás" />
          <img src={more} alt="Más" />
        </nav>
      )}

      <section className="flex-50">
        <section className="perfil_config_carroucel">
          <div className="imagenes_container">
            <img
              key={currentIndex}
              className="background fade-animation"
              src={imagenesDecorativas[currentIndex]}
              alt="Decorativo"
            />

            <div className="carroucel_dots_overlay">
              {imagenesDecorativas.map((_, index) => (
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
            <div
              className="perfil_config_header_data"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.3), #0f0f0f), url("${backgroundFinal}")`,
              }}
            >
              <div className="boton_editar_fondo" onClick={handleBgClick}>
                <img src={editIcon} alt="Editar fondo" />
              </div>

              <input
                type="file"
                ref={bgInputRef}
                className="input_hidden"
                accept="image/*"
                onChange={(e) => subirBg(e.target.files[0])}
              />

              <div className="user_identity">
                <div className="perfil_config_header_imagen_wrapper">
                  <div className="perfil_config_header_imagen">
                    {imagenFinal ? (
                      <img src={imagenFinal} alt="Perfil" />
                    ) : (
                      <p>{iniciales}</p>
                    )}

                    <div
                      className="boton_editar_foto"
                      onClick={handleEditClick}
                    >
                      <img src={editIcon} alt="Editar" />
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="input_hidden"
                    accept="image/*"
                    onChange={(e) => subirPerfil(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="loading_container">
                {subiendoPerfil && (
                  <span className="loading_msg">Subiendo Avatar...</span>
                )}
                {subiendoBg && (
                  <span className="loading_msg">Subiendo Fondo...</span>
                )}
              </div>
            </div>
          </section>

          <section className="perfil_config_body">
            <label>Nombre de usuario</label>
            <div className="column_input">
              <input
                type="text"
                maxLength="20"
                defaultValue={usuario.nombreUsuario}
                onChange={(event) => {
                  setData({ ...data, nombreUsuario: event.target.value });
                }}
                placeholder="Tu nombre"
              />
            </div>

            <div className="column_input">
              <div className="label_container">
                <label>Biografía </label>
                <label htmlFor="">{data.biografia.length} / 300</label>
              </div>

              <textarea
                onChange={(event) =>
                  setData({ ...data, biografia: event.target.value })
                }
                defaultValue={usuario.biografia}
                placeholder="Cuéntanos sobre ti..."
                maxLength="300"
                rows="3"
              />
            </div>
          </section>

          <section className="perfil_editar_footer">
            <div className="btn_container">
              <button
                className="btn_guardar"
                disabled={subiendoPerfil || subiendoBg}
                onClick={handleSubmit}
              >
                <img src={checkIcon} alt="Guardar" />
                {subiendoPerfil || subiendoBg
                  ? "Subiendo..."
                  : "Guardar Cambios"}
              </button>
              <button
                className="btn_cancelar"
                onClick={() => navigate("/perfil")}
              >
                <img src={back} alt="" />
                Cancelar
              </button>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
