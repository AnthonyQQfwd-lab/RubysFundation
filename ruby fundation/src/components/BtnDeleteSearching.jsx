import React from 'react'
import { deleteSearchingPets } from '../services/ServicesSearchingPets'
function BtnDeleteSearching({petId}) {
  async function handleDelete() {
    try {
      await deleteSearchingPets(petId)   
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

export default BtnDeleteSearching
