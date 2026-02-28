import React from "react";
import "../../css/modal.css";
import { useConfirmStore } from "../../services/ConfirmModal.js";

export default function ConfirmModal() {
  const { isOpen, message, confirm, close } = useConfirmStore();

  if (!isOpen) return null;

  return (
    <div className="modal_overlay">
      <div className="modal_content confirm_modal">
        <p>{message}</p>
        <div className="modal_actions">
          <button className="btn_cancel" onClick={close}>
            Cancelar
          </button>
          <button className="btn_confirm" onClick={confirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
