import React from "react";
import { v4 as uuidv4 } from "uuid";
import { fileHandling } from "~/utils/api";

const UploadComponent = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleOnClick = async () => {
    if (!file) return;

    const fileUUID = uuidv4();
    const renamedFile = new File([file], `${fileUUID}-${file.name}`, {
      type: file.type,
    });

    const response = await fileHandling.upload(renamedFile);

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
