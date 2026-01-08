import "../../css/modalMessage.css";
import check_green from "../../icons/check_green.svg";
import warning from "../../icons/warning.svg";
import { useMessageStore } from "../../services/MessageModal";

export default function ModalMessage() {
  const { message, isOpen, type } = useMessageStore();

  if (!isOpen) return null;

  return (
    <>
      <section className="modal_section">
        <article
          className="modal"
          style={{
            border: type === "success" ? "2px solid #2ab600" : "2px solid red",
          }}
        >
          <div className="modal_header">
            {type === "success" ? (
              <img src={check_green} alt="" />
            ) : (
              <img src={warning} alt="" />
            )}
          </div>
          <div className="modal_body">
            <p>{message}</p>
          </div>
        </article>
      </section>
    </>
  );
}
