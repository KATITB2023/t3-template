import React from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "~/utils/api";
import { FolderEnum } from "~/utils/file";

const UploadComponent = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const generateURLForUpload = api.storage.generateURLForUpload.useMutation();

  const handleOnClick = async () => {
    if (!file) return;

    const fileUUID = uuidv4();

    const url = await generateURLForUpload.mutateAsync({
      folder: FolderEnum.ASSIGNMENT,
      filename: `${fileUUID}-${file.name}`,
      contentType: file.type,
    });

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
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
