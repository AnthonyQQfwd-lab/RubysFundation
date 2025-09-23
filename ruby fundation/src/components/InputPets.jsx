import React, {useState} from 'react'

function InputPets() {
    const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        console.log(file)
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }



  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          style={{ width: '300px', height: 'auto', marginTop: '10px' }}
        />
      )}
    </div>

  )
}

export default InputPets