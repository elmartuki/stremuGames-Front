import { useNavigate, useSearchParams } from "react-router-dom";
import "../../css/payments.css";

export default function Fallido() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status") || "rechazado";

  return (
    <section className="pago_exitoso_section">
      <article className="recibo_card error-card">
        <header className="recibo_header">
          <div className="icon_container error-icon">✕</div>
          <h1 className="error-text">¡Pago Fallido!</h1>
          <p className="status-badge error-badge">
            {status === "null" ? "Cancelado" : status}
          </p>
        </header>

        <div className="info_transaccion">
          <div
            className="info_row"
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            <span style={{ color: "#ccc" }}>
              Lo sentimos, no se pudo procesar tu pago. No se ha realizado
              ningún cargo a tu cuenta.
            </span>
          </div>

          {paymentId && paymentId !== "null" && (
            <>
              <div className="divider" style={{ margin: "15px 0" }}></div>
              <div className="info_row">
                <span>Referencia de pago:</span>
                <strong>#{paymentId}</strong>
              </div>
            </>
          )}
        </div>

        <div className="divider"></div>

        <div
          className="total_container"
          style={{ display: "block", textAlign: "center" }}
        >
          <span style={{ fontSize: "0.9rem", color: "#999" }}>
            Posibles causas: Fondos insuficientes, tarjeta rechazada o problemas
            de conexión.
          </span>
        </div>

        <div className="btn_container">
          <button
            className="btn_volver error-btn"
            onClick={() => navigate("/carrito")}
          >
            Volver al Carrito e Intentar de Nuevo
          </button>

          <button
            className="btn_volver_inicio"
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "none",
              color: "#999",
              marginTop: "10px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Cancelar y volver al inicio
          </button>
        </div>
      </article>
    </section>
  );
}
