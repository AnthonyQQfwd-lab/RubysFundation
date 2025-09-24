import React, { useState } from 'react';
import { getPets, createPets } from '../services/ServicesAdoptionPets';
import '../styles/PostPage/PostPage.css';

function InputPets() {
  const [images, setImagesBase64] = useState([]);
  const [pets, setPets] = useState([]);

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
      setImagesBase64(base64Images); // guarda previews en el estado

      const pet = {
        nombre: 'rofus',
        fotos: base64Images,
      };

      await createPets(pet);
      
    } catch (error) {
      console.error('Error to convert images:', error);
    }
  }

  async function publish() {
    const pets = await getPets();
    setPets(pets);
  }

  return (
    <div>
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
      <label
        id="imageInput"
        htmlFor="file-upload"
        
      >
        Click or drag images here
      </label>

      {/* Previews de las imágenes cargadas en esta sesión */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`preview-${index}`}
          />
        ))}
      </div>

      <button onClick={publish}>publish pet</button>

      {/* Previsualización de mascotas desde DB */}
      {pets.map((pet, petIndex) =>
        pet.fotos.map((foto, index) => (
          <img
            key={`${petIndex}-${index}`}
            src={foto.startsWith('data:image') ? foto : `data:image/jpeg;base64,${foto}`}
            alt={`Pet ${petIndex} - Imagen ${index + 1}`}
          />
        ))
      )}
    </div>
  );
}

export default InputPets;
