import { useState } from "react";
import useFormSingIn from "../../hooks/useSingInForm";

const FormSignIn = () => {
    const [inputValues, dispatch] = useFormSingIn();

    const usuarioEnviado = {
        nombre: inputValues.firstName,
        apellido: inputValues.lastName,
        email: inputValues.email,
        password: inputValues.password,
        usuarioRol: inputValues.userRole
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log(inputValues);
        fetch("http://localhost:8082/usuarios/registrar", {
            method: "POST",
            body: JSON.stringify(usuarioEnviado),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value,
            },
        });
    }
    const handleClick = () => {
        window.location.href = "/";
    }
    return(
        <form className="form-logIn" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="firstName" 
                placeholder="FirstName"
                onChange={handleChange}
                value={inputValues.firstName}
            /><br />
            <input 
                type="text" 
                name="lastName" 
                placeholder="LastName" 
                onChange={handleChange}
                value={inputValues.lastName}
            /><br />
            <input 
                type="text" 
                name="email" 
                placeholder="Email"
                onChange={handleChange}
                value={inputValues.email}
            />
            <br />
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange}
                value={inputValues.password}
            /><br />
            <input 
                type="text" 
                name="userRole"
                placeholder="User" 
                onChange={handleChange}
                value={inputValues.userRole}
            /><br />
            <button type="submit" onClick={handleClick}>Registrar</button>
        </form>
    )
}
export default FormSignIn
