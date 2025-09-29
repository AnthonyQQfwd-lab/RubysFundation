/* CRUD - Datos */

//(GET)
async function getMessages() {
    try {
        const peticion = await fetch('http://localhost:3001/conversations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error("Error getting ");
        }

        const conversations  = await peticion.json();
        return conversations;

    } catch (error) {
        console.error("there is a problem getting conversations", error);
        throw error;
    }
}

//(POST)
async function createMessage(newMessage) {
    try {
        const peticion = await fetch('http://localhost:3001/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        });

        if (!peticion.ok) {
            throw new Error("Error creating Pets");
        }

        const createMessages = await peticion.json();


        return createMessages;

    } catch (error) {
        console.error("Error creating messages", error);
        throw error;
    }
}

//(PUT || PATCH)
async function updateMessages(id, updateData) {
    try {
        const peticion = await fetch(`http://localhost:3001/conversations/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!peticion.ok) {
            throw new Error("Error updating message");
        }

        const updateMessages = await peticion.json();
        return updateMessages;

    } catch (error) {
        console.error("Error updating messages", error);
        throw error;
    }
}

//(DELETE)
async function deleteMessages(id) {
    try {
        const peticion = await fetch(`http://localhost:3001//conversations/${id}`, {
            method: 'DELETE'
        });

        if (!peticion.ok) {
            throw new Error("Error deleting messages");
        }

        return { mensaje: "messages correctly delete" };

    } catch (error) {
        console.error("Error deleting messages", error);
        throw error;
    }
}

export { getMessages, createMessage, updateMessages, deleteMessages};