import React, { useState } from 'react';
import axios from 'axios';
import { Widget } from "@uploadcare/react-widget";

const Upload = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [uploadedFile, setUploadedFile] = useState(null); 
  const [desc, setDesc] = useState("");

  const handleUpload = (info) => {
    setUploadedFile(info);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3500/upload", {
        username: userData.username,
        desc,
        img: uploadedFile.cdnUrl 
      });
        alert("Sikeres feltöltés");
        window.location.reload(false)
      
    } catch (error) {
      console.error(error);
      alert("Hiba történt a feltöltés során");
    }
  }

  return (
    <div className='upload-container'>
      <form>
        <label htmlFor='desc'>Leírás:</label>
        <input
          type="text"
          id='desc'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <p>
          <label htmlFor='file'>Fájl:</label>{' '}
          <Widget
            publicKey='7d9167cc84c4a6e75384'
            id='file'
            onChange={handleUpload}
          />
        </p>
        <button type="submit" onClick={handleSubmit}>
          Feltöltés
        </button>
      </form>
    </div>
  );
};

export default Upload;
