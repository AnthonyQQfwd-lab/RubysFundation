import React, { useState } from 'react';
import { getPets, createPets } from '../services/ServicesAdoptionPets';
import { createMissingPets } from '../services/ServicesMissingPets';
import { createSearchingPets } from '../services/ServicesSearchingPets';
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
  const fileInputRef = React.useRef(null);
  const [petDescription, setpetDescription] = useState("")

  const adoptionModalRef  = React.useRef(null)
  const [showAdoptionModal, setAdoptionModal] = useState(false)
  const [showWantedModal, setWantedModal] = useState(false)
  const [showMissingModal, setMissingModal] = useState(false)
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

  
  async function publish() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    const pet = {
      photos: images,
      name: petName,
      keeper: currentUser.Name,
      keeperId: currentUser.userId,
      specie: petSpecie,
      breed: petBreed,
      size: petSize,
      age: petAge,
      description: petDescription,
      ubication: petUbication
    };

    try {

      if(showAdoptionModal === true)
      {
        await createPets(pet);
      } 

      if(showMissingModal === true)
      {
        await createMissingPets(pet);
      }

      if(showWantedModal === true)
      {
        await createSearchingPets(pet)
      }

      const pets = await getPets();



      setPets(pets);
      setImagesBase64([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setPetName("")
      setPetAge("")
      setPetSpecie("")
      setPetBreed("")
      setPetSize("")
      setPetUbication("")
      setpetDescription("")

    } catch (error) {
      console.error("Error publishing pet:", error);
    }

    

  }

  function showModalAdoptionPet()
  {
    //dialogDesc.close();
    //dialo
    // gDesc.showModal();
  }

  function openAdoptionModal() {
    if (adoptionModalRef.current) {
      adoptionModalRef.current.showModal();
    }
  }

  function closeAdoptionModal() {
    if (adoptionModalRef.current) {
      adoptionModalRef.current.close();
    }
  }



  return (
    <div id="inputPetContainer">
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={uploadImage}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <h2>create publication for</h2>
      <div id="btnsContainer">
          <button onClick={() => { openAdoptionModal(); setAdoptionModal(true); setMissingModal(false); setWantedModal(false)}}>Adoption Pet</button>
          <button onClick={() => { openAdoptionModal(); setWantedModal(true); setMissingModal(false); setAdoptionModal(false)}}>Wanted Pet</button>
          <button onClick={() => { openAdoptionModal(); setMissingModal(true); setWantedModal(false); setAdoptionModal(false) }}>Missing Pet</button>
      </div>
      
      
      <dialog id="adoptionModal" ref={adoptionModalRef}      >
        <label id="imageInput" htmlFor="file-upload">
          Click or drag images here
        </label>

        {/* Previews */}
        <div id="previewImages">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`preview-${index}`} />
          ))}
        </div>
      
        <div id="inputPetTextContainer">
          <div id="leftSide">

              {!showMissingModal ? (
                <>
                  <label>Name</label><br/>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                  /><br/>
                </>
                ) : null}

                


            <label>Breed</label><br/>
            <input type="text" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} /><br/>
            <label>Size</label><br/>
            <input type="text" value={petSize} onChange={(e) => setPetSize(e.target.value)} /><br/>
          </div>
          <div id="rightSide">


                {!showMissingModal ? (
                <>
                  <label>Age</label><br/>
                  <input
                    type="number"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                  /><br/>
                </>
                ) : null}


            <label>Specie</label><br/>
            <input type="text" value={petSpecie} onChange={(e) => setPetSpecie(e.target.value)} /><br/>


            <label>Ubication</label><br/>
            <input type="text" value={petUbication} onChange={(e) => setPetUbication(e.target.value)} /><br/>
          </div>
          
        </div>
        <label>description</label><br/>
        <input id="petDescription"type="text" value={petDescription} onChange={(e) => setpetDescription(e.target.value)}/>
        <button onClick={publish}>publish pet</button>
        <button onClick={closeAdoptionModal}>Close</button>

      </dialog>
    </div>
  );
}

export default InputPets;
