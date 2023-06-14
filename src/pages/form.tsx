import React from "react";
import { getBaseUrl } from "~/utils/api";

const UploadComponent = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleOnClick = async () => {
    if (!file) return;

    // TODO: Ubah filename menjadi UUID v4

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${getBaseUrl()}/api/file/upload`, {
      method: "POST",
      body: formData,
    });

    alert(response);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    setFile(file);
  };

  return (
    <form>
      <input type="file" onChange={() => void handleInputChange} />
      <button type="submit" onClick={() => void handleOnClick}>
        Submit
      </button>
    </form>
  );
};

export default UploadComponent;
