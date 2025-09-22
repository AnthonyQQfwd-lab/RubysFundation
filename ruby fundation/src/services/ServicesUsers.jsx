/* CRUD - Datos */

//(GET)
async function getUsers() {
    try {
        const peticion = await fetch('http://localhost:3001/users', {
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
        console.error("there is a problem getting users", error);
        throw error;
    }
}

//(POST)
async function createUsers(newUser) {
    try {
        const peticion = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (!peticion.ok) {
            throw new Error("Error creating user");
        }

        const createUser = await peticion.json();


        return createUser;

    } catch (error) {
        console.error("Error creating user", error);
        throw error;
    }
}

//(PUT || PATCH)
async function updateUsers(id, updateData) {
    try {
        const peticion = await fetch(`http://localhost:3001/users/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!peticion.ok) {
            throw new Error("Error updating user");
        }

        const updateUser = await peticion.json();
        return updateUser;

    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}

//(DELETE)
async function deleteUsers(id) {
    try {
        const peticion = await fetch(`http://localhost:3001/users/${id}`, {
            method: 'DELETE'
        });

        if (!peticion.ok) {
            throw new Error("Error deleting user");
        }

        return { mensaje: "user correctly delete" };

    } catch (error) {
        console.error("Error deleting user", error);
        throw error;
    }
}

export { getUsers, createUsers, updateUsers, deleteUsers};