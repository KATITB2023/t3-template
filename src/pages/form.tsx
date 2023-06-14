import React from "react";
const UploadComponent = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    setFile(file);
  };

  return (
    <form>
      <input
        type="file"
        onChange={() => {
          void handleInputChange;
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadComponent;
