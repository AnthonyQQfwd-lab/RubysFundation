import React from 'react'
import { deletePets } from '../services/ServicesAdoptionPets'

function BtnDelete({ petId, onDeleted }) {
  
  async function Delete() {
    try {
      await deletePets(petId)
      alert("Pet deleted successfully")

    } catch (error) {
      console.error("Error deleting pet:", error)
      alert("Error deleting pet ❌")
    }
  }

  return (
    <button onClick={Delete} >
      Delete
    </button>
  )
}

export default BtnDelete
