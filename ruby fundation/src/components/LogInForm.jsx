import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/ServicesUsers';
import { Link } from 'react-router-dom'
function LogInForm() {
    const navigate = useNavigate();
    const [userGmail, setUserGmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [users, setUsers] = useState([])

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




    async function logInUser() {



        // Validación 1: Verificar que todos los campos estén completos
        if (userGmail.trim() === '' || userPassword.trim() === '') {
            alert("fill empty spaces")
            return;
        }

        const verifiedUser = users.find(u =>
            u.userGmail.trim().toLowerCase() === userGmail.trim().toLowerCase() &&
            u.userPassword === userPassword
        )

        if(verifiedUser)
        {
            // ========== AUTENTICACIÓN EXITOSA ==========

            // Guardar datos del usuario en sessionStorage para mantener la sesión
            sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                    Name: verifiedUser.UserName,
                    userId: verifiedUser.userId,
                    gmail: verifiedUser.userGmail,
                    phoneNumber: verifiedUser.userPhoneNumber,
                    helpedPets: verifiedUser. userHelpedPets,
                    adoptedPets: verifiedUser.userAdoptedPets
                })
            )
            alert("Sign in correctly")
            navigate('/Home');
        }
        else
        {
            alert("Gmail or password wrong")
        }


    }

  return (
    <div>
        <h1>LoginPage<br /> 
            <label>Gmail</label><br />
            <input type="email" value={userGmail} onChange={e => setUserGmail(e.target.value)}/><br />
            <label>Password</label><br />
            <input type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)}/><br />
            <button onClick={logInUser}>Log in</button>
            <p>dont have an account? click</p> <Link to="/Register">here</Link>
        </h1>
    </div>
  )
}

export default LogInForm