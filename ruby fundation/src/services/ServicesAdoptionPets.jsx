/* CRUD - Datos */

//(GET)
async function getPets() {
    try {
        const peticion = await fetch('http://localhost:3001/adoptionPets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error("Error getting ");
        }

        const Usuarios = await peticion.json();
        return Usuarios;

    } catch (error) {
        console.error("there is a problem getting Pets", error);
        throw error;
    }
}

//(POST)
async function createPets(newPet) {
    try {
        const peticion = await fetch('http://localhost:3001/adoptionPets', {
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
        console.error("Error creating Pets", error);
        throw error;
    }
}

//(PUT || PATCH)
async function updatePets(id, updateData) {
    try {
        const peticion = await fetch(`http://localhost:3001/adoptionPets/${id}`, {
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
        console.error("Error updating Pets", error);
        throw error;
    }
}

//(DELETE)
async function deletePets(id) {
    try {
        const peticion = await fetch(`http://localhost:3001/adoptionPets/${id}`, {
            method: 'DELETE'
        });

        if (!peticion.ok) {
            throw new Error("Error deleting Pets");
        }

        return { mensaje: "Pets correctly delete" };

    } catch (error) {
        console.error("Error deleting Pets", error);
        throw error;
    }
}

export { getPets, createPets, updatePets, deletePets};