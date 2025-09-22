/* CRUD - Datos */

//(GET)
async function getMissingPets() {
    try {
        const peticion = await fetch('http://localhost:3001/missingPets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error("Error getting missing pets");
        }

        const Usuarios = await peticion.json();
        return Usuarios;

    } catch (error) {
        console.error("there is a problem getting missing Pets", error);
        throw error;
    }
}

//(POST)
async function createMissingPets(newPet) {
    try {
        const peticion = await fetch('http://localhost:3001/missingPets', {
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
        console.error("Error creating missing pets", error);
        throw error;
    }
}

//(PUT || PATCH)
async function updateMissingPets(id, updateData) {
    try {
        const peticion = await fetch(`http://localhost:3001/missingPets/${id}`, {
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
        console.error("Error updating missing Pets", error);
        throw error;
    }
}

//(DELETE)
async function deleteMissingPets(id) {
    try {
        const peticion = await fetch(`http://localhost:3001/missingPets/${id}`, {
            method: 'DELETE'
        });

        if (!peticion.ok) {
            throw new Error("Error deleting Pets");
        }

        return { mensaje: "missing Pets correctly delete" };

    } catch (error) {
        console.error("Error deleting missing Pets", error);
        throw error;
    }
}

export { getMissingPets, createMissingPets, updateMissingPets, deleteMissingPets};