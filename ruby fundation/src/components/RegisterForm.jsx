import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, createUsers } from '../services/ServicesUsers';


function RegisterForm() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userGmail, setUserGmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPassword, setUserPassword] =useState("");
    const [userHelpedPets, setUserHelpedPets] = useState(0);
    const [userAdoptedPets, setUserAdoptedPets] = useState(0);

    const [users, setUsers] = useState (null)

    useEffect(() => {
        /**
        * Función asíncrona para obtener todos los usuarios del sistema
        */
        async function fetchUsuarios() {
            const users = await getUsers();
            setUsers(users);
        }
        fetchUsuarios()
    }, []);
    
    const [alerta, setAlerta] = useState({ 
        show: false, 
        message: '', 
        variant: 'danger' 
    });

     async function userRegister()
    {
        // Validación 1: Verificar que todos los campos estén completos
        if (userName.trim() === '' || userGmail.trim() === '' || userPassword.trim() === '' || userPhoneNumber.trim() === '' || userId.trim() === '') {
            alert("fill empty spaces")
            return;
        }

        // Validación 2: Verificar si el usuario ya existe
        // Comparación insensible a mayúsculas y sin espacios
        const userFound = users.find(
            (u) => u.userGmail.trim().toLowerCase() === userGmail.trim().toLowerCase()
        );
        
        alert(userFound)
        if (userFound) {
            alert("User already register")
            return;
        }

        // Si todas las validaciones pasan, crear el nuevo usuario
        const newUser = {
            UserName: userName,
            userId : userId,
            userGmail: userGmail,
            userPassword: userPassword,
            userPhoneNumber: userPhoneNumber,
            userHelpedPets: 0,
            userAdoptedPets: 0
        };
        

        await createUsers(newUser);

        alert("now sign in ")
        navigate('/LogIn');
    }
  return (
    <div>
        
        <h1>Register Form</h1>
        <label>name</label><br />
        <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)}/><br />
        <label>ID</label><br />
        <input type='text' value={userId} onChange={(e) => setUserId(e.target.value)}/><br />
        <label>Gmail</label><br />
        <input type="email" value={userGmail} onChange={(e) => setUserGmail(e.target.value)} /><br />
        <label>Phone Number</label><br />
        <input type="text" value={userPhoneNumber} onChange={(e) => setUserPhoneNumber(e.target.value)}/><br />
        <label>Ubication</label><br />
        <input type="text" /><br />
        <label>Password</label><br />
        <input type="text" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/><br />
        <button onClick={userRegister}>Register</button>
    </div>
  )
}

export default RegisterForm