import { useState } from "react";
import { useMessageStore } from "./MessageModal";

export function useSubirImagen() {
  const [imagenPreview, setImagenPreview] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  const { showMessage } = useMessageStore.getState();

  const subirImagen = async (file) => {
    if (!file) return null;

    const localUrl = URL.createObjectURL(file);
    setImagenPreview(localUrl);

    const data = new FormData();
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET;

    data.append("file", file);
    data.append("upload_preset", preset);

    try {
      setSubiendo(true);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );

      const fileData = await response.json();

      if (response.ok) {
        setImagenUrl(fileData.secure_url);
        showMessage("Imagen subida correctamente", "success");

        return fileData.secure_url;
      } else {
        throw new Error(fileData.error?.message || "Error al subir imagen");
      }
    } catch (error) {
      showMessage(error.message || "Error al subir la imagen", "error");
      return null;
    } finally {
      setSubiendo(false);
    }
  };

  return { subirImagen, imagenPreview, imagenUrl, subiendo };
}
