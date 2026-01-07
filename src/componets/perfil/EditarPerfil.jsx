import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "../../css/editarPerfil.css";
import back from "../../icons/back.svg";
import more from "../../icons/more.svg";
import checkIcon from "../../icons/save.svg";
import editIcon from "../../icons/edit.svg";
import { useObtenerUsuario } from "../../services/obtenerUsuario";
import { useSubirImagen } from "../../services/uploadImages";
import clientAxios from "../../utils/clientAxios";

export default function EditarPerfil() {
  const [data, setData] = useState({
    foto_de_perfil: "",
    nombreUsuario: "",
    biografia: "",
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { usuario } = useObtenerUsuario();

  if (!usuario) return null;

  const { nombreUsuario, _id, foto_de_perfil, biografia } = usuario;

  const idUsuario = _id;

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const { subirImagen, imagenPreview, imagenUrl, subiendo } = useSubirImagen();

  const iniciales = nombreUsuario?.toUpperCase().slice(0, 2);

  const handleSubmit = async () => {
    const datosParaEnviar = {
      foto_de_perfil: imagenUrl || foto_de_perfil,
      nombreUsuario: data.nombreUsuario || nombreUsuario,
      biografia: data.biografia || biografia,
    };

    try {
      const response = await clientAxios.put(
        `/usuarios/${idUsuario}`,
        datosParaEnviar
      );
      console.log(response);
    } catch (error) {}
  };

  const imagenFinal = imagenPreview || imagenUrl || foto_de_perfil;

  return (
    <section className="editar_perfil_section">
      <nav className="navbar-phone">
        <img onClick={() => navigate(-1)} src={back} alt="Atrás" />
        <div>
          <p>Editar perfil</p>
          <p>Modifica tu usuario o biografia.</p>
        </div>
        <img src={more} alt="Más" />
      </nav>

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
          </div>
        </div>
      </section>

      <section className="perfil_config_body">
        <label>Nombre de usuario</label>
        <div className="column_input">
          <input
            type="text"
            defaultValue={nombreUsuario}
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
            defaultValue={biografia}
            placeholder="Cuéntanos sobre ti..."
            rows="3"
          />
        </div>
      </section>

      <section className="perfil_editar_footer">
        <button
          className="btn_guardar"
          onClick={() => {
            handleSubmit();
          }}
        >
          <img src={checkIcon} alt="Guardar" />
          Guardar Cambios
        </button>
        <button className="btn_cancelar" onClick={() => navigate("/perfil")}>
          Cancelar
        </button>
      </section>
    </section>
  );
}
