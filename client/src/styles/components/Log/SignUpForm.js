import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const handleRegister = async (e) => {

    }

    return (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
            />
            <div className="pseudo error"></div>
            <br/>
            <label htmlFor="email">Pseudo</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
            <br/>
            <label htmlFor="Password">Mot de passe</label>
            <br />
            <input
                type="text"
                name="Password"
                id="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
            />
            <div className="Password error"></div>
            <input type="submit" value="Valider inscription" />
        </form>
    )
}