import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/ServicesUsers';
import { getAdmins } from '../services/ServicesAdmins';
import { Link } from 'react-router-dom'
import '../styles/LoginPage/LoginPage.css'

function LogInForm() {
    const navigate = useNavigate();
    const [userGmail, setUserGmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        async function fetchUsuarios() {
            const adminsData = await getAdmins()
            const usersData = await getUsers();
            setUsers(usersData);
            setAdmins(adminsData)
        }
        fetchUsuarios()
    }, []);

    async function logInUser() {
        try {
            if (userGmail.trim() === '' || userPassword.trim() === '') {
                alert("fill empty spaces")
                return;
            }

            const verifiedUser = users.find(u =>
                u.userGmail?.trim().toLowerCase() === userGmail.trim().toLowerCase() &&
                u.userPassword === userPassword
            );

            const verifiedAdmin = admins.find(a =>
                a.adminGmail?.trim().toLowerCase() === userGmail.trim().toLowerCase() &&
                a.userPassword === userPassword
            );

            if (verifiedAdmin) {
                sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                        name: verifiedAdmin.UserName,
                        userId: verifiedAdmin.id,
                        gmail: verifiedAdmin.adminGmail,
                        admin: true
                    })
                );
                localStorage.setItem("token", verifiedAdmin.id);
                alert("Sign in correctly");
                navigate('/AdminDashboard');
                return;
            }

            if (verifiedUser) {
                sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                        name: verifiedUser.UserName,
                        userId: verifiedUser.userId,
                        gmail: verifiedUser.userGmail,
                        phoneNumber: verifiedUser.userPhoneNumber,
                        helpedPets: verifiedUser.userHelpedPets,
                        adoptedPets: verifiedUser.userAdoptedPets
                    })
                );
                localStorage.setItem("token", verifiedUser.id);
                alert("Sign in correctly");
                navigate('/Home');
                return;
            }

            alert("Gmail or password wrong");

        } catch (error) {
            console.error("login error", error);
        }
    }

    return (
        <div id="loginFormContainer">
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
