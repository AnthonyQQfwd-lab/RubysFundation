import React, { useState } from 'react';
import { getPets, createPets } from '../services/ServicesAdoptionPets';
import '../styles/PostPage/PostPage.css';

function InputPets() {
  const [images, setImagesBase64] = useState([]);
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petSize, setPetSize] = useState("");
  const [petSpecie, setPetSpecie] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petUbication, setPetUbication] = useState("");

  // solo convierte imágenes a base64 y guarda en el estado
  async function uploadImage(e) {
    const files = Array.from(e.target.files);

    const base64Promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Images = await Promise.all(base64Promises);
      setImagesBase64(base64Images); 
    } catch (error) {
      console.error('Error converting images:', error);
    }
  }

  // ahora sí, publica todo el objeto
  async function publish() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const pet = {
      photos: images,
      name: petName,
      keeper: currentUser.Name,
      specie: petSpecie,
      breed: petBreed,
      size: petSize,
      age: petAge,
      ubication: petUbication
    };

    try {
      await createPets(pet); // ⬅️ aquí mandas TODO junto
      const pets = await getPets();
      setPets(pets);
    } catch (error) {
      console.error("Error publishing pet:", error);
    }
  }

  return (
    <div id="inputPetContainer">
      {/* Input oculto */}
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={uploadImage}
        style={{ display: 'none' }}
      />

      {/* Label rectangular personalizado */}
      <label id="imageInput" htmlFor="file-upload">
        Click or drag images here
      </label>

      {/* Previews */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {images.map((img, index) => (
          <img key={index} src={img} alt={`preview-${index}`} />
        ))}
      </div>

      <div id="inputPetTextContainer" style={{ display: "flex", gap: "20px" }}>
        <div id="leftSide">
          <label>Name</label><br/>
          <input value={petName} onChange={(e) => setPetName(e.target.value)} /><br/>
          <label>Breed</label><br/>
          <input type="text" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} /><br/>
          <label>Size</label><br/>
          <input type="text" value={petSize} onChange={(e) => setPetSize(e.target.value)} /><br/>
        </div>
        <div id="rightSide">
          <label>Specie</label><br/>
          <input type="text" value={petSpecie} onChange={(e) => setPetSpecie(e.target.value)} /><br/>
          <label>Age</label><br/>
          <input type="number" value={petAge} onChange={(e) => setPetAge(e.target.value)} /><br/>
          <label>Ubication</label><br/>
          <input type="text" value={petUbication} onChange={(e) => setPetUbication(e.target.value)} /><br/>
        </div>
      </div>

      <button onClick={publish}>publish pet</button>

      
    </div>
  );
}

export default InputPets;
