import "../../css/login.css";
import code from "../../icons/code.svg";
import empresa from "../../icons/empresa.svg";
import lock from "../../icons/lock.svg";
import link from "../../icons/link.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clientAxios from "../../utils/clientAxios";

export default function LoginEmpresa() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreEmail: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!form.nombreEmail || !form.password) {
      return alert("Todos los campos son obligatorios");
    }

    const datosParaEnviar = {
      usuario_email: form.nombreEmail,
      password: form.password,
    };

    try {
      const response = await clientAxios.post(
        "/usuarios/login",
        datosParaEnviar
      );

      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("TokenStremuGames", response.data.token);
      }
      navigate("/explorar");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formulario_login">
      <div className="formulario_login_header">
        <div>
          <img src={code} alt="" />
        </div>

        <p>Gestiona tu estudio</p>
        <p>Accede al panel de gestión</p>
      </div>

      <section>
        <p>Nombre o correo electronico</p>

        <div className="input_container">
          <img src={empresa} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, nombreEmail: event.target.value })
            }
            type="text"
            placeholder="Ingrese el usuario/correo"
          />
        </div>

        <p>Contraseña</p>

        <div className="input_container">
          <img src={lock} alt="" />
          <input
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            type="text"
            placeholder="Ingrese la contraseña"
          />
        </div>

        <button onClick={() => handleSubmit()}>Iniciar Sesión</button>

        <div className="formulario_login_footer">
          <p>¿No tienes registrado tu estudio?</p>
          <div>
            <p>Registrarte</p>
            <p onClick={() => navigate("/registro-empresa")}>
              haciendo click acá <img src={link} alt="" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
