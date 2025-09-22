/* CRUD - Datos */

//(GET)
async function getSearchingPets() {
    try {
        const peticion = await fetch('http://localhost:3001/searchingPets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error("Error getting Searching pets");
        }

        const Usuarios = await peticion.json();
        return Usuarios;

    } catch (error) {
        console.error("there is a problem getting Searching Pets", error);
        throw error;
    }
}

//(POST)
async function createSearchingPets(newPet) {
    try {
        const peticion = await fetch('http://localhost:3001/searchingPets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPet)
        });

        if (!peticion.ok) {
            throw new Error("Error creating Pets");
        }

        const createPets = await peticion.json();


        return createPets;

    } catch (error) {
        console.error("Error creating Searching pets", error);
        throw error;
    }
}

//(PUT || PATCH)
async function updateSearchingPets(id, updateData) {
    try {
        const peticion = await fetch(`http://localhost:3001/searchingPets/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!peticion.ok) {
            throw new Error("Error updating Pets");
        }

        const updatePets = await peticion.json();
        return updatePets;

    } catch (error) {
        console.error("Error updating Searching Pets", error);
        throw error;
    }
}

//(DELETE)
async function deleteSearchingPets(id) {
    try {
        const peticion = await fetch(`http://localhost:3001/searchingPets/${id}`, {
            method: 'DELETE'
        });

        if (!peticion.ok) {
            throw new Error("Error deleting Pets");
        }

        return { mensaje: "Searching Pets correctly delete" };

    } catch (error) {
        console.error("Error deleting Searching Pets", error);
        throw error;
    }
}

export { getSearchingPets, createSearchingPets, updateSearchingPets, deleteSearchingPets};