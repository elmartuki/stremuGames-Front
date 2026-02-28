import React from "react";
import "../../css/initPage.css";
import { useModalStore } from "../../services/ModalTerminos";

export default function ModalTerminos() {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="modal_overlay_terms">
      <div className="modal_content_terms">
        <div className="modal_header_terms">
          <div>
            <h3>
              TÉRMINOS Y{" "}
              <span className="titulo" style={{ color: "#66f61e" }}>
                CONDICIONES
              </span>
            </h3>
            <p className="update_date">
              ÚLTIMA ACTUALIZACIÓN: 13 DE FEBRERO, 2026
            </p>
          </div>

          <div>
            <button className="close_btn_terms" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
        <div className="modal_body_terms">
          <p className="intro_text">
            Bienvenido a StremuGames. Este documento constituye un acuerdo
            legalmente vinculante entre usted (en adelante, el "Usuario" o el
            "Desarrollador") y StremuGames Inc. (en adelante, la "Plataforma").
            Al acceder, navegar, registrarse o utilizar nuestros servicios de
            distribución y juego, usted acepta expresamente someterse a las
            cláusulas descritas a continuación.
          </p>

          <div className="term_item">
            <h4>01. ACEPTACIÓN DE LOS TÉRMINOS</h4>
            <p>
              El acceso a la Plataforma y la utilización de sus servicios
              implica la aceptación plena y sin reservas de todas y cada una de
              las condiciones incluidas en este acuerdo. Si el Usuario no está
              de acuerdo con alguno de los términos aquí expuestos, deberá
              abstenerse de utilizar el servicio inmediatamente. StremuGames se
              reserva el derecho de modificar estos términos en cualquier
              momento, notificando a los usuarios sobre cambios sustanciales.
            </p>
          </div>

          <div className="term_item">
            <h4>02. ELEGIBILIDAD Y CUENTAS</h4>
            <p>
              Para utilizar los servicios de StremuGames, debe tener al menos 13
              años de edad. Al crear una cuenta, usted garantiza que la
              información proporcionada es veraz, exacta y completa. Es
              responsabilidad exclusiva del Usuario mantener la confidencialidad
              de sus credenciales de acceso. StremuGames no se hace responsable
              por cualquier pérdida o daño derivado del acceso no autorizado a
              su cuenta debido a negligencia en la seguridad de su contraseña.
            </p>
          </div>

          <div className="term_item">
            <h4>03. LICENCIA DE USO PARA JUGADORES</h4>
            <p>
              StremuGames otorga al Usuario una licencia personal, limitada, no
              exclusiva, intransferible y revocable para acceder y utilizar el
              software y el contenido disponible en la Plataforma exclusivamente
              para fines de entretenimiento personal y no comercial. Esta
              licencia no otorga ningún título de propiedad sobre el software, y
              queda estrictamente prohibida la ingeniería inversa,
              descompilación, copia o redistribución del contenido sin
              autorización explícita.
            </p>
          </div>

          <div className="term_item">
            <h4>04. ACUERDO DE DISTRIBUCIÓN PARA DESARROLLADORES</h4>
            <p>
              Los Desarrolladores conservan todos los derechos de propiedad
              intelectual sobre el contenido que suban a la Plataforma. Sin
              embargo, al publicar un juego, otorgan a StremuGames una licencia
              mundial, libre de regalías y no exclusiva para alojar, reproducir,
              distribuir, comunicar públicamente y promocionar dicho contenido
              dentro del ecosistema de la Plataforma. El Desarrollador garantiza
              que posee todos los derechos necesarios sobre el contenido y que
              este no infringe derechos de terceros.
            </p>
          </div>

          <div className="term_item">
            <h4>05. MODELO ECONÓMICO Y PAGOS</h4>
            <p>
              StremuGames aplicará una retención estándar del 12% sobre los
              ingresos brutos generados por la venta de juegos y contenido
              descargable (DLC), entregando el 88% restante al Desarrollador.
              Los pagos se procesarán mensualmente dentro de los 30 días
              posteriores al cierre del mes fiscal, siempre que el saldo
              acumulado supere el umbral mínimo de $100 USD. El Desarrollador es
              el único responsable de declarar y pagar los impuestos aplicables
              en su jurisdicción.
            </p>
          </div>

          <div className="term_item">
            <h4>06. POLÍTICA DE REEMBOLSOS</h4>
            <p>
              Los Usuarios tienen derecho a solicitar el reembolso de cualquier
              compra digital realizada en la Plataforma dentro de un plazo de 14
              días desde la fecha de compra, siempre y cuando el tiempo de
              ejecución del juego no exceda las 2 horas. Los reembolsos se
              procesarán al método de pago original y pueden tardar hasta 7 días
              hábiles en reflejarse.
            </p>
          </div>

          <div className="term_item">
            <h4>07. CONDUCTA, RESTRICCIONES Y CONTENIDO PROHIBIDO</h4>
            <p>
              Queda terminantemente prohibido subir, compartir o distribuir
              contenido que: (a) sea ilegal, difamatorio, obsceno o promueva el
              odio; (b) contenga malware, virus o código malicioso; (c) infrinja
              derechos de autor, marcas registradas o patentes; (d) promueva
              juegos de azar ilegales. StremuGames se reserva el derecho de
              suspender cuentas y eliminar contenido que viole estas directrices
              sin previo aviso y sin derecho a indemnización.
            </p>
          </div>

          <div className="term_item">
            <h4>08. LIMITACIÓN DE RESPONSABILIDAD</h4>
            <p>
              La Plataforma se proporciona "tal cual" y "según disponibilidad".
              StremuGames no garantiza que el servicio sea ininterrumpido, libre
              de errores o completamente seguro. En la medida máxima permitida
              por la ley, StremuGames no será responsable por daños directos,
              indirectos, incidentales, especiales o consecuentes que resulten
              del uso o la imposibilidad de uso del servicio, incluyendo pero no
              limitado a la pérdida de beneficios, datos o interrupción del
              negocio.
            </p>
          </div>

          <div className="term_item">
            <h4>09. LEY APLICABLE Y JURISDICCIÓN</h4>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes
              vigentes en el país de constitución de StremuGames, sin dar efecto
              a sus principios de conflicto de leyes. Cualquier disputa legal
              que surja en relación con estos términos se resolverá
              exclusivamente en los tribunales competentes de dicha
              jurisdicción.
            </p>
          </div>
        </div>
        <div className="modal_footer_terms">
          <button className="cancel_btn_terms" onClick={closeModal}>
            RECHAZAR
          </button>
          <button className="accept_btn_terms" onClick={closeModal}>
            LEÍDO Y ACEPTO
          </button>
        </div>
      </div>
    </div>
  );
}
