import React from "react";
import Resizer from "react-image-file-resizer";

import "./Main.css";
import "../../styles/button.css";

interface ImageUploaderProps {
  image_str: string;
  setImage_str: React.Dispatch<React.SetStateAction<string>>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  image_str,
  setImage_str,
}) => {
  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        650,
        750,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const onInputChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files![0];
    const image = await resizeFile(file);
    setImage_str(image as string);
  };

  return (
    <div style={{ display: "flex" }}>
      <label htmlFor="image_uploader" className="Upload btn-thin btn-sharp">
        <small>{image_str ? "Choose another" : "Add an Image"}</small>
      </label>
      <input
        type="file"
        accept="image/x-png, image/jpeg"
        id="image_uploader"
        style={{ display: "none" }}
        onChange={(evt) => {
          if (!evt.target.value.length) return;
          onInputChange(evt);
        }}
      />
      {image_str && (
        <button
          className="btn-thin btn-sharp btn-left"
          onClick={() => setImage_str("")}
        >
          <small>Remove</small>
        </button>
      )}
    </div>
  );
};
