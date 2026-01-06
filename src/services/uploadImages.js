import { useState } from "react";

export function useSubirImagen() {
  const [imagenPreview, setImagenPreview] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  const subirImagen = async (file) => {
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImagenPreview(localUrl);

    const data = new FormData();
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET;

    console.log("Cloud Name:", cloudName);
    console.log("Preset:", preset);

    data.append("file", file);
    data.append("upload_preset", preset);

    try {
      setSubiendo(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const fileData = await response.json();

      if (fileData.secure_url) {
        setImagenUrl(fileData.secure_url);
      } else {
        throw new Error("Error en la respuesta de Cloudinary");
      }
    } catch (error) {
      console.error("Error al subir:", error);
    } finally {
      setSubiendo(false);
    }
  };

  return { subirImagen, imagenPreview, imagenUrl, subiendo };
}
