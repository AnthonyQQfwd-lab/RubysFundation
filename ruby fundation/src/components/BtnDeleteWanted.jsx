import React from 'react'
import { deleteMissingPets } from '../services/ServicesMissingPets'

function BtnDeleteWanted({ petId }) {   
  async function handleDelete() {
    try {
      await deleteMissingPets(petId)   
      alert("Pet deleted successfully")
    } catch (error) {
      console.error("Error deleting pet:", error)
      alert("Error deleting pet")
    }
  }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}

export default BtnDeleteWanted
